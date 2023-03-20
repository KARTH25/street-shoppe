import { createSlice } from "@reduxjs/toolkit";

const uiSlice = createSlice({
    name : 'uiSlice',
    initialState : { 
        uiConfigs : {}
    },
    reducers : {
        updateConfigs(state,actions){
           state.uiConfigs = actions.payload.uiConfigs;
        }
    }
})

export const uiSliceActions = uiSlice.actions;

export default uiSlice;