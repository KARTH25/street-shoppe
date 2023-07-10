import { createSlice } from "@reduxjs/toolkit";

const userDataSlice = createSlice({
    name : "userDataSlice",
    initialState : { 
        userInfo : [],
        productsInCart : [],
        orders : {},
        checkout : [],
        streekInfo : {}
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
        checkoutSlice(state, actions){
            state.checkout = actions.payload.checkout;
        },
        updateStreekInfo(state, actions){
            state.streekInfo = actions.payload.streekInfo;
        }
    }
})

export const userDataSliceActions = userDataSlice.actions;

export default userDataSlice;