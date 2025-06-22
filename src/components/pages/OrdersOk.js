import React from 'react';
import {ReactComponent as CheckCircle} from "../../assets/icon/check-circle.svg";
import {Link} from "react-router-dom";
const OrdersOk = () => {
  return (
    <div className="orders__ok">
      <CheckCircle />
      <h2 className="orders__ok__title">Thank you!</h2>
      <p className="orders__ok__desc">Your application has been accepted. We will contact you shortly</p>
      <Link to="/" className="orders__ok__button" >Go to home</Link>
    </div>
  );
};

export default OrdersOk;
