const net = require('net');
const fs = require('fs');

const server = net.createServer(socket => {
  console.log(`Client connected: ${socket.remoteAddress}:${socket.remotePort}`);

  socket.on('data', data => {
    const filename = data.toString().trim();
    console.log(`Requested file: ${filename}`);

    fs.readFile(filename, (err, fileData) => {
      if (err) {
        console.error(`Error reading file: ${err}`);
        socket.write('ERROR');
      } else {
        console.log(`Sending file: ${filename}`);
        socket.write(fileData);
      }
    });
  });

  socket.on('end', () => {
    console.log(`Client disconnected: ${socket.remoteAddress}:${socket.remotePort}`);
  });
});

server.listen(3000, () => {
  console.log(`Server listening on port ${server.address().port}`);
});