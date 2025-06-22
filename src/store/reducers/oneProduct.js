import {createReducer} from "@reduxjs/toolkit";
import {getOneProduct, setOneProduct} from "../actions/oneProduct";

const initialState = {
    oneProductStatus: "",
    oneProduct: {},
    popularProducts: [],
}

export const oneProduct = createReducer(initialState, (builder) => {
    builder
        .addCase(getOneProduct.pending, state => {
            state.oneProductStatus = "pending"
        })
        .addCase(getOneProduct.fulfilled, (state, {payload}) => {
            state.oneProductStatus = "ok"
            state.oneProduct = payload
        })
        .addCase(getOneProduct.rejected, state => {
            state.oneProductStatus = "error"
        })
        //-----------------------------------------------------------------------------------
        .addCase(setOneProduct, (state, {payload}) => {
            state.oneProduct = payload
        })

})


