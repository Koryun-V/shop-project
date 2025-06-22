import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    path: null,
};

const authRedirectSlice = createSlice({
    name: 'authRedirect',
    initialState,
    reducers: {
        setRedirectPath: (state, action) => {
            state.path = action.payload;
        },
        clearRedirectPath: (state) => {
            state.path = null;
        },
    },
});

export const { setRedirectPath, clearRedirectPath } = authRedirectSlice.actions;
export default authRedirectSlice.reducer;
