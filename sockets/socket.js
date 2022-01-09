const { io } = require('../index');

// Socket messages
io.on('connection', client => {
  // client.on('event');
  console.log('Client connected');
  client.on('disconnect',  () => {
    console.log('Disconnected client!');
  });

  client.on('message', (payload) => {
    console.log(`Message from ${payload.name}`);
    io.emit('message', {admin: 'New message received!!'});
  });
});