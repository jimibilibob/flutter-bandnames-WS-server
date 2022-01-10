const { io } = require('../index');
const Band = require('../models/band');
const Bands = require('../models/bands');

const bands = new Bands;

bands.addBand( new Band('Queen'));
bands.addBand( new Band('Moderato'));
bands.addBand( new Band('Black Eyed Peace'));
bands.addBand( new Band('Avicci'));

// Socket messages
io.on('connection', client => {
  
  client.emit('active-bands', bands.getBands());

  console.log('Client connected');
  client.on('disconnect',  () => {
    console.log('Disconnected client!');
  });

  client.on('message', (payload) => {
    console.log(`Message from ${payload.name}`);
    io.emit('message', {admin: 'New message received!!'});
  });

  client.on('emit-message', (payload) => {
    console.log(`Message from ${payload.name}`);
    // io.emit('new-message', {admin: payload}); // emist to everybody
    client.broadcast.emit('new-message', {admin: payload}); // emist to everybody but you
  });

  client.on('vote-band', (payload) => {
    bands.voteBand(payload.id);
    io.emit('active-bands', bands.getBands());
  });

  client.on('add-band', (payload) => {
    bands.addBand(new Band(payload.name));
    io.emit('active-bands', bands.getBands());
  });

  client.on('delete-band', (payload) => {
    bands.deleteBand(new Band(payload.name));
    io.emit('active-bands', bands.getBands());
  });
});