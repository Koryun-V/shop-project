import React, {useEffect, useRef, useState} from 'react';
import background from "../../assets/background/home.jpg";
import background2 from "../../assets/background/home-2.jpg";
import Slider from "react-slick";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faAngleLeft, faAngleRight} from "@fortawesome/free-solid-svg-icons";
import SlideProduct from "./SlideProduct";
import {useNavigate} from "react-router-dom";
import {useSelector} from "react-redux";

const Slide = ({products}) => {
    const navigate = useNavigate();
    const startX = useRef(0);
    const endX = useRef(0);
    const status = useSelector(state => state.home.statusShares);
    const [isAuto, setIsAuto] = useState(false);
    const [key, setKey] = useState(0);

    useEffect(() => {
        if (status === "ok") {
            setIsAuto(true);
            setKey(prev => prev + 1);
        }
    }, [status]);

    const handleMouseDown = (e) => {
        startX.current = e.clientX;
    };

    const handleMouseUp = (e, id) => {
        endX.current = e.clientX;
        const diff = Math.abs(startX.current - endX.current);
        if (diff < 5) {
            navigate(`/one-product/${id}`);
        }
    };

    function SamplePrevArrow({onClick}) {
        return (
            <div className="arrow prev" onClick={onClick}>
                <FontAwesomeIcon icon={faAngleLeft} className="arrow-icon icon-prev"/>
            </div>
        );
    }

    function SampleNextArrow({onClick}) {
        return (
            <div className="arrow next" onClick={onClick}>
                <FontAwesomeIcon icon={faAngleRight} className="arrow-icon icon-next"/>
            </div>
        );
    }

    const settings = {
        dots: true,
        infinite: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: isAuto,
        speed: 1000,
        autoplaySpeed: 3000,
        pauseOnHover: true,
        useTransform: false,
        prevArrow: <SamplePrevArrow/>,
        nextArrow: <SampleNextArrow/>,
    };

    return (
        <Slider key={key} {...settings}>
            <div onMouseDown={handleMouseDown} onMouseUp={(e) => handleMouseUp(e, products[0].id)}>
                <div className="glass-slide"/>
                <img src={background} className="img-b" alt="background"/>
                <SlideProduct product={products[0]}/>
            </div>
            <div onMouseDown={handleMouseDown} onMouseUp={(e) => handleMouseUp(e, products[1].id)}>
                <div className="glass-slide"/>
                <img src={background2} className="img-b" alt="background"/>
                <SlideProduct product={products[1]}/>
            </div>
        </Slider>
    );
};

export default Slide;
