import {createReducer} from "@reduxjs/toolkit";
import {
    activateUser,
    registrationUser,
    resendActivateUser,
    setDeleteEmail,
    setStatus, setStatusActive,
    setStatusKey, setStatusRegister, userDelete
} from "../actions/registration";

const initialState = {
    status: "",
    token:"",
    statusKey:"",
    statusResendKey:"",
    deleteEmail:"",
    statusActive:"",
    statusDelete:"",
    email:"",
    statusRegister:"",
}

export const registration = createReducer(initialState, (builder) => {
    builder
        .addCase(registrationUser.pending, (state) => {
            state.status = "pending"
        })
        .addCase(registrationUser.fulfilled, (state, {payload}) => {
            state.status = "ok"
            state.token = payload.token
            state.statusActive = payload.result.status
        })
        .addCase(registrationUser.rejected, (state,error) => {
            state.status = "error"
            state.statusRegister = error.payload.response.data.status

        })

        .addCase(activateUser.pending, (state) => {
            state.statusKey = "pending"
        })
        .addCase(activateUser.fulfilled, (state, {payload}) => {
            state.statusKey = "ok"
        })
        .addCase(activateUser.rejected, (state) => {
            state.statusKey = "error"
        })

        .addCase(resendActivateUser.pending, (state) => {
            state.statusResendKey = "pending"
        })
        .addCase(resendActivateUser.fulfilled, (state, {payload}) => {
            state.statusResendKey = "ok"
        })
        .addCase(resendActivateUser.rejected, (state) => {
            state.statusResendKey = "error"
        })

        .addCase(userDelete.pending, (state) => {
            state.statusDelete = "pending"
        })
        .addCase(userDelete.fulfilled, (state, {payload}) => {
            state.statusDelete = "ok"
        })
        .addCase(userDelete.rejected, (state) => {
            state.statusDelete = "error"
        })




        .addCase(setStatus, (state,{payload}) => {
            state.status = payload
        })

        .addCase(setStatusKey, (state,{payload}) => {
            state.statusKey = payload
        })
        .addCase(setDeleteEmail, (state,{payload}) => {
            state.deleteEmail = payload
        })
        .addCase(setStatusRegister, (state,{payload}) => {
            state.statusRegister = payload
        })

        .addCase(setStatusActive, (state,{payload}) => {
            state.statusActive = payload
        })

});
