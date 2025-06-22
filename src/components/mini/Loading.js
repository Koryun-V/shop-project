import React from 'react';
import logo from "../../assets/icon/logo.png";
import {ProgressBar} from "react-loader-spinner";

const Loading = ({isLoading}) => {

    return (
       isLoading ?
            <>
                <div className={`opacity-loading ${!isLoading ? "smooth" : ""}`} ></div>
                <div className="container-loading">
                    <div className="loading-block">
                        <div className="logo-loading">
                            <img src={logo}/>
                        </div>
                        <ProgressBar
                            visible={true}
                            height="150"
                            width="150"
                            color="#4fa94d"
                            barColor="#00d143"
                            borderColor="#00d143"
                            ariaLabel="progress-bar-loading"
                            wrapperStyle={{}}
                            wrapperClass=""
                        />
                    </div>
                </div>
            </> : null
    );
};

export default Loading;
