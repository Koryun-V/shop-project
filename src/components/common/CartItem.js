import React, {useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {
  deleteCard,
  loadTransformedArray,
  updateCard
} from "../../store/actions/card";
import {ReactComponent as TrashIcon} from "../../assets/icon/trash-solid.svg";
import Button from "../mini/Button";
import CustomCheckbox from "./CostumCheckBox";
import _ from "lodash";
import moment from "moment";
import {ReactComponent as AddIcon} from "../../assets/icon/addIcon.svg";
import {ReactComponent as MinusIcon} from "../../assets/icon/minusIcon.svg";
import {Link} from "react-router-dom";


const CartItem = ({card, selectedProducts, setSelectedProducts, setCheckedAll}) => {

  const dispatch = useDispatch();
  const deleting = useSelector((state) => state.card.deleting);
  const updating = useSelector((state) => state.card.updating);

  const loading = useSelector((state) => state.card.loading);

  const [localQuantity, setLocalQuantity] = useState(card.quantity);

  const updateQuantity = async ({cardId, value}) => {
    setLocalQuantity((prev) => Math.max(1, prev + value));
    await dispatch(updateCard({
      cardId,
      quantity: value === 1 ? { add: 1 } : { remove: 1 },
      value: value === 1 ? localQuantity + 1 : localQuantity - 1
    }));

    dispatch(loadTransformedArray());
  };

  const onChange = async ({cardId, value}) => {

    const numericValue = value - localQuantity
    if (/^\d*$/.test(value)) {
      setLocalQuantity(value === "" ? "" : Math.max(1, Number(value)));
    }

    await dispatch(updateCard({
      cardId,
      quantity: numericValue > 1 ? { add: numericValue } : { remove: -numericValue},
      value
    }));

    dispatch(loadTransformedArray());
  };



  const handleProductDelete = async (cardId) => {
    dispatch(deleteCard(cardId));

    const savedSelectedProducts = JSON.parse(localStorage.getItem('selectedProducts')) || {};
    delete savedSelectedProducts[cardId];
    localStorage.setItem('selectedProducts', JSON.stringify(savedSelectedProducts));

    dispatch(loadTransformedArray());
  };


  const updateSelectedProducts = (productId, isSelected) => {
    setCheckedAll(false)
    const updatedSelectedProducts = {...selectedProducts, [productId]: isSelected};
    setSelectedProducts(updatedSelectedProducts);
    localStorage.setItem('selectedProducts', JSON.stringify(updatedSelectedProducts));
    dispatch(loadTransformedArray())
  };


  return (
    <div key={card.id} className="card">

      <CustomCheckbox
        key={card.id}
        value={card.id}
        checked={selectedProducts[card.id] || false}
        onChange={({target: {checked}}) => updateSelectedProducts(card.id, checked)}
      />

      <div className="card_image_block">
        <Link to={`/one-product/${card.product.id}`} key={card.id}>
          <img key={card.id} src={card?.product?.productImage[0]?.path} alt="Product Image" className="card_image"/>
        </Link>
      </div>

      <div className="p">
        <div className="card-prod">
          <p className="card-desc">Name: {card.product.name}</p>

          <div className="card-price discount">
             <span className={`card-price ${card.product.discount?.discountPrice ? 'discountPrice' : ''}`}>
            {card.product.price * localQuantity}$
          </span>
            {!_.isEmpty(card.product.discount) &&
              <>
                <div>
                < span className="card-price discountPercentage">{parseFloat(card.product?.discount?.discountPercentage)}%</span>

                <span
                  className="loading-gradient-endDate cart">Until {moment(card.product?.discount?.endDate).format("D MMMM")} </span>
                </div>
              </>

            }
          </div>

          {!_.isEmpty(card.product.discount) &&
            < p className="card-price">{card.product.discount.discountPrice * localQuantity}$</p>
          }

          <div className="quantity">
            <Button
              className="active-button decrement"
              onClick={() => updateQuantity({cardId: card.id, value: -1})}
              disabled={(localQuantity <= 1 || loading) && updating.includes(card.id)}
            >
              <MinusIcon/>
            </Button>

            <div className={`quantity-input-wrapper ${loading && updating.includes(card.id) ? 'loading' : ''}`}>
              <input
                type="text"
                className="quantity-input"
                value={Number(localQuantity)}
                disabled={loading && updating.includes(card.id)}
                onChange={({target: {value}}) => onChange({cardId: card.id, value: Number(value)})}
              />
            </div>

            <Button
              className="active-button decrement"
              disabled={loading && updating.includes(card.id)}
              onClick={() => updateQuantity({cardId: card.id, value: 1})}
            >
              <AddIcon/>
            </Button>
          </div>
        </div>

        <div className="card-prod">
          <p className="card-desc">Product code: {`${card.product.id}-0047`}</p>
          <div

          >
            <Button
              className={`delete ${deleting.includes(card.id) ? 'button' : ''}`}
              onClick={() => handleProductDelete(card.id)}
              loading={(deleting.includes(card.id))}
            >
              <TrashIcon className="trash_con"/>

            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartItem;
