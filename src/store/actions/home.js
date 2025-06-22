import {createAction, createAsyncThunk} from "@reduxjs/toolkit";
import api from "../../utills/Api";


export const getPopularProducts = createAsyncThunk(
    "products/get-popular-products",
    async (payload, thunkAPI) => {
        try {
            const {data} = await api.getPopularProducts(payload)
            return data.data
        } catch (err) {
            return thunkAPI.rejectWithValue(err)
        }
    })

export const getSharesProducts = createAsyncThunk(
    "products/getSharesProducts",
    async (payload, thunkAPI) => {
        try {
            const {data} = await api.getSharesProducts(payload)
            return data.discounts
        } catch (err) {
            return thunkAPI.rejectWithValue(err)
        }
    })

export const getAllProducts = createAsyncThunk(
    "home/getProducts",
    async (payload, thunkAPI) => {
        try {
            const {data} = await api.getAllProducts(payload)
            return data
        } catch (err) {
            return thunkAPI.rejectWithValue(err)
        }
    })

export const getAllNames = createAsyncThunk(
  "home/getAllNames",
  async (payload, thunkAPI) => {
    try {
      const {data} = await api.getAllProducts(payload)
      return data
    }catch(err) {
      return thunkAPI.rejectWithValue(err)
    }
  }
)

export const getStores = createAsyncThunk(
    "products/getStores",
    async (payload, thunkAPI) => {
        try {
            const {data} = await api.getStores(payload)
            return data
        } catch (err) {
            return thunkAPI.rejectWithValue(err)
        }
    }
)

export const getRandomReviews = createAsyncThunk(
    "random/reviews",
    async (payload, thunkAPI) => {
        try {
            const {data} = await api.getRandomReviews(payload)
            return data.randomReviews
        } catch (err) {
            return thunkAPI.rejectWithValue(err)
        }
    }
)

export const setCategoryId = createAction(
    "products/setCategoryId",
    (payload) => ({
        payload,
    })
)


export const setProductId = createAction(
    "products/setProductId",
    (payload) => ({
        payload,
    })
)

export const setProduct= createAction(
  "products/setProduct",
  (payload) => ({
    payload,
  })
)

export const setProductsList= createAction(
    "products/setProductsList",
    (payload) => ({
        payload,
    })
)

export const setSearchValue = createAction(
    "products/setSearchValue",
    (payload) => ({
        payload,
    })
)

export const setStoreId = createAction(
    "products/setStoreId",
    (payload) => ({
        payload,
    })
)

export const setNameData = createAction(
  "products/setNameData",
  (payload) => ({
    payload,
  })
)

export const setUserId = createAction(
    "user/id",
)

export const clearProductNames  = createAction(
  "products/clearProductNames",
)
export const setPopularProducts  = createAction(
    "set/Products-Popular",
)
export const setSharesProducts  = createAction(
    "set/Products-shares",
)
