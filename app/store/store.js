import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice";
import inventoryReducer from "./inventorySlice";
import transactionReducer from "./transactionSlice";
import offerReducer from "./offerSlice";

export const store = configureStore({
    reducer:{
        user:userReducer,
        inventory:inventoryReducer,
        transaction:transactionReducer,
        offer:offerReducer
    }
});


