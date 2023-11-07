// responsible for everything inside of the navigation

import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// the initial state
const initialState = {
    origin: null, // starting point
    destination: null, 
    travelTimeInformation: null, // info on the time it takes to get from point A to point B
};

export const navSlice = createSlice({
    name: 'nav',
    initialState,
    
    // a way to dispatch action into the data layer
    reducers: {
        setOrigin: (state, action) => { 
            state.origin = action.payload;
        },
        setDestination: (state, action) => {
            state.destination = action.payload;
        },
        setTravelTimeInformation: (state, action) => {
            state.travelTimeInformation = action.payload;
        },
    },
});

export const { setOrigin, setDestination, setTravelTimeInformation } = navSlice.actions;

// the selectors
export const selectOrigin = (state) => state.nav.origin;
export const selectDestination = (state) => state.nav.destination;
export const selectTravelTimeInformation = (state) => state.nav.travelTimeInformation


export default navSlice.reducer; // file's primary export