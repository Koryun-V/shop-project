import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import orderBg from "../../assets/background/order.jpg"

import {
    getOrder,
    getOrderReceived, setOrder,

} from "../../store/actions/order";


import OrderUniversal from "../mini/OrderUniversal";
import Loading from "../mini/Loading";


const Order = () => {
    const dispatch = useDispatch();
    const order = useSelector(state => state.order);
    const orderReceived = useSelector(state => state.order.orderReceived);
    const statusConfirm = useSelector(state => state.order.orderConfirmStatus)
    const url = useSelector(state => state.order.url);
    const status = useSelector(state => state.order.status);
    const [isPlay, setIsPlay] = useState(false);
    const [orderStatus, setOrderStatus] = useState("");
    useEffect(() => {
        if (status === "pending" ) {
            setIsPlay(true);
        } else {
            setIsPlay(false);
        }
    }, [status]);

    useEffect(() => {
        dispatch(setOrder([]))
    }, []);

    useEffect(() => {
        dispatch(getOrder({limit: 100}))
        dispatch(getOrderReceived())
    }, [statusConfirm]);

    useEffect(() => {
        if (url) {
            window.location.href = url;
            console.log(url, "a")
        }
    }, [url]);


    return (
        <section className="section">
            <article className="section-block">
                <Loading isLoading={!order.order.length && status === "pending"}/>
                <div className={`container ${!isPlay ? "smooth" : ""}`} style={{
                    opacity: isPlay && !order.order.length ? 0.4 : 1,
                }}>
                    <div className="background-header">
                        <h1>Orders</h1>
                        <img src={orderBg}/>
                    </div>

                    <div className="container-order">
                        {order.order.length ?
                            <>
                                <div className="order__filter">
                                    <div className="order__items">
                                        <div className="order__filter__item" onClick={() => setOrderStatus("")}>
                                        <span
                                            className={orderStatus === "" ? "active_all" : "disabled__filter"}>All</span>
                                        </div>
                                        <div className="order__filter__item" onClick={() => {
                                            setOrderStatus("received")
                                        }}>
                                <span
                                    className={orderStatus === "received" ? "active_received" : "disabled__filter"}>Received</span>
                                        </div>
                                        <div className="order__filter__item" onClick={() => {
                                            setOrderStatus("paid")

                                        }}>
                                <span
                                    className={orderStatus === "paid" ? "active_paid" : "disabled__filter"}>Paid</span>
                                        </div>
                                        <div className="order__filter__item" onClick={() => {
                                            setOrderStatus("failed")

                                        }}>
                                <span
                                    className={orderStatus === "failed" ? "active_failed" : "disabled__filter"}>Failed</span>
                                        </div>

                                        <div className="line-active" style={{
                                            left: orderStatus === "received" ? "calc(100% / 4)"
                                                : orderStatus === "paid"
                                                    ? "calc(100% / 2)" : orderStatus === "failed" ? "calc(100% - 200px)" : 0,
                                            background: orderStatus === "received" ? "#00d143" : orderStatus === "paid" ? "#7b00ff" : orderStatus === "failed" ? "red" : "#d1d1d1",
                                        }}>
                                        </div>
                                    </div>
                                </div>
                                <OrderUniversal status={orderStatus}
                                                orderPaid={order.order}
                                                order={orderStatus === "" ? orderReceived.concat(order.order) : orderStatus === "received" ? orderReceived : order.order}/>
                            </>
                            :
                            status === "ok" && !order.order.length || status === "error"
                                ?
                                <div className="no-order">
                                    <h2>No orders</h2>
                                </div> : null
                        }
                    </div>
                </div>
            </article>
        </section>
    );
};

export default Order;
