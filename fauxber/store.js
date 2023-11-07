// where the "store"/data layer'll live

import { configureStore } from "@reduxjs/toolkit";
import navReducer from './slices/navSlice'; // pulls the navigation reducer through from navSlice

export const store = configureStore({
    reducer: {
        nav: navReducer, // connects it to the store
    },
})