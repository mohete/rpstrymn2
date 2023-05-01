// app.js
const http = require('http');  // 'http' module
const hostname = '127.0.0.1';  // ip for localhost
const port = process.env.PORT || 3030;

const server = http.createServer((req, res) => {
  res.statusCode = 200;  // set the repsonse status code to 200 "OK"
  res.setHeader('Content-Type', 'text/plain');  // set the response MIME type  
  res.end('<p>hello, world</p>');  // write and end the response
});

server.listen(port, hostname, () => {
  console.log(`HTTP Server listening at http://${hostname}:${port}/`);
});