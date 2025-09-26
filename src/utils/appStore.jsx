import { configureStore } from '@reduxjs/toolkit'
import userReducer from './userSlice'
import feedReducer from "./feedSlice";
import connectionReducer from "./connectionSlice";
import requestReducer from './connectionSlice';
import matchReducer from './matchSlice';

const appStore = configureStore({
    reducer: {
        user: userReducer, 
        feed: feedReducer,
        connection: connectionReducer,
        requests: requestReducer,
        match: matchReducer,
    },
});

export default appStore;