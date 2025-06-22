import {createAction, createAsyncThunk,} from "@reduxjs/toolkit";
import api from "../../utills/Api";


export const getOneProduct = createAsyncThunk(
  "oneProduct/getOneProduct",
  async (payload, thunkAPI) => {
    try {

      const {data} = await api.getOneProduct(payload);
      return data
    } catch (error) {
      return thunkAPI.rejectWithValue(error)
    }
  }
)

export const setOneProduct = createAction(
    "one/product",
)



