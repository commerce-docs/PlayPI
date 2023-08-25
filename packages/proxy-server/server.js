var express = require('express');
var cors = require('cors');
var { createProxyMiddleware } = require('http-proxy-middleware');

var app = express();
app.use(cors());

app.use(
  '/',
  createProxyMiddleware({
    target: 'https://venia.magento.com/graphql',
    changeOrigin: true,
  })
);

app.listen(3001);
