import React, {useEffect, useRef, useState} from 'react';
import {useSelector, useDispatch} from "react-redux";
import {getOneProduct, setOneProduct} from "../../store/actions/oneProduct";
import _ from "lodash";
import {createCard, updateCard} from "../../store/actions/products";
import {getReviewList, setReviewList} from "../../store/actions/order";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faAngleLeft, faAngleRight, faCheck, faStar, faUser} from "@fortawesome/free-solid-svg-icons";
import {useLocation, useParams} from "react-router-dom";
import Slider from "react-slick";
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import Button from "../mini/Button";
import Product from "../mini/Product";
import {getPopularProducts, setPopularProducts} from "../../store/actions/home";
import {setIsOpenLogin} from "../../store/actions/login";

const token = localStorage.getItem("token");

const OneProduct = () => {
    const [quantity, setQuantity] = useState(1);
    const dispatch = useDispatch();
    const oneProductInfo = useSelector(state => state.oneProduct.oneProduct);
    const name = oneProductInfo?.result?.product?.name;
    const id = oneProductInfo?.result?.product?.id;
    const images = oneProductInfo?.result?.product?.images
    const description = oneProductInfo?.result?.product?.description;
    const size = oneProductInfo?.result?.product?.size
    const store = oneProductInfo?.result?.product?.store.name;
    const isInCart = oneProductInfo?.result?.product?.isInCart
    const params = useParams()
    const cardId = isInCart?.cartId
    const userId = useSelector(state => state.login.user?.id);
    const {productId} = params
    const quantityNumber = oneProductInfo?.result?.product?.quantity;
    const reviews = useSelector(state => state.order.reviewsAll)
    const [index, setIndex] = useState([100])
    const oneProductStatus = useSelector(state => state.oneProduct.oneProductStatus)
    const statusPopular = useSelector(state => state.home.statusPopular);
    const products = useSelector(state => state.home.popularProducts);
    const [showMoreButton, setShowMoreButton] = useState([]);
    const replyRefs = useRef([]);
    const [more, setMore] = useState(false);
    const {hash} = useLocation();

    const checkOverflow = () => {
        const updatedShowMore = replyRefs.current.map((el) => {
            if (!el) return false;
            return el.scrollWidth > el.clientWidth;
        });
        setShowMoreButton(updatedShowMore);
    };


    useEffect(() => {
        checkOverflow(); // սկզբնական ստուգում
        window.addEventListener("resize", checkOverflow);
        return () => {
            window.removeEventListener("resize", checkOverflow);
        };
    }, [reviews]);


    useEffect(() => {
        if (reviews.length) {
            if (hash) {
                setMore(true);
                const element = document.querySelector(hash);
                if (element) {
                    element.scrollIntoView({ behavior: 'smooth', block: 'center' });
                }
            }
        }

    }, [hash, reviews.length]);

    useEffect(() => {
        dispatch(setReviewList([]))
        dispatch(setPopularProducts([]))
        dispatch(getReviewList({productId}))
        dispatch(getPopularProducts({id}))
    }, [productId]);


    const updateQuantity = (value) => {
        setQuantity((prev) => Math.max(1, prev + value));
    };

    const onChange = (e) => {
        const newValue = e.target.value;
        if (/^\d*$/.test(newValue)) {
            setQuantity(newValue === "" ? "" : Math.max(1, Number(newValue)));
        }

    };


    const quantityBlur = () => {
        if (quantity > quantityNumber) {
            setQuantity(quantityNumber)
        }
        if (quantity < 1) {
            setQuantity(1);
        }
    }


    const addCard = async () => {
        if (quantityNumber === 0) return;

        try {
            if (cardId) {
                await dispatch(updateCard({ cardId, add: quantity }));
            } else {
                await dispatch(createCard({ productId, quantity }));
            }

            if (userId) {
                await dispatch(getOneProduct({ id: productId, userId }));
            } else {
                await dispatch(getOneProduct({ id: productId }));
            }
        } catch (error) {
            console.error("Failed to update cart or fetch product:", error);
        }
    };


    useEffect(() => {
        if (localStorage.getItem("token")) {
            if (userId) {
                dispatch(setOneProduct([]))
                dispatch(getOneProduct({id: productId, userId}));
            }

        } else {
            dispatch(getOneProduct({id: productId,}));
        }

    }, [productId, userId]);


    useEffect(() => {
        dispatch(getOneProduct({id: productId}));
    }, [productId]);

    function SamplePrevArrow(props) {
        const {onClick} = props;
        return (
            <div
                className="arrow prev"
                onClick={onClick}
            ><FontAwesomeIcon icon={faAngleLeft} className="arrow-icon icon-prev"/></div>
        );
    }

    function SampleNextArrow(props) {
        const {onClick} = props;
        return (
            <div
                className="arrow next"
                onClick={onClick}
            ><FontAwesomeIcon icon={faAngleRight} className="arrow-icon icon-next"/></div>
        );
    }


    const settings = {
        dots: true,
        infinite: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: false,
        speed: 1000,
        autoplaySpeed: 3000,
        pauseOnHover: true,
        // cssEase: "linear"
        prevArrow: <SamplePrevArrow/>,
        nextArrow: <SampleNextArrow/>,
        useTransform: true,
    };


    return (
        <section className="section">
            <article className="section-block">
                <div className="container">
                    <div className="new-big-container">
                        <div className="new-container">
                            <div className="section">
                                <div className="product" key={id}>

                                    <div className="product__header">
                                        {oneProductStatus === "ok" && images?.length > 1 ? (
                                            <Slider {...settings}>
                                                {images.map((item) => (
                                                    <div className="product__image__container" key={item.url}>
                                                        <img src={item.url} alt="item" className="product__image"/>
                                                    </div>
                                                ))}
                                            </Slider>
                                        ) : oneProductStatus === "ok" ? (
                                            <div className="product__image__container">
                                                <img src={images?.[0]?.url} alt="product" className="product__image"/>
                                            </div>
                                        ) : (
                                            <Skeleton height={500}/>
                                        )}
                                    </div>
                                    <div className="product__header__span">
                                        {oneProductStatus === "ok" ? (
                                            <>

                                                <div className="product_info-container">
                                                    <span className="product__name">{name}</span>
                                                    <div className="new_store">
                                                        <div className="new_store-img">
                                                            <img
                                                                src={oneProductInfo?.result?.product?.store?.logo[0]?.logo}
                                                                alt="img"/>
                                                        </div>

                                                    </div>

                                                </div>
                                                <div className='product_pers_count_container'>
                                        <span
                                            className="product__store_name">Quantity - {oneProductInfo?.result?.product?.quantity} </span>
                                                </div>


                                                <div className="product_pers_store_container">

                                                    {oneProductInfo?.result?.product?.discount && (

                                                        <div style={{
                                                            display: "flex",
                                                            flexWrap: "wrap",
                                                            gap: "15px",
                                                            justifyContent: "center",
                                                            marginBottom: "50px"
                                                        }}>

                                                            <span className="product__store_name"> Discount - </span>
                                                            <div className="persentage_info">
                                                                <span>- {Math.floor(oneProductInfo.result.product.discount.discountPercentage)}%</span>
                                                            </div>
                                                        </div>

                                                    )}
                                                </div>

                                                <div className="product-price_info">
                                                    {oneProductInfo?.result?.product?.discount ? (
                                                        <>
                                                            <div >
                                                                          <span className="product__store_name">
                                                                            <span>Price -</span>
                                                                             <span>{quantity * oneProductInfo.result.product.discount.discountPrice}$</span>
                                                                          </span>
                                                            </div>

                                                            <div className="product__store_name">
                                                                    <span
                                                                        style={{
                                                                            color: "#a5a5a5",
                                                                            fontSize: "25px",
                                                                            fontWeight: "bold",
                                                                            textDecorationLine: "line-through",
                                                                        }}
                                                                    >
                                                                 {quantity * oneProductInfo?.result?.product?.price}$
                                                                      </span>
                                                            </div>
                                                        </>
                                                    ) : (
                                                        <span className="product__store_name">
                                                  <span className="product__store_name">Price -
                                                  </span>{quantity * oneProductInfo?.result?.product?.price}$
                                                </span>
                                                    )}
                                                </div>

                                                <div className="product__quantity">
                                                    {/*<button disabled={quantityNumber === 0}*/}
                                                    {/*        onClick={() => addCard()}*/}
                                                    {/*        className="product__button__cart">Add to cart*/}
                                                    {/*</button>*/}
                                                    <div className="product__button__cart">
                                                        <Button
                                                            text="Add to cart"
                                                            disabled={quantityNumber === 0}
                                                            onClick={() =>  !token ? dispatch(setIsOpenLogin(true)) : addCard()}
                                                            type={"button"}
                                                            className={!!quantityNumber ? "active-button" : "disabled"}
                                                        >

                                                        </Button>
                                                    </div>

                                                    <button disabled={quantity <= 1} className="product__button"
                                                            onClick={() => updateQuantity(-1)}>-
                                                    </button>
                                                    <input className="product__value" type="text" onBlur={quantityBlur}
                                                           value={Number(quantity)}
                                                           onChange={onChange}/>
                                                    <button disabled={quantity >= quantityNumber}
                                                            className="product__button"
                                                            onClick={() => updateQuantity(1)}>+
                                                    </button>
                                                </div>
                                                <div className="product_mini_desc">
                                                    <span className="product__store_name_desc">Delivery is carried out by the supplier's couriers or the  courier service. You can also pick up the goods yourself from the supplier</span>
                                                </div>


                                            </>
                                        ) : (
                                            <div className="product-skeleton">
                                                <div className="skeleton-name-container">
                                                    <div className="skeleton skeleton-text skeleton-title"></div>
                                                    <div className="skeleton skeleton-image"></div>
                                                </div>


                                                <div className="skeleton skeleton-text skeleton-discount"></div>

                                                <div className="skeleton skeleton-text skeleton-price"></div>

                                                <div className="skeleton-button-container">
                                                    <div className="skeleton skeleton-button"></div>

                                                    <div className="skeleton skeleton-quantity-controls"></div>
                                                </div>


                                                <div className="skeleton skeleton-text skeleton-description"></div>
                                            </div>


                                        )}

                                    </div>

                                </div>
                                <div className="product__description" style={{
                                    padding: 0,
                                }}>
                                    <div className="container">
                                        <h3 className="product__description__h">Description</h3>
                                        {!description ? (
                                            <>
                                                <Skeleton count={3} height={20} style={{marginBottom: '10px'}}/>
                                            </>
                                        ) : (
                                            <>
                                                <p className="product__description__p">{description}</p>
                                                <p className="product__description__p">Store - {store}</p>
                                                <p className="product__description__p">Size - {size}</p>
                                            </>
                                        )}
                                    </div>
                                </div>

                                <div className="reviews">
                                    <div className="title">
                                        <h2>Reviews</h2>
                                    </div>

                                    {reviews.length ?
                                        <div className="container">


                                            {reviews.slice(0, !more ? 3 : reviews.length).map((review, i) => {
                                                const date = new Date(review.createdAt);
                                                const hours = date.getHours()
                                                const minutes = date.getMinutes()
                                                const day = date.getDate();
                                                const month = date.toLocaleString('en-us', {month: 'long'});
                                                return (
                                                    <div
                                                        key={review.id}
                                                        className={Number(hash.split("-")[1]) === review.userId ? "review__item__active" : "review__item"}
                                                        id={`review-${review.userId}`}>

                                                        <div className="review__header">

                                                            <div className="review__user_block">
                                                                <div className="review__avatar">
                                                                    {review.user.avatar[0] ?
                                                                        <img src={review.user.avatar[0].path}
                                                                             alt="user"/>
                                                                        :

                                                                        <FontAwesomeIcon icon={faUser}
                                                                                         className="review__icon"/>
                                                                    }
                                                                </div>
                                                                <div className="review__user">
                                                                    <strong>
                                                                        {review.user.firstName.charAt(0).toUpperCase() +
                                                                            review.user.firstName.slice(1)} {review.user.lastName.charAt(0).toUpperCase() + review.user.lastName.slice(1)}
                                                                    </strong>
                                                                    <span><FontAwesomeIcon icon={faCheck} style={{
                                                                        color: "limegreen"
                                                                    }}/> Bought out</span>
                                                                </div>
                                                            </div>

                                                            <div className="review__star-time">
                                                                <div className="review__star">
                                                                    {Array.from({length: 5}).map((_, i) => (
                                                                        <FontAwesomeIcon
                                                                            key={i}
                                                                            style={{
                                                                                fontSize: 20
                                                                            }}
                                                                            icon={faStar}
                                                                            className={i + 1 <= review.rating ?
                                                                                "star-active icon"
                                                                                : "star-disable icon"}/>
                                                                    ))}
                                                                </div>
                                                                <div className="review__time">
                                                                    <span>{day} {month}, {hours} : {minutes < 10 ? `0${minutes}` : minutes}</span>
                                                                </div>
                                                            </div>
                                                        </div>

                                                        <div className="review-info">
                                                 <span>
                                                     {review.review}
                                                    </span>
                                                        </div>

                                                        {review.reviewReply?.reply && (
                                                            <div className="message">
                                                                <div>
                                                                    <strong>Seller's response</strong>
                                                                </div>
                                                                <div className="message__info">
                                                                  <span
                                                                      ref={el => replyRefs.current[i] = el}
                                                                      className={index.includes(i) ? "message__text-more" : "message__text"}
                                                                  >
                                                                    {review.reviewReply.reply}
                                                                  </span>
                                                                    {!index.includes(i) && showMoreButton[i] && (
                                                                        <span
                                                                            className="message__more"
                                                                            onClick={() => setIndex(prev => _.uniq([...prev, i]))}
                                                                        >
                                                                          more
                                                                        </span>
                                                                    )}
                                                                </div>
                                                            </div>
                                                        )}


                                                    </div>


                                                )
                                            })}
                                            {!more && reviews.length > 3 ?
                                                <div className="more__reviews" onClick={() => setMore(true)}>
                                                    <div className="line"></div>
                                                    <span>More</span>
                                                    <div className="line"></div>

                                                </div> : null}
                                        </div> :
                                        <p className="product__description__p">No reviews</p>
                           }
                            </div>


                            <article className="article-home" style={{
                                padding: 0
                            }}>
                                    <div className="title">
                                        <h3>Popular products</h3>
                                    </div>
                                    <div className="article-block">
                                        <Product statusProducts={statusPopular} classNameActive="product-active"
                                                 products={products}
                                                 quantity={4}
                                                 className="product-block"
                                                 classNameImg="product-img"/>
                                    </div>
                                </article>
                            </div>
                        </div>
                    </div>
                </div>
            </article>
        </section>
    );
};

export default OneProduct;
