import { createSlice } from "@reduxjs/toolkit"

const navbarSlice = createSlice({
    name : 'navbarSlice',
    initialState : { currentValue : '' },
    reducers : {
        currrentMenu(state, actions){
           state.currentValue = actions.payload.menuName;
        }
    }
})

export const navbarSliceActions = navbarSlice.actions;

export default navbarSlice