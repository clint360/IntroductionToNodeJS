const fs = require('fs');
const url = require('url');
const http = require('http');

function extension(val) {
  return (val === 'js') ? `script/${val.split('.').pop()}`
   :
    `text/${val.split('.').pop()}`;
}

http.createServer((req, res) => {
  let requestPath = 'static' + req.url;
  let urlpath = url.parse(req.url, true);
  urlpath = urlpath.pathname
  console.log(urlpath)
  if (urlpath === '/') {
    fs.readFile('static/index.html', (err, data) => {
      if (err) {} else {
      res.writeHead(200, { 'Content-Type': extension(urlpath) });
      res.end(data);
    }}
    )
  } else {

  fs.readFile(requestPath, (err, data) => {
    if (err) {
        fs.readFile('static/error.html', (err, data) => {
          if (err) {} else {
          res.writeHead(200, { 'Content-Type': 'text/html' });
          res.end(data);
        }}
        )
    } else {
      res.writeHead(200, { 'Content-Type': 'text/html' });
      res.end(data);
    }
  });
}}).listen(8000);