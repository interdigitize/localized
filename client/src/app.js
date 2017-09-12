import React from 'react';
import ReactDOM from 'react-dom';
import Index from './Index.jsx';
import { LocaleProvider } from 'antd';
import enUS from 'antd/lib/locale-provider/en_US';
import { BrowserRouter } from 'react-router-dom';
import './styles/global-styles.js';

ReactDOM.render(
  <BrowserRouter>
    <LocaleProvider locale={enUS}>
      <Index />
    </LocaleProvider>
  </BrowserRouter>,
  document.getElementById('root')
);
