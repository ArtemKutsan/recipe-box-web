import { useEffect } from 'react';
import { io } from 'socket.io-client';
import { useDispatch, useSelector } from 'react-redux';
import { selectIsAuthenticated } from '@/entities/auth';
import { notificationsApi } from '@/entities/notification';
import { API_BASE_URL } from '@/shared/config/api';

const SOCKET_PATH = '/api/v1/socket.io';

function getSocketOrigin() {
  return new URL(API_BASE_URL, window.location.origin).origin;
}

const SocketIoProvider = ({ children }) => {
  const dispatch = useDispatch();
  const isAuthenticated = useSelector(selectIsAuthenticated);

  useEffect(() => {
    if (!isAuthenticated) {
      return undefined;
    }

    const socket = io(getSocketOrigin(), {
      path: SOCKET_PATH,
      withCredentials: true,
    });
    // Socket сообщает об изменении, а актуальный список забираем через REST.
    const handleNewNotification = () => {
      // Payload события пока не записываем вручную: RTK Query сам повторит GET.
      dispatch(notificationsApi.util.invalidateTags([{ type: 'Notifications', id: 'LIST' }]));
    };

    socket.on('notification:new', handleNewNotification);

    return () => {
      socket.off('notification:new', handleNewNotification);
      socket.disconnect();
    };
  }, [dispatch, isAuthenticated]);

  return children;
};

export default SocketIoProvider;
