import React, {useEffect, useState} from 'react';
import Product from "../mini/Product";
import {useDispatch, useSelector} from "react-redux";
import {getSharesProducts, setSharesProducts} from "../../store/actions/home";
import shareBg from "../../assets/background/share.jpg";
import Loading from "../mini/Loading";

const Shares = () => {
    const dispatch = useDispatch();
    const productsShares = useSelector(state => state.home.productsShares);
    const statusShare = useSelector(state => state.home.statusShares);
    const [isPlay, setIsPlay] = useState(false);

    useEffect(() => {
        if (statusShare === "pending" ) {
            setIsPlay(true);
        } else {
            setIsPlay(false);
        }
    }, [statusShare]);

    useEffect(() => {
        dispatch(setSharesProducts([]))
        dispatch(getSharesProducts())
    }, []);


    return (
        <section className="section">
            <article className="section-block">
                <Loading isLoading={statusShare === "pending"}/>
                <div className={`container ${!isPlay? "smooth" : ""}`} style={{
                    opacity: isPlay ? 0.4 : 1,
                }}>
                    <div className="background-header">
                        <h1>Shares</h1>
                        <img src={shareBg}/>
                    </div>
                    <div className="article-home" style={{
                        marginTop: 50,
                        padding: 0,
                    }}>
                        <div className="article-block">
                            <Product products={productsShares} classNameActive="product-active" quantity={12}
                                     className="product-block" classNameImg="product-img"/>
                        </div>

                    </div>
                </div>
            </article>
        </section>

    );
};

export default Shares;
