import {applyMiddleware, combineReducers} from "redux";
import {configureStore} from "@reduxjs/toolkit";
import {thunk} from 'redux-thunk';

import HomeReducer from "./reducers/home.reducer";

const reducer = combineReducers({
    home: HomeReducer
});

const store = configureStore({
    reducer: reducer,
    middleware: getDefaultMiddleware =>
        getDefaultMiddleware({
            thunk: applyMiddleware(thunk)
        }),
})

export default store;