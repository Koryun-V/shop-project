import React from 'react';

const SlideProduct = ({product}) => {

    const formatDate = () => {
        if (!product.discount) return null;
        const date = new Date(product.discount.endDate);
        const day = date.getDate();
        const month = date.toLocaleString('en-us', {month: 'long'});
        return `${month} ${day}`;
    };

    return (
        product ? <div className="product-slider">
                <div className="product-slider-info">
                    <div className="product-name" style={{margin: 0}}>
                        <span>{product.name}</span>
                    </div>
                    <div className="product-price">
                        {product.discount && (
                            <div className="share">
                                <div className="percentage-slide">
                                    <div className="figure"></div>
                                    <span>- {product.discount.discountPercentage.split(".")[0]} %</span>
                                </div>
                            </div>
                        )}

                        <div className="price-block">
                            {product.discount && (
                                <span>{Math.round(product.discount.discountPrice)} $</span>
                            )}
                            <span
                                style={{
                                    color: product.discount ? "#a5a5a5" : "black",
                                    fontSize: product.discount ? "30px" : "35px",
                                    textDecorationLine: product.discount ? "line-through" : "none",
                                }}
                            >
                            {Math.round(product.price)} $
                        </span>
                        </div>
                        {product.discount && (
                            <strong className="loading-gradient-endDate" style={{
                                fontSize: 30,
                                minWidth: 200,
                                justifyContent: "center",
                                display: "flex",
                                alignItems: "center",
                            }}>
                                Until {formatDate()}
                            </strong>
                        )}
                    </div>

                    <div className="product-description">
                        <div
                            className="text-block-slide"
                            style={{
                                display: product.description.length > 80 ? "flex" : "block",
                            }}
                        >
                        <span className={product.description.length > 80 ? "line-description" : ""}>
                            {product.description}
                        </span>
                        </div>
                    </div>
                </div>
                <div className="store-slide">
                    <div className="store-img">
                        <img src={product.store.storeLogo[0].path} alt="img"/>
                    </div>
                </div>
                <div className="product-slider-img">
                    <img src={product.productImage[0].path} alt="product"/>
                </div>
            </div>
            :
            <div className="product-slider">
                <div className="product-slider-info">
                    <div className="product-name" style={{margin: 0}}>
                        <span className="loading-gradient-r"></span>
                    </div>
                    <div className="product-price ">
                        <div className="share">
                            <div className="percentage-slide">
                                <div className="figure-loading"></div>
                            </div>
                        </div>
                        <div className="price-block loading-gradient-p" style={{
                            height: 60,
                        }}>
                        </div>
                    </div>

                    <div className="product-description  loading-gradient-p" style={{
                        height: 60,
                    }}>
                    </div>


                </div>
                <div className="store-slide">
                    <div className="store-img loading-gradient-r">
                    </div>
                </div>
                <div className="product-slider-img loading-gradient-r">
                </div>

            </div>
    );
};

export default SlideProduct;
