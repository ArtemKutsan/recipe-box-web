import { createApi } from '@reduxjs/toolkit/query/react';
import { baseQuery } from '@/shared/api';

function toNotificationResponse(notification) {
  return {
    id: notification.id,
    type: notification.type,
    entityType: notification.entityType,
    actor: notification.actor ?? null,
    entity: notification.entity ?? null,
    isRead: Boolean(notification.isRead),
    readAt: notification.readAt ?? null,
    createdAt: notification.createdAt ?? null,
  };
}

export const notificationsApi = createApi({
  reducerPath: 'notificationsApi',
  baseQuery,
  tagTypes: ['Notifications'],
  endpoints: (build) => ({
    getNotifications: build.query({
      query: ({ page = 1, pageSize = 20 } = {}) =>
        `/notifications?page=${page}&pageSize=${pageSize}`,
      transformResponse: (response) => ({
        items: Array.isArray(response.items) ? response.items.map(toNotificationResponse) : [],
        page: response.page ?? 1,
        pageSize: response.pageSize ?? 20,
        total: response.total ?? 0,
        totalPages: response.totalPages ?? 0,
      }),
      providesTags: [{ type: 'Notifications', id: 'LIST' }],
    }),
    markNotificationRead: build.mutation({
      query: (notificationId) => ({
        url: `/notifications/${notificationId}/read`,
        method: 'PATCH',
      }),
      invalidatesTags: [{ type: 'Notifications', id: 'LIST' }],
    }),
  }),
});

export const {
  useGetNotificationsQuery,
  useMarkNotificationReadMutation,
} = notificationsApi;
