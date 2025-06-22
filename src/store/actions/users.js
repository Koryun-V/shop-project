import {createAction, createAsyncThunk} from "@reduxjs/toolkit";
import Api from "../../utills/Api";
import {toast} from 'react-toastify';
import Utils from "../../components/helpers/Utils";
import _ from "lodash";

export const getUserProfileRequest = createAsyncThunk(
  'profile/fetchUserProfile',
  async () => {
    const {data : {user}} = await Api.getProfile();
    return user
  }
);

export const updateUserProfileRequest = createAsyncThunk(
  'profile/updateUserProfile',
  async (payload, {rejectWithValue}) => {
    const validationErrors = Utils.isValidateProfileData(payload);

    if (!_.isEmpty(validationErrors)) {
      return rejectWithValue(validationErrors);
    }else{
      try {
        const response = await Api.updateUser({data: payload});
        toast.success(`${response.data.message}!`);
        return response.data;

      } catch (error) {
        toast.error("Error updating profile");
        return rejectWithValue(error.response?.data);
      }
    }
  }
);

export const updatePassword = createAsyncThunk(
  'password/updatePassword',
  async (payload, {rejectWithValue}) => {
    const {newPassword, confirmPassword} = payload
    const validationErrors = Utils.isValidatePassword({password: newPassword, confirmPassword: confirmPassword});
    if (!_.isEmpty(validationErrors)) {
      return rejectWithValue(validationErrors);
    }
    try {
      const data = await Api.updateUserPassword({newPassword});
      toast.success(data.data.message);
      return data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const setProfile = createAction('profile/setProfile');

export const setPasswordData = createAction('create/setPassword');

export const setAvatar = createAction('profile/setAvatar');
