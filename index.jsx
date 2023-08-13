import React from 'react';
import ReactDOM from 'react-dom/client';
import ProductExplorer from './App';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.Profiler id='main'>
    <ProductExplorer />
  </React.Profiler>,
);
