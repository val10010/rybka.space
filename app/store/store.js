import popupManager from './reducers/popupManagerSlice';
import { combineReducers, configureStore } from '@reduxjs/toolkit';

const rootReducer = combineReducers({
    popupManager
})

export const setupStore = () => {
    return configureStore({
        reducer: rootReducer
    })
}
