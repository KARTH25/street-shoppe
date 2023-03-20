import { configureStore } from "@reduxjs/toolkit";
import navbarSlice from "./navbarSlice";
import notifierSlice from "./notifierSlice";
import uiSlice from "./uiSlice";
import userDataSlice from "./userDataSlice";


const store = configureStore({
  reducer : { navbar :  navbarSlice.reducer, user : userDataSlice.reducer, notifier : notifierSlice.reducer, uiConfigs : uiSlice.reducer }
})

export default store