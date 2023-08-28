import express from 'express';
import cors from 'cors';
import { createProxyMiddleware } from 'http-proxy-middleware';

const app = express();
app.use(cors());

app.use(
  '/',
  createProxyMiddleware({
    target: 'https://venia.magento.com/graphql',
    changeOrigin: true,
  })
);

app.listen(3001, () => {
  console.log('Server listening on port 3001');
});
