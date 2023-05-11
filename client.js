const net = require('net');
const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const client = net.createConnection({ port: 3000 }, () => {
  console.log(`Connected to server: ${client.remoteAddress}:${client.remotePort}`);

  rl.question('Enter file name: ', filename => {
    client.write(filename);
  });
});

client.on('data', data => {
  if (data.toString() === 'ERROR') {
    console.error('Error: file not found');
  } else {
    console.log(`Received file data: ${data.toString()}`);
  }

  client.end();
});

client.on('end', () => {
  console.log(`Disconnected from server: ${client.remoteAddress}:${client.remotePort}`);
});