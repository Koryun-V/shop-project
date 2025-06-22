import {createReducer} from "@reduxjs/toolkit";
import {
    changePasswordUser,
    forgotPasswordUser,
    getUser,
    loginUser, setEmail,
    setIsOpenLogin,
    setStatus, setStatusCode,
    setStatusForgot,
} from "../actions/login";

const initialState = {
    status: "",
    statusUser:"",
    statusForgot:"",
    statusNewPassword:"",
    token:"",
    isOpenLogin:false,
    user:{},
    email:"",
    emailError:"",
}

export const login = createReducer(initialState, (builder) => {
    builder
        .addCase(loginUser.pending, (state) => {
            state.status = "pending"
        })
        .addCase(loginUser.fulfilled, (state, {payload}) => {
            state.status = "ok"
            state.token = payload
        })
        .addCase(loginUser.rejected, (state) => {
            state.status = "error"
        })
        //-----------------------------------------------------------------------------------
        .addCase(forgotPasswordUser.pending, (state) => {
            state.statusForgot = "pending"
        })
        .addCase(forgotPasswordUser.fulfilled, (state, {payload}) => {
            state.statusForgot = "ok"
        })
        .addCase(forgotPasswordUser.rejected, (state,error) => {
            state.statusForgot = "error"
            state.emailError = error.payload.response.data.message
        })
        //-----------------------------------------------------------------------------------
        .addCase(changePasswordUser.pending, (state) => {
            state.statusNewPassword = "pending"
        })
        .addCase(changePasswordUser.fulfilled, (state, {payload}) => {
            state.statusNewPassword = "ok"
        })
        .addCase(changePasswordUser.rejected, (state) => {
            state.statusNewPassword = "error"
        })
        //-----------------------------------------------------------------------------------
        .addCase(getUser.pending, (state) => {
            state.statusUser = "pending"
        })
        .addCase(getUser.fulfilled, (state, {payload}) => {
            state.statusUser = "ok"
            state.user = payload.user
        })
        .addCase(getUser.rejected, (state) => {
            state.statusUser = "error"
        })
        //-----------------------------------------------------------------------------------
        .addCase(setStatus, (state, {payload}) => {
            state.status = payload
        })
        .addCase(setStatusForgot, (state, {payload}) => {
            state.statusForgot = payload
        })
        .addCase(setStatusCode, (state, {payload}) => {
            state.statusNewPassword = payload
        })
        .addCase(setIsOpenLogin, (state, {payload}) => {
            state.isOpenLogin = payload
        })
        .addCase(setEmail, (state, {payload}) => {
            state.email = payload
        })
});
