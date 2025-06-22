import axios from 'axios';
import {createAction, createAsyncThunk} from "@reduxjs/toolkit";

const serverUrl = 'https://world-of-construction.onrender.com';
const token = localStorage.getItem('token');

export const loadUnreadNotifications = createAsyncThunk(
    'notifications/loadUnreadNotifications', // Название действия
    async (_, { rejectWithValue }) => {
        try {
            const response = await axios.get(`${serverUrl}/notifications/unread`, {
                headers: {
                    Authorization: token,
                },
            });
            return response.data.notifications;  // Возвращаем данные уведомлений
        } catch (error) {
            console.error('Error loading notifications:', error);
            return rejectWithValue(error.response.data);  // Обработка ошибок
        }
    }
);

export const markNotificationAsRead = createAsyncThunk(
    'notifications/markAsRead',
    async (notificationId, { rejectWithValue }) => {
        try {
            await axios.patch(
                `${serverUrl}/notifications/${notificationId}/read`,
                null,
                { headers: { Authorization: token } }
            );
            return notificationId;  // Возвращаем ID уведомления, которое было помечено как прочитанное
        } catch (error) {
            return rejectWithValue(error.response.data || error.message);
        }
    }
);

export const addNotification = (notification) => {
    return {
        type: 'notifications/addNotification',
        payload: notification,
    };
};

export const setReadStatus = createAction(
    "read/status",
)
export const setStatus = createAction(
    "notifications/status",
)
