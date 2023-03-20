import { createSlice } from "@reduxjs/toolkit";

const notifierSlice = createSlice({
    name : 'notifierSlice',
    initialState : { alertInfo : { showAlert : false, message : '', type : '' } },
    reducers : {
        alertInfo(state, actions){
            state.alertInfo = actions.payload.alertInfo;
        },
        hideAlert(state, actions){
            state.alertInfo = { showAlert : false, message : '', type : '' };
        }
    } 
})

export const notifierSliceActions = notifierSlice.actions;

export default notifierSlice;