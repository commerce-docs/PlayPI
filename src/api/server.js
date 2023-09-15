/* Copyright 2023 Adobe. All Rights Reserved.
NOTICE: Adobe permits you to use, modify, and distribute this file in
accordance with the terms of the Adobe license agreement accompanying it. */

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
