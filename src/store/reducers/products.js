import {createReducer} from "@reduxjs/toolkit";
import {
    categoriesRequest,
    createCard,
    updateCard
} from "../actions/products";
import {toast} from "react-toastify";


const initialState = {
    status: "",
    categories: [],
    statusCard: "",
    cardId: "",
    updateCardStatus: "",
}

export const products = createReducer(initialState, (builder) => {
    builder
        .addCase(categoriesRequest.pending, (state) => {
            state.status = "pending"
        })
        .addCase(categoriesRequest.fulfilled, (state, {payload}) => {
            state.status = "ok"
            state.categories = [{id: "", name: "All"}, ...payload.categories,]
        })
        .addCase(categoriesRequest.rejected, (state) => {
            state.status = "error"
        })
        //-----------------------------------------------------------------------------------
        .addCase(createCard.pending, (state) => {
            state.statusCard = "pending"
        })
        .addCase(createCard.fulfilled, (state, {payload}) => {
            state.statusCard = "ok"
            toast.success("Card created successfully.")
        })
        .addCase(createCard.rejected, (state) => {
            state.statusCard = "error"
        })
        //-----------------------------------------------------------------------------------
        .addCase(updateCard.pending, (state) => {
            state.updateCardStatus = "pending"
        })
        .addCase(updateCard.fulfilled, (state, {payload}) => {
            state.updateCardStatus = "ok"
            toast.success("Card updated successfully.")
        })
        .addCase(updateCard.rejected, (state) => {
            state.updateCardStatus = "error"
        })
});
