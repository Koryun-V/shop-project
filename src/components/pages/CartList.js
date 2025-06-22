import React, {useEffect, useRef, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import Error from "./Error";
import Button from "../mini/Button";
import {
    deleteAllCartRequest,
    fetchCards,
    loadTransformedArray,
    makePayment, setCards,
} from "../../store/actions/card";
import CartItem from "../common/CartItem";
import Loader from "../common/Loader";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCircleExclamation, faCube, faTruck} from "@fortawesome/free-solid-svg-icons";
import _ from "lodash";
import CartModal from "../common/CartModal";
import {ReactComponent as CheckIcon} from "../../assets/icon/check-solid.svg";
import {useNavigate} from "react-router-dom";
import basketBg from "../../assets/background/basket.jpg";
import Loading from "../mini/Loading";
import {getUser} from "../../store/actions/login";

const CartList = () => {
    const dispatch = useDispatch();
    const cardsList = useSelector((state) => state.card.cardData);
    const products = useSelector((state) => state.card.products);
    const confirmationUrl = useSelector((state) => state.card.confirmationUrl);
    const transformedArray = useSelector((state) => state.card.transformedArray);
    const navigate = useNavigate()
    const firstLoading = useRef(true);
    const [loading, setLoading] = useState(true);
    const [loadingDelete, setLoadingDelete] = useState(false);

    const [show, setShow] = useState(false);
    const [isClearModalOpen, setClearModalOpen] = useState(false);
    const [orderLoading, setOrderLoading] = useState(false);
    const [selectedProducts, setSelectedProducts] = useState(JSON.parse(localStorage.getItem('selectedProducts')) || {});
    const [totalCardPrice, setTotalCardPrice] = useState(0);
    const [totalProductPrice, setTotalProductPrice] = useState(0);

    const [checkedAll, setCheckedAll] = useState(_.every(selectedProducts, value => value === true));

    const {cards, maxPageCount, currentPage} = cardsList;
    const user = useSelector(state => state.login.user)
    const status = useSelector(state => state.card.statusGet);

    const [isPlay, setIsPlay] = useState(false);

    useEffect(() => {
        dispatch(getUser())
    }, []);


    useEffect(() => {
        if (status === "pending") {
            setIsPlay(true);
        } else {
            setIsPlay(false);
        }
    }, [status]);


    useEffect(() => {
        let isMounted = true;
        const fetchAllCards = async (page = 1) => {
            if (!isMounted) return;

            setLoading(true);
            await dispatch(setCards([]));

            const data = await dispatch(fetchCards({page}));

            if (!isMounted) return;

            const {currentPage, maxPageCount} = data?.payload || {};

            if (!isMounted) return;

            if (currentPage < maxPageCount) {
                await fetchAllCards(page + 1);
            } else {
                setLoading(false);
            }
        };

        if (firstLoading.current) {
            fetchAllCards();
            firstLoading.current = false;
        }

        return () => {
            isMounted = false;
        };
    }, []);

    const onClickClear = () => {
        setClearModalOpen(true);
    };

    const onClearCancel = () => {
        if (!loadingDelete) {
            setClearModalOpen(false);
        }
    };


    const onClearConfirm = async () => {
        try {
            setLoadingDelete(true);
            await dispatch(deleteAllCartRequest());
        } catch (error) {
            console.error("Failed to delete cart:", error);
        }
        setLoadingDelete(false);

    };


    useEffect(() => {
        if (!!cards.length && totalCardPrice === totalProductPrice) {
            dispatch(loadTransformedArray());
        }
    }, [cardsList, checkedAll]);


    const calculateTotalQuantity = (cards) => {
        return cards.reduce((quantity, card) => quantity + card.quantity, 0);
    };

    useEffect(() => {
        const calculateTotalPrice = (items) => {
            return items.reduce((total, item) => {

                const price = _.isEmpty(item.product.discount)
                    ? item.product.price
                    : item.product.discount.discountPrice;

                return total + price * item.quantity;
            }, 0);
        };

        setTotalCardPrice(calculateTotalPrice(cards));
        setTotalProductPrice(calculateTotalPrice(products));
    }, [cards, products]);


    const handleSelectAll = () => {
        const newCheckedAll = !checkedAll;
        setCheckedAll(newCheckedAll);
        const updatedSelectedProducts = cards.reduce((acc, card) => {
            acc[card.id] = newCheckedAll;
            return acc;
        }, {});
        setSelectedProducts(updatedSelectedProducts);
        localStorage.setItem('selectedProducts', JSON.stringify(updatedSelectedProducts));
        dispatch(loadTransformedArray());
    };

    const onOrder = async () => {
        if (user.address) {
            setOrderLoading(true);
            try {
                if (!!transformedArray.length) {
                    await dispatch(makePayment(transformedArray));
                } else {
                    setShow(true);
                }

            } catch (error) {
                console.error("Error making payment:", error);
            }
            setOrderLoading(false);
        } else {
            navigate(`/user/#address`)
        }
    };

    useEffect(() => {
        if (confirmationUrl) {
            window.location.href = confirmationUrl;
        }
    }, [confirmationUrl]);


    return (
        <section className="section">
            <article className="section-block">
                <Loading isLoading={!cards.length && status === "pending"}/>
                <div className={`container ${!isPlay ? "smooth" : ""}`} style={{
                    opacity: !cards.length && isPlay ? 0.4 : 1,
                }}>
                    <div className="background-header">
                        <h1>Basket</h1>
                        <img src={basketBg}/>
                    </div>
                    <div className="card-items">
                        {!loading && _.isEmpty(cards) ? (
                            <Error
                                statusCode="There is nothing in the cart"
                                message="Browse the catalog and choose from millions of products with free shipping. The best place to start choosing is the home page."
                            />
                        ) : (
                            <>
                                <div className="card-list__container">
                                    <div className="total">
                                        {!loading &&
                                            <div className="total__container">
                                                <div onClick={handleSelectAll} className="total__container_desc">
                                                    <div
                                                        className={`custom__checkbox__checkmark ${
                                                            totalCardPrice === totalProductPrice && !loading ? 'active' : ''
                                                        }`}
                                                    >
                                                        {totalCardPrice === totalProductPrice && !!cards.length && (
                                                            <CheckIcon className="custom__checkbox__icon"/>
                                                        )}
                                                    </div>

                                                    <div className="total-price">
                                                        Select All
                                                        {totalCardPrice === totalProductPrice ? (
                                                            <span className="total-price_desc all">Selected all</span>
                                                        ) : (
                                                            <span className="total-price_desc all">
                      Selected {calculateTotalQuantity(products)}
                    </span>
                                                        )}
                                                    </div>
                                                </div>
                                            </div>
                                        }
                                        <div className="total__desc">
                                            <p className="total-price">
                                                Total Price:
                                                <span className="total-price_desc">{parseFloat(totalCardPrice)}$</span>
                                            </p>

                                            <p className="total-price">
                                                Total Quantity:
                                                <span
                                                    className="total-price_desc">{calculateTotalQuantity(cards)}pcs</span>
                                            </p>
                                        </div>

                                        <div className="total__group">
                                            <Button className="active-button total"
                                                    onClick={onOrder}
                                                    loading={orderLoading}>
                                                <span>Place an order</span>
                                                <span>{totalProductPrice ? parseFloat(totalProductPrice) : ''}</span>
                                            </Button>
                                        </div>

                                        <div className="info">
                                            <FontAwesomeIcon icon={faCircleExclamation} className="info__icon"/>
                                            <p className="info__desc">You can only order from one supplier</p>
                                        </div>

                                        <div className="info">
                                            <FontAwesomeIcon icon={faTruck} className="info__icon"/>
                                            <p className="info__desc">
                                                Delivery is carried out by the supplier's couriers or the Do courier
                                                service. You
                                                can also
                                                pick up the goods yourself from the supplier
                                            </p>
                                        </div>

                                        <div className="info">
                                            <FontAwesomeIcon icon={faCube} className="info__icon"/>
                                            <p className="info__desc">
                                                The exact delivery amount will be determined after order confirmation
                                            </p>
                                        </div>

                                        <div className="total__group">
                                            <Button
                                                onClick={onClickClear}
                                                className="clear-button total">
                                                Clear All
                                            </Button>
                                        </div>
                                    </div>
                                </div>

                                <div className="card__wrapper">
                                    {loading ? (
                                        <Loader
                                            height="220"
                                            width="100%"
                                            count={6}
                                            className="card-list"
                                            iCount={3}
                                            iWidth="100%"
                                            iHeight={200}
                                        />
                                    ) : (
                                        cards.map((card) => (
                                            <CartItem
                                                key={card.id}
                                                card={card}
                                                selectedProducts={selectedProducts}
                                                setSelectedProducts={setSelectedProducts}
                                                setCheckedAll={setCheckedAll}
                                                loading={loading}
                                            />
                                        ))
                                    )}

                                    <CartModal
                                        isOpen={show}
                                        onClose={() => setShow(false)}
                                        desc={"To place an order, select a product"}
                                    />

                                    <CartModal
                                        loading={loadingDelete}
                                        isOpen={isClearModalOpen}
                                        onClose={onClearCancel}
                                        onConfirm={onClearConfirm}
                                        desc={"Are you sure you want to clear the cart?"}
                                        buttonChild={"Delete"}
                                    />
                                </div>
                            </>
                        )}
                    </div>
                </div>
            </article>
        </section>
    );

};

export default CartList;
