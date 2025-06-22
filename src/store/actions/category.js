import {createAsyncThunk} from "@reduxjs/toolkit";
import axios from "axios";

export const getCategory = createAsyncThunk(
  "get/category",
  async (payload, thunkAPI) => {
    try {
      const {data} = await axios.get(`https://world-of-construction.onrender.com/categories/list`,{
        params: {
          limit: 10
        }
      })
      return data
    } catch (error) {
      return thunkAPI.rejectWithValue(error)
    }
  }
);
