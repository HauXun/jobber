import { io, Socket } from 'socket.io-client';

export const socket = (function () {
  let socket: Socket | null = null;
  socket = io(import.meta.env.VITE_BASE_ENDPOINT, {
    transports: ['websocket'],
    secure: true
  });
  socket.on('connect', () => {
    console.log('Connected to server');
  });

  socket.on('disconnect', (reason: Socket.DisconnectReason) => {
    console.log(`Reason: ${reason}`);
    socket.connect();
  });

  socket.on('connect_error', (error: Error) => {
    console.log(`${error}`);
    socket.connect();
  });

  return socket;
})();
