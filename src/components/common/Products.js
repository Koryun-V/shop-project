import React, {useEffect, useState} from 'react';
import Product from "../mini/Product";
import {useDispatch, useSelector} from "react-redux";
import {
    getAllProducts,
    setSearchValue,
    getStores,
    setStoreId, setProductsList
} from "../../store/actions/home";
import ReactPaginate from "react-paginate";
import {
    categoriesRequest,
    setMaxPrice,
    setMinPrice,
    setPage,
} from "../../store/actions/products";
import Slider from "react-slider";
import Button from "../mini/Button";
import useQuery from "../../utills/hooks/useQuery";
import Loading from "../mini/Loading";

const Products = () => {
    const {query, setQuery} = useQuery();
    const [isPageSubm, setIsPageSubm] = useState(false);
    const [isPlay, setIsPlay] = useState(false);

    const [limit, setLimit] = useState(Number(query.limit) || 12);
    const clampMin = (value) => Math.min(Math.max(value, 0), 9700);
    const clampMax = (value) => Math.min(Math.max(value, 0), 10000);
    const [categoryIds, setCategoryIds] = useState(query.categoryIds || "");
    const dispatch = useDispatch();
    const products = useSelector((state) => state.home.productsList);
    const categories = useSelector((state) => state.products.categories);
    const total = useSelector((state) => state.home.total);
    const page = useSelector((state) => state.home.page) || Number(query.page) || 1;
    const pageCount = Math.ceil(total / limit);
    const minPrice = useSelector((state) => state.home.minPrice) || Number(query.minPrice) || 0;
    const maxPrice = useSelector((state) => state.home.maxPrice) || Number(query.maxPrice) || 10000;
    const searchValue = useSelector((state) => state.home.searchValue) || query.s || "";
    const storeId = useSelector((state) => state.home.storeId) || query.storeId || "";
    const storeList = useSelector((state) => state.home.storesList);
    const userId = useSelector((state) => state.home.userId) || query.userId || "";
    const statusProducts = useSelector((state) => state.home.status);


    useEffect(() => {
        if (statusProducts === "pending") {
            setIsPlay(true);
            window.scrollTo(0, 0);
        } else {
            setIsPlay(false);
        }
    }, [statusProducts]);

    useEffect(() => {
        if (query.page && !isPageSubm) dispatch(setPage(Number(query.page)));
        if (query.minPrice) dispatch(setMinPrice(Number(query.minPrice)));
        if (query.maxPrice) dispatch(setMaxPrice(Number(query.maxPrice)));
        if (query.s) dispatch(setSearchValue(query.s));
        if (query.storeId) dispatch(setStoreId(query.storeId));
        if (query.categoryIds) setCategoryIds(query.categoryIds)
    }, []);


    const getProductsFunc = (path, value) => {
        dispatch(setProductsList([]))
        const searchParams = {
            page,
            limit,
            minPrice,
            maxPrice,
        };

        searchParams[path] = value;

        if (searchValue.trim()) searchParams.s = searchValue.trim();
        if (storeId) searchParams.storeId = storeId;
        if (userId) searchParams.userId = userId;
        if (categoryIds && categoryIds !== "") searchParams.categoryIds = categoryIds;

        setQuery(searchParams);

        dispatch(getAllProducts(searchParams));
    };

    useEffect(() => {
        setQuery({...query, s: searchValue})
    }, [searchValue]);


    useEffect(() => {
        dispatch(categoriesRequest({limit}));
    }, [dispatch, limit]);

    useEffect(() => {
        dispatch(getStores({page: 1, limit: 10}));
    }, []);

    const clearAllOptions = () => {
        dispatch(setMinPrice(0));
        dispatch(setMaxPrice(10000));
        dispatch(setPage(1));
        dispatch(setSearchValue(""));
        dispatch(setStoreId(""));
        setCategoryIds("");
        setQuery({});
        dispatch(getAllProducts({limit: 12}));
    };

    const handleClick = (pageInfo) => {
        const currentPage = pageInfo.selected + 1
        dispatch(setPage(currentPage));
        getProductsFunc("page", currentPage);
    };

    const handleSliderChange = (value) => {
        dispatch(setMinPrice(value[0]));
        dispatch(setMaxPrice(value[1]));
    };

    const handleMinPriceChange = (e) => {
        let newMin = clampMin(+e.target.value);
        if (newMin > maxPrice - 300) newMin = maxPrice - 300;
        dispatch(setMinPrice(newMin));
        handleSliderChange([newMin, maxPrice]);
    };

    const handleMaxPriceChange = (e) => {
        let newMax = clampMax(+e.target.value);
        if (newMax > 10000) newMax = 10000;
        dispatch(setMaxPrice(newMax));
    };

    const chooseStore = (id) => {
        const isSameStore = storeId === id;
        const newStoreId = isSameStore ? "" : id;
        dispatch(setStoreId(newStoreId));

        const updatedQuery = {...query};
        if (newStoreId) updatedQuery.storeId = newStoreId;
        else delete updatedQuery.storeId;

        setQuery(updatedQuery);
    };

    const clickCategoryId = (id) => {
        setCategoryIds((prev) => {
            const idsArray = prev
                .split(",")
                .map((item) => Number(item.trim()))
                .filter(Boolean);
            const newIds = idsArray.includes(id)
                ? idsArray.filter((catId) => catId !== id)
                : [...idsArray, id];

            return newIds.length ? newIds.join(",") : "";
        });
    };

    const applyFunc = async () => {
        setIsPageSubm(true);
        await dispatch(setPage(1));
        getProductsFunc("page", 1);
    };

    return (

        <section className="section">
            <article className="section-block">
                <Loading isLoading={!products.length && statusProducts === "pending"}/>
                <div className={`container ${!isPlay ? "smooth" : ""}`} style={{
                    opacity: isPlay ? 0.5 : 1,
                }}>
                    <div className="new-big-container">
                        <div className="new-container">
                            <div className="filter-container">
                                <div className="filter">
                                    <p className="info_span">Categories</p>
                                    <div className="stores_container">
                                        {categories
                                            .filter((_, index) => index !== 0)
                                            .map((category) => (
                                                <div
                                                    key={category.id}
                                                    className={`category-item ${categoryIds.includes(category.id) ? "selected" : ""}`}
                                                    onClick={() => clickCategoryId(category.id)}
                                                >
                                                    {category.categoryImage?.length > 0 && (
                                                        <img
                                                            src={category.categoryImage[0].path}
                                                            alt={category.name}
                                                            className="category-image"
                                                        />
                                                    )}
                                                </div>
                                            ))}
                                    </div>

                                    <span className="info_span">Stores</span>
                                    <div className="stores_container">
                                        {storeList.map((store) => (
                                            <div
                                                key={store.id}
                                                className={`category-item ${storeId === store.id ? "selected" : ""}`}
                                                onClick={() => chooseStore(store.id)}
                                            >
                                                <img
                                                    src={store?.storeLogo?.[0]?.path}
                                                    alt={store?.name}
                                                    className="category-image"
                                                />
                                            </div>
                                        ))}
                                    </div>

                                    <form action="#" className="price-container">
                                        <span className="info_span">Price</span>
                                        <div>
                                            <input
                                                type="text"
                                                className="price-input"
                                                value={Number(minPrice)}
                                                onChange={handleMinPriceChange}
                                            />
                                            <input
                                                type="text"
                                                className="price-input"
                                                value={Number(maxPrice)}
                                                onChange={handleMaxPriceChange}
                                            />
                                        </div>
                                        <Slider
                                            className="slider-container"
                                            onChange={handleSliderChange}
                                            value={[minPrice, maxPrice]}
                                            min={0}
                                            max={10000}
                                            minDistance={300}
                                            thumbClassName="slider-thumb"
                                        />
                                    </form>

                                    <div className="buttons-container">
                                        <div className="agree-button">
                                            <Button
                                                text="Apply"
                                                type="button"
                                                onClick={applyFunc}
                                                className="active-button"
                                            >
                                                Apply
                                            </Button>
                                        </div>
                                        <button onClick={clearAllOptions} className="clear-button">Clear All</button>
                                    </div>
                                </div>
                            </div>

                            <div className="products_container">
                                <Product
                                    statusProducts={statusProducts}
                                    classNameActive="product-active"
                                    products={products}
                                    quantity={12}
                                    className="product-block"
                                    classNameImg="product-img"
                                />

                                <div className="react_pagination_div">
                                    {total >= 12 && pageCount > 1 && (
                                        <ReactPaginate
                                            previousLabel={"<"}
                                            nextLabel={pageCount ? ">" : ""}
                                            pageCount={pageCount}
                                            pageRangeDisplayed={3}
                                            onPageChange={handleClick}
                                            pageLinkClassName={"page-link"}
                                            containerClassName={"pagination"}
                                            pageClassName={"page-item"}
                                            activeClassName={"page-item--active"}
                                            previousClassName={"page-item--previous"}
                                            nextClassName={"page-item--next"}
                                            forcePage={page - 1}
                                        />
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </article>
        </section>
    );
};

export default Products;
