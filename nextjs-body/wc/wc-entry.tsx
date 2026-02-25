import React from 'react';
import ReactDOM from 'react-dom/client';
import reactToWebComponent from 'react-to-webcomponent';
import { MainBody } from '../components/MainBody';

const NextJsBodyWC = reactToWebComponent(MainBody, React, ReactDOM, {
  shadow: false,
});

if (typeof customElements !== 'undefined' && !customElements.get('nextjs-body')) {
  customElements.define('nextjs-body', NextJsBodyWC);
}
