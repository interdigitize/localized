import React from 'react';
import ReactDOM from 'react-dom';
import Index from './Index.jsx';
import { LocaleProvider } from 'antd';
import enUS from 'antd/lib/locale-provider/en_US';

ReactDOM.render(
  <LocaleProvider locale={enUS}>
    <Index />
  </LocaleProvider>,
  document.getElementById('root')
);
