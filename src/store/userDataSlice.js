import { createSlice } from "@reduxjs/toolkit";

const userDataSlice = createSlice({
    name : "userDataSlice",
    initialState : { 
        userInfo : [],
        productsInCart : [],
        orders : []
    },
    reducers : {
        updateUserInfo(state, actions) {
            state.userInfo = actions.payload.userInfo;
        },
        updateProductsInCart(state, actions){
            state.productsInCart = actions.payload.productsInCart;
        },
        updateOrders(state, actions){
            state.orders = actions.payload.orders;
        },
    }
})

export const userDataSliceActions = userDataSlice.actions;

export default userDataSlice;