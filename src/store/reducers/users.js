import {createReducer} from '@reduxjs/toolkit';
import {
    getUserProfileRequest,
    updateUserProfileRequest,
    setProfile,
    updatePassword,
    setPasswordData,
    setAvatar
} from '../actions/users';

const initialState = {
    profile: {},
    error: null,
    profileUpdated: {},
    user: {},
    passwordError: {},
    successMessage: null,
    validationErrors: {},
    passwordData: {
        currentPassword: '',
        newPassword: '',
        confirmPassword: '',
    },
    avatar: null,
    status: "",
};

export const userSlice = createReducer(initialState, (builder) => {
    builder
        .addCase(getUserProfileRequest.pending, (state) => {
            state.error = null;
        })
        .addCase(getUserProfileRequest.fulfilled, (state, {payload}) => {
            const {firstName, lastName, gender, dateOfBirth, address, id} = payload;

            state.profile = {firstName, lastName, gender, dateOfBirth, address, id};
            state.user = payload;

        })
        .addCase(getUserProfileRequest.rejected, (state) => {
            state.error = 'Error fetching user profile data';
        })
        //-----------------------------------------------------------------------------------
        .addCase(updateUserProfileRequest.pending, (state) => {
            state.validationErrors = {};
            state.successMessage = null;
            state.status = "pending"
        })
        .addCase(updateUserProfileRequest.fulfilled, (state, {payload}) => {
            state.profileUpdated = payload;
            state.successMessage = payload.message;
            state.validationErrors = {};
            state.status = "ok"
        })
        .addCase(updateUserProfileRequest.rejected, (state, {payload}) => {
            if (payload) {
                state.validationErrors = payload;
            }
            state.successMessage = null;
            state.status = "error"
        })
        //-----------------------------------------------------------------------------------
        .addCase(updatePassword.pending, (state) => {
            state.passwordError = {};
            state.successMessage = null;
        })
        .addCase(updatePassword.fulfilled, (state, {payload}) => {
            state.passwordError = {};
            state.passwordData = {
                currentPassword: '',
                newPassword: '',
                confirmPassword: '',
            };
            state.successMessage = payload.message;
        })
        .addCase(updatePassword.rejected, (state, {payload}) => {
            state.passwordError = payload;
            state.successMessage = null;
        })
        //-----------------------------------------------------------------------------------
        .addCase(setProfile, (state, {payload}) => {
            const {dateOfBirth} = payload;

            state.validationErrors = {}
            state.profile = {
                ...state.profile, ...payload, dateOfBirth: dateOfBirth === 'Invalid date'
                    ? state.user.dateOfBirth
                    : dateOfBirth
            };

            state.successMessage = null;
        })
        .addCase(setPasswordData, (state, {payload}) => {
            const {newPassword, confirmPassword} = payload;
            state.passwordError = {};

            // state.passwordError = Utils.isValidatePassword({ password: newPassword, confirmPassword });
            state.passwordData = {...state.passwordData, newPassword, confirmPassword};
        })
        .addCase(setAvatar, (state, {payload}) => {
            state.avatar = payload;
        });
});
