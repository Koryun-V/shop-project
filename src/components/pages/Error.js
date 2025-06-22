import React from 'react';
import { Link } from 'react-router-dom';
import { ReactComponent as EmptyIcon } from "../../assets/icon/emptyIcon.svg";

const ErrorPage = ({ statusCode, message }) => {
  return (
    <div className="error-page">
      <div className="error-content">
        <h2 className="error-code">{statusCode ? <EmptyIcon/> :  "404"}</h2>
        <h2 className="error-title">{statusCode || 'Oops!'}</h2>

        <p className="error-description">
          {message || 'Sorry, the page you are looking for does not exist or has been moved.'}

        </p>
        <Link to="/" className="back-home-btn">
          Go Back to Home
        </Link>
      </div>
    </div>
  );
};

export default ErrorPage;
