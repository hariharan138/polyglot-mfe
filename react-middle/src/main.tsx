import React from 'react';
import ReactDOM from 'react-dom/client';
import { MiddleSection } from './MiddleSection';
import './index.css';

const root = document.getElementById('root');
if (root) {
  ReactDOM.createRoot(root).render(
    <React.StrictMode>
      <MiddleSection />
    </React.StrictMode>
  );
}
