import {createReducer} from "@reduxjs/toolkit";
import {getStore, setStore} from "../actions/storePage";

const initialState = {
    status: "",
    store: [],
}
export const storePage = createReducer(initialState, (builder) => {
    builder
        .addCase(getStore.pending, (state) => {
            state.status = "pending"
        })
        .addCase(getStore.fulfilled, (state, {payload}) => {
            state.status = "ok"
            state.store = payload.store
        })
        .addCase(getStore.rejected, (state) => {
            state.status = "error"
        })
        //-----------------------------------------------------------------------------------
        .addCase(setStore, (state, {payload}) => {
            state.store = payload
        })
});
