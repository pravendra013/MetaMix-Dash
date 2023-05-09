import { createSlice } from '@reduxjs/toolkit';

// initial state
const initialState = {
    openDeleteForm: false,
    openUpdateForm: false
};

// ==============================|| OPEN - FORM ||============================== //

const form = createSlice({
    name: 'form',
    initialState,
    reducers: {
        activeDeleteForm(state, action) {
            // state.openDeleteForm = !state.openDeleteForm;
            state.openDeleteForm = action.payload.switch;
        },

        activeUpdateForm(state, action) {
            state.openUpdateForm = action.payload.switch;
        }
    }
});

export default form.reducer;

export const { activeDeleteForm, activeUpdateForm } = form.actions;
