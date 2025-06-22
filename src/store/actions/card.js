import {createAction, createAsyncThunk} from "@reduxjs/toolkit";
import Api from "../../utills/Api";
import {toast} from "react-toastify";

export const fetchCards = createAsyncThunk(
  'cart/fetchCards', async (payload) => {
    const {data} = await Api.getCardList(payload);
    return data;
  });


export const createCard = createAsyncThunk(
  "cart/createCard", async (payload, thunkAPI) => {
    try {
      const {data} = await Api.createCard(payload);
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error)
    }
  }
)


export const updateCard = createAsyncThunk(
  'cart/updateCard', async (payload) => {
    const {cardId, quantity,} = payload;
    await Api.updatedCard({cardId, quantity});
    return payload;
  });

export const deleteCard = createAsyncThunk(
  'cart/deleteCard', async (cardId) => {
    const data = await Api.deleteCart({cardId});
    toast.success(data?.data?.message)
    return cardId
  });


export const deleteAllCartRequest = createAsyncThunk(
  'all/clearCard', async () => {
    const {data} = await Api.deleteAllCart();
    return data
  });

export const makePayment = createAsyncThunk(
  'order/makePayment',
  async (products, {rejectWithValue}) => {
    try {
      const response = await Api.payment({products});
      if (response.status === 201) {
        return response.data.payment.confirmation.confirmation_url;
      } else {
        return rejectWithValue("Payment failed");
      }
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const setSelectedProducts = createAction('card/setSelectedProducts');

export const loadTransformedArray = createAction('card/loadTransformedArray');

export const setCards  = createAction(
    "set/cards",
)



