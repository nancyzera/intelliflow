export function initNotificationSocket(io) {
  io.on('connection', (socket) => {
    socket.emit('connected', { ok: true, message: 'Connected to IntelliFlow notifications' });
  });
}


