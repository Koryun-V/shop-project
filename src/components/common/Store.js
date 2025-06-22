import React, {useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {getStore, setStore} from "../../store/actions/storePage";
import {useNavigate, useParams} from "react-router-dom";
import Button from "../mini/Button";
import {setStoreId} from "../../store/actions/home";

const Store = () => {
    const dispatch = useDispatch()
    const {id} = useParams()
    const store = useSelector(state => state.storePage.store)
    const navigate = useNavigate();

    useEffect(() => {
        dispatch(setStore([]))
        dispatch(getStore({id}))
    }, [id]);


    return (
        <section className="section">
            <article className="section-block">
                <div className="container">
                    {store.name ?
                        <>
                            <div className="store-header">
                                <h1> About the {store.name.charAt(0).toUpperCase() + store.name.slice(1)}</h1>
                            </div>
                            <div className="store-block">
                                <div className="container-video">
                                    <iframe
                                        className="you-tube"
                                        width="100%"
                                        height="315"
                                        src={`https://www.youtube.com/embed/${store.videoUrl}`}
                                        title="YouTube video player"
                                        frameBorder="0"
                                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                        allowFullScreen
                                    ></iframe>
                                    <div className="store-link">
                                        <div className="link-block">
                                            <span>Products on the Multify website</span>
                                            <div className="products-button">
                                                <Button text="Products" className="active-button"
                                                        onClick={() => {
                                                            navigate(`/products`)
                                                            dispatch(setStoreId(store.id))
                                                        }}/>

                                            </div>
                                        </div>
                                        <div className="link-block">
                                            <span>Official website</span><a target="_blank"
                                                                            href={store.webSiteUrl}>{store.webSiteUrl}</a>
                                        </div>

                                    </div>
                                </div>
                                <div className="store-info">
                                    <span>{store.about}</span>
                                </div>
                            </div>
                            <iframe
                                src={`https://maps.google.com/maps?q=${store.location.latitude},${store.location.longitude}&hl=en&z=17&output=embed`}
                                style={{
                                    width: "100%",
                                    height: "340px",
                                    border: "0",
                                    allowFullScreen: "",
                                    loading: "lazy"
                                }}
                                referrerPolicy="no-referrer-when-downgrade"
                            ></iframe>
                        </>
                        : <>
                            <div className="store-header">
                                <h1 style={{
                                    width: "100%",
                                }} className="loading-gradient-p"></h1>
                            </div>
                            <div className="store-block">
                                <div className="container-video">
                                    <div className="you-tube loading-gradient-p"/>
                                    <div className="store-link">
                                        <div className="link-block loading-gradient-p" style={{
                                            width: "100%",
                                            height: 40,
                                        }}>

                                        </div>
                                        <div className="link-block loading-gradient-p" style={{
                                            width: "100%",
                                            height: 40,
                                        }}>

                                        </div>

                                    </div>
                                </div>
                                <div className="store-info">
                                    <div className="span-block">
                                        <span className="span-loading loading-gradient-p"></span>
                                        <span className="span-loading loading-gradient-p"></span>
                                        <span className="span-loading loading-gradient-p"></span>
                                        <span className="span-loading loading-gradient-p"></span>
                                        <span className="span-loading loading-gradient-p"></span>
                                    </div>

                                </div>
                            </div>
                            <div className="store-map loading-gradient-p">
                            </div>
                        </>}
                </div>
            </article>

        </section>
    );
};

export default Store;
