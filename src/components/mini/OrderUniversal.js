import React, {useLayoutEffect, useRef, useState} from 'react';
import Button from "./Button";
import {getReview, orderConfirm, orderRetry, setIsOpenReview} from "../../store/actions/order";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCube, faMoneyCheck, faSquarePen} from "@fortawesome/free-solid-svg-icons";
import {useDispatch, useSelector} from "react-redux";
import ModalReview from "../common/Modal/ModalReview";
import {Link} from "react-router-dom";
import {Watch} from "react-loader-spinner";

const OrderUniversal = ({order, status}) => {
    const dispatch = useDispatch();
    const reviewOpen = useSelector(state => state.order.isOpenReview);
    const statusRetry = useSelector(state => state.order.orderRetryStatus)
    const statusConfirm = useSelector(state => state.order.orderConfirmStatus)
    const orderRef = useRef(null)
    const [activeItem, setActiveItem] = useState("");
    const [indexProduct, setIndexProduct] = useState("")
    const [product, setProduct] = useState({
        paymentId: "",
        productId: "",
        productImg: "",
        productName: "",
    });
    const [element, setElement] = useState([]);

    useLayoutEffect(() => {
        const filtered = order.filter(item => item.status === status);
        setElement(filtered);
    }, [status]);

    return (
        <>
            {order.length ? order.map((item, index) => {
                    const date = new Date(item.createdAt);
                    const dateAnd = new Date(item.deliveryDate);
                    const deadline = (dateAnd - date) / (1000 * 60 * 60 * 24)
                    const day = date.getDate();
                    const month = date.toLocaleString('en-us', {month: 'long'});


                    return (
                        <div key={item.id}>
                            {item.status === status || status === "" ?
                                <div
                                     ref={orderRef}
                                     className={index === activeItem ? "order-item-active loading-gradient-order" : "order-item"}>
                                    <Link to={`/one-product/${item.product.id}`} className="product-link"></Link>
                                    <div className="order-img">
                                        <img src={item.product.productImage[0].path} alt=""/>
                                    </div>

                                    <div className="order-info">
                                        <span>{item.product.name}</span>
                                        <strong>{Math.round(item.amount)} $</strong>
                                        <span>{item.quantity} pcs.</span>


                                    </div>
                                    <div className="order-status">
                                        <div className="order-status-block" style={{
                                            minWidth: 170,

                                        }}>
                                            <strong>Order from {day} {month} </strong>
                                            <div className="review">
                                                {item.status === "received"
                                                    ?
                                                    <div className="order-button">
                                                        <Button
                                                            onClick={() => {
                                                                setActiveItem(index)
                                                                dispatch(getReview({paymentId: item.id}))
                                                                dispatch(setIsOpenReview(true))
                                                                setProduct({
                                                                    paymentId: item.id,
                                                                    productId: item.product.id,
                                                                    productImg: item.product.productImage[0].path,
                                                                    productName: item.product.name,
                                                                })
                                                            }}
                                                            className="active-button" text="Write a review"
                                                            icon={<FontAwesomeIcon icon={faSquarePen}
                                                                                   style={{
                                                                                       marginLeft: 10,
                                                                                       fontSize: 20
                                                                                   }}/>}/>
                                                    </div>
                                                    : item.status === "failed" ?
                                                        <div className="order-button">

                                                            <Button
                                                                onClick={() => {
                                                                    dispatch(orderRetry({paymentId: item.id}))
                                                                    setIndexProduct(index)
                                                                }}
                                                                status={statusRetry}
                                                                index={index}
                                                                indexProduct={indexProduct}
                                                                className="failed-button-gradient" text="Order again"
                                                                icon={<FontAwesomeIcon icon={faMoneyCheck}
                                                                                       style={{
                                                                                           marginLeft: 10,
                                                                                           fontSize: 20
                                                                                       }}/>}/>
                                                        </div>
                                                        :
                                                        item.status === "paid" ?
                                                            deadline <= 0 ?
                                                                <div className="order-button">

                                                                    <Button
                                                                        onClick={() => {
                                                                            dispatch(orderConfirm({paymentId: item.id}))
                                                                            setIndexProduct(index)

                                                                        }}
                                                                        status={statusConfirm}
                                                                        index={index}
                                                                        indexProduct={indexProduct}
                                                                        className="paid-button-gradient" text="Confirm"
                                                                        icon={<FontAwesomeIcon icon={faCube}
                                                                                               style={{
                                                                                                   marginLeft: 10,
                                                                                                   fontSize: 20
                                                                                               }}/>}/>
                                                                </div>
                                                                :
                                                                <div className="paid">
                                                                    <Watch
                                                                        visible={true}
                                                                        height="48"
                                                                        width="48"
                                                                        radius="40"
                                                                        color="white"
                                                                        ariaLabel="watch-loading"
                                                                        wrapperStyle={{
                                                                            background: "#7b00ff",
                                                                            borderRadius: "100px",

                                                                        }}
                                                                        wrapperClass=""
                                                                    />

                                                                    {/*<div className="paid-icon">*/}
                                                                    {/*    <FontAwesomeIcon icon={faClock} style={{*/}
                                                                    {/*        fontSize: 20,*/}
                                                                    {/*        color: "#7b00ff"*/}
                                                                    {/*    }}/>*/}
                                                                    {/*</div>*/}
                                                                    <div className="paid-info">
                                                                    <span>The order will be in <strong style={{
                                                                        color: "#7b00ff"

                                                                    }}>{Math.round(deadline)}</strong> days</span>

                                                                    </div>
                                                                </div>
                                                            : null
                                                }
                                            </div>
                                        </div>
                                        <div className="status-container" style={{}}>
                                            <div className="order-status-block" style={{
                                                width: 150,
                                            }}>
                                                <strong>Status</strong>
                                                <span
                                                    className="status-order">{item.status.charAt(0).toUpperCase() + item.status.slice(1)}</span>
                                            </div>

                                        </div>

                                    </div>
                                </div>
                                : null}
                        </div>
                    )
                })
                : null
            }


            {!element.length && status !== "" ? <div className="no-order">
                <h2>No orders {status}</h2>
            </div> : null}

            <ModalReview
                product={product}
                open={reviewOpen} onClose={() => {
                setActiveItem("")
                dispatch(setIsOpenReview(false))
            }}/>
        </>
    );
};

export default OrderUniversal;
