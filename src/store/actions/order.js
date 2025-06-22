import {createAction, createAsyncThunk} from "@reduxjs/toolkit";
import api from "../../utills/Api";


export const getOrder = createAsyncThunk(
    "user/order",
    async (payload, thunkAPI) => {
        try {
            const {data} = await api.getOrder(payload);
            return data
        } catch (error) {
            return thunkAPI.rejectWithValue(error)
        }
    }
);

export const sendReview = createAsyncThunk(
    "user/send-review",
    async (payload, thunkAPI) => {
        try {
            const {data} = await api.sendReview(payload);
            return data
        } catch (error) {
            return thunkAPI.rejectWithValue(error)
        }
    }
);

export const getReview = createAsyncThunk(
    "user/get-review",
    async (payload, thunkAPI) => {
        try {
            const {data} = await api.getReview(payload);
            return data.review
        } catch (error) {
            return thunkAPI.rejectWithValue(error)
        }
    }
);

export const getReviewList = createAsyncThunk(
    "user/get-review-list",
    async (payload, thunkAPI) => {
        try {
            const {data} = await api.getReviewList(payload);
            return data.productsReviews
        } catch (error) {
            return thunkAPI.rejectWithValue(error)
        }
    }
);

export const getOrderReceived = createAsyncThunk(
    "user/get-review-received",
    async (payload, thunkAPI) => {
        try {
            const {data} = await api.getOrderReceived(payload);
            return data.data
        } catch (error) {
            return thunkAPI.rejectWithValue(error)
        }
    }
);

export const orderRetry = createAsyncThunk(
    "user/order-retry",
    async (payload, thunkAPI) => {
        try {
            const {data} = await api.orderRetry(payload);
            return data.payment.confirmation.confirmation_url
        } catch (error) {
            return thunkAPI.rejectWithValue(error)
        }
    }
);

export const orderConfirm = createAsyncThunk(
    "user/order-confirm",
    async (payload, thunkAPI) => {
        try {
            const {data} = await api.orderConfirm(payload);
            return data
        } catch (error) {
            return thunkAPI.rejectWithValue(error)
        }
    }
);

export const setIsOpenReview = createAction(
    "login/modalOpen-review",
)
export const setReviews = createAction(
    "set/review",
)
export const setReviewList = createAction(
    "set/reviews",
)
export const setReviewStatus = createAction(
    "login/review-status",
)
export const setOrder = createAction(
    "set/order",
)

