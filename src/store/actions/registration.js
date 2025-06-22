import {createAction, createAsyncThunk} from "@reduxjs/toolkit";
import api from "../../utills/Api";


export const registrationUser = createAsyncThunk(
    "user/registration",
    async (payload, thunkAPI) => {
        try {
            const {data} = await api.registrationUser(payload);
            return data
        } catch (error) {
            return thunkAPI.rejectWithValue(error)
        }
    }
);

export const activateUser = createAsyncThunk(
    "user/activate",
    async (payload, thunkAPI) => {
        try {
            const {data} = await api.activateUser(payload);
            return data
        } catch (error) {
            return thunkAPI.rejectWithValue(error)
        }
    }
);

export const resendActivateUser = createAsyncThunk(
    "user/resend-activate",
    async (payload, thunkAPI) => {
        try {
            const {data} = await api.resendActivateUser(payload);
            return data
        } catch (error) {
            return thunkAPI.rejectWithValue(error)
        }
    }
);
export const userDelete = createAsyncThunk(
    "user/delete-user",
    async (payload, thunkAPI) => {
        try {
            const {data} = await api.userDelete(payload);
            return data
        } catch (error) {
            return thunkAPI.rejectWithValue(error)
        }
    }
);

export const setStatus = createAction(
    "register/status",
)
export const setStatusKey = createAction(
    "register/status-key",
)
export const setStatusActive = createAction(
    "register/status-active",
)

export const setDeleteEmail = createAction(
    "register/delete-email",
)
export const setStatusRegister = createAction(
    "register/status-register",
)
