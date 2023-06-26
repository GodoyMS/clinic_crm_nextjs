import { configureStore } from "@reduxjs/toolkit";
import clinicReducer from "@/features/auth/clinicSlice"
import thunk from "redux-thunk";



export const clinicStore=configureStore({
    reducer:{
        clinic:clinicReducer
    },
    devTools:true,
    middleware:[thunk]
    
})