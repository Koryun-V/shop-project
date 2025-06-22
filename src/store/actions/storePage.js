import {createAction, createAsyncThunk} from "@reduxjs/toolkit";
import api from "../../utills/Api";

export const getStore = createAsyncThunk(
    "get/store",
    async (payload, thunkAPI) => {
        try {
            const {data} = await api.getStore(payload);
            return data
        } catch (error) {
            return thunkAPI.rejectWithValue(error)
        }
    }
);

export const setStore = createAction(
    "set/store",
)
