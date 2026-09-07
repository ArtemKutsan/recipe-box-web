import { useEffect } from 'react';
import { io } from 'socket.io-client';
import { useSelector } from 'react-redux';
import { selectIsAuthenticated } from '@/entities/auth';
import { API_BASE_URL } from '@/shared/config/api';

const SOCKET_PATH = '/api/v1/socket.io';

function getSocketOrigin() {
  return new URL(API_BASE_URL, window.location.origin).origin;
}

const SocketIoProvider = ({ children }) => {
  const isAuthenticated = useSelector(selectIsAuthenticated);

  useEffect(() => {
    if (!isAuthenticated) {
      return undefined;
    }

    const socket = io(getSocketOrigin(), {
      path: SOCKET_PATH,
      withCredentials: true,
    });

    return () => {
      socket.disconnect();
    };
  }, [isAuthenticated]);

  return children;
};

export default SocketIoProvider;
