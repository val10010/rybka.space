import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    popup: {
        isOpen: false
    }
};

const popupManagerSlice = createSlice({
    name: 'popupManager',
    initialState: initialState,
    reducers: {
        showPopup(state, action) {
            state.popup = {
                isOpen: true,
                ...action.payload
            };
        },
        closePopup(state, action) {
            state.popup = {
                isOpen: false,
                ...action.payload
            };
        }
    }
});

export const { showPopup, closePopup } = popupManagerSlice.actions;
export default popupManagerSlice.reducer;
