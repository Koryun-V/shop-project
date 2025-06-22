import {createReducer} from '@reduxjs/toolkit';
import {
    fetchCards,
    updateCard,
    deleteCard,
    makePayment,
    setSelectedProducts,
    loadTransformedArray, deleteAllCartRequest, setCards
} from "../actions/card"
import _ from "lodash";


const initialState = {
    cardData: {
        cards: [],
    },
    loading: true,
    deleting: [],
    error: null,
    message: "",
    confirmationUrl: null,
    selectedProducts: {},
    products: [],
    transformedArray: [],
    updating: [],
    totalCards: 0,
    status: "",
    statusGet: "",
    card: []
};

export const card = createReducer(initialState, (builder) => {
    builder
        // Fetch cards
        .addCase(fetchCards.pending, (state) => {
            state.loading = true;
            state.statusGet = "pending"
        })
        .addCase(fetchCards.fulfilled, (state, action) => {
            const {meta: {arg: {page}}, payload} = action
            state.loading = false;
            state.statusGet = "ok"
            state.totalCards = payload.total
            state.cardData = {
                cards: page === 1
                    ? payload.cards
                    : [...state.cardData.cards, ...payload.cards]
            };
            state.card = payload.cards
            const selectedProducts = JSON.parse(localStorage.getItem('selectedProducts')) || {};

            const selectedProductIds = _.keys(selectedProducts).filter(key => selectedProducts[key]);

            state.products = state.cardData.cards
                .filter(card => selectedProductIds.includes(String(card.id)))
        })
        .addCase(fetchCards.rejected, (state) => {
            state.loading = false;
            state.statusGet = "error"
            state.card = []
        })
        //-----------------------------------------------------------------------------------
        .addCase(updateCard.pending, (state, action) => {
            state.loading = true;
            state.updating = [action.meta.arg.cardId, ...state.updating]
        })
        .addCase(updateCard.fulfilled, (state, {payload}) => {
            const {cardId, quantity, value} = payload;

            state.cardData.cards = state.cardData.cards.map((card) =>
                card.id === cardId ? {...card, quantity: value} : card
            );
            state.updating = state.updating.filter((id) => id !== cardId)

            const selectedProducts = JSON.parse(localStorage.getItem('selectedProducts')) || {};

            const selectedProductIds = _.keys(selectedProducts).filter(key => selectedProducts[key]);

            state.products = state.cardData.cards
                .filter(card => selectedProductIds.includes(String(card.id)))

            state.loading = false;
        })

        .addCase(updateCard.rejected, (state) => {
            state.loading = false;
        })
        //-----------------------------------------------------------------------------------
        // Delete card
        .addCase(deleteCard.pending, (state, {meta: {arg}}) => {
            state.deleting = [arg, ...state.deleting];
            state.status = "pending"
        })

        .addCase(deleteCard.fulfilled, (state, {payload}) => {
            state.cardData.cards = state.cardData.cards.filter((card) => card.id !== payload);
            state.deleting = state.deleting.filter((id) => id !== payload)
            state.status = "ok"
        })
        //-----------------------------------------------------------------------------------
        .addCase(setSelectedProducts, (state, action) => {
            const updatedSelectedProducts = action.payload;
            state.selectedProducts = updatedSelectedProducts;

            localStorage.setItem('selectedProducts', JSON.stringify(updatedSelectedProducts));

            const selectedProductIds = _.keys(updatedSelectedProducts).filter(key => updatedSelectedProducts[key]);

            state.products = state.cardData.cards.filter(card => selectedProductIds.includes(String(card.id)));

            state.transformedArray = state.products.map(card => ({
                productId: card.product.id,
                quantity: card.quantity,
            }));
        })
        //-----------------------------------------------------------------------------------

        .addCase(loadTransformedArray, (state) => {
            const selectedProducts = JSON.parse(localStorage.getItem('selectedProducts')) || {};

            const selectedProductIds = _.keys(selectedProducts).filter(key => selectedProducts[key]);

            state.products = state.cardData.cards
                .filter(card => selectedProductIds.includes(String(card.id)))

            state.transformedArray = state.products
                .map(card => (
                    {
                        productId: card.product.id,
                        quantity: card.quantity,
                    }
                ));
        })
        //-----------------------------------------------------------------------------------

        //payment
        .addCase(makePayment.pending, (state) => {
            state.error = null;
        })
        .addCase(makePayment.fulfilled, (state, {payload}) => {
            state.confirmationUrl = payload;
        })
        .addCase(makePayment.rejected, (state, {payload}) => {
            state.error = payload;
        })
        //-----------------------------------------------------------------------------------
        .addCase(deleteAllCartRequest.pending, (state) => {
            state.loading = true;
            state.status = "pending"
        })
        .addCase(deleteAllCartRequest.fulfilled, (state) => {
            state.cardData = {cards: []};
            state.loading = false;
            state.status = "ok"
        })
        .addCase(deleteAllCartRequest.rejected, (state) => {
            state.loading = false;
            state.status = "error"
        })
        //-----------------------------------------------------------------------------------
        .addCase(setCards, (state, {payload}) => {
            state.cardData.cards = payload
        })
});
