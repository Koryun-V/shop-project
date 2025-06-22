import React from 'react';
import {TailSpin} from "react-loader-spinner";

const Button = ({onClick, type, className, text, status, children, disabled, loading, icon, index, indexProduct}) => {
    return (
        <button disabled={status === "pending" || disabled} className={className} onClick={onClick} type={type}>
            {((status === "pending" && index === indexProduct) || loading) ? (
                <TailSpin
                    visible={true}
                    height="40"
                    width="40"
                    color="white"
                    ariaLabel="tail-spin-loading"
                    radius="0"
                    wrapperStyle={{}}
                    wrapperClass="loading"
                />
            ) : text || icon ? (
                <>
                    {text && <span key="text">{text}</span>}
                    {icon && <span key="icon">{icon}</span>}
                </>
            ) : children}
        </button>
    );
};

export default Button;
