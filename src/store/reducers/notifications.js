import {createReducer} from '@reduxjs/toolkit';
import {loadUnreadNotifications, markNotificationAsRead, setReadStatus,setStatus} from '../actions/notifications';

const initialState = {
    notifications: [],
    unreadCount: 0,
    status: 'idle',  // Статус загрузки уведомлений
    statusRead: '',   // Статус для пометки уведомлений как прочитанные
};

const notifications = createReducer(initialState, (builder) => {
    builder
        // Обработка загрузки уведомлений
        .addCase(loadUnreadNotifications.pending, (state) => {
            state.status = 'pending';  // В процессе загрузки
        })
        .addCase(loadUnreadNotifications.fulfilled, (state, {payload}) => {
            state.status = 'ok';  // Успешная загрузка
            state.notifications = payload;  // Загружаем уведомления
            state.unreadCount = payload.filter((notif) => !notif.read).length;  // Пересчитываем непрочитанные уведомления
        })
        .addCase(loadUnreadNotifications.rejected, (state) => {
            state.status = 'error';  // Ошибка при загрузке
        })

        // Обработка пометки уведомления как прочитанное
        .addCase(markNotificationAsRead.pending, (state) => {
            state.statusRead = 'pending';  // В процессе пометки
        })
        .addCase(markNotificationAsRead.fulfilled, (state, action) => {
            state.statusRead = 'ok';  // Успешная пометка
            const notification = state.notifications.find(
                (notif) => notif.id === action.payload
            );
            if (notification) {
                notification.read = true;
                state.unreadCount = Math.max(0, state.unreadCount - 1);  // Защита от отрицательного значения
            }
        })
        .addCase(markNotificationAsRead.rejected, (state) => {
            state.statusRead = 'error';  // Ошибка при пометке
        })

        // Добавление нового уведомления
        .addCase('notifications/addNotification', (state, action) => {
            state.notifications.unshift(action.payload);  // Добавляем новое уведомление в начало списка
            state.unreadCount++;  // Увеличиваем количество непрочитанных
        })

        // Установление списка уведомлений
        .addCase('notifications/setNotifications', (state, action) => {
            state.notifications = action.payload;  // Устанавливаем уведомления
            state.unreadCount = action.payload.filter((notif) => !notif.read).length;  // Пересчитываем непрочитанные
        })

        // Установление общего статуса
        .addCase('notifications/setStatus', (state, action) => {
            state.status = action.payload;  // Устанавливаем статус
        })
        .addCase(setStatus, (state, {payload}) => {
            state.status = payload
        })
        .addCase(setReadStatus, (state, {payload}) => {
            state.statusRead = payload
        });
});

export default notifications;
