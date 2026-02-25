import React from 'react';
import ReactDOM from 'react-dom/client';
import reactToWebComponent from 'react-to-webcomponent';
import { MiddleSection } from './MiddleSection';
import './index.css';

const ReactMiddleWC = reactToWebComponent(MiddleSection, React, ReactDOM, {
  shadow: false,
});

if (typeof customElements !== 'undefined' && !customElements.get('react-middle')) {
  customElements.define('react-middle', ReactMiddleWC);
}
