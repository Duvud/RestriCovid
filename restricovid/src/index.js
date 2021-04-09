import React from 'react';
import ReactDOM from 'react-dom';
import 'antd/dist/antd.css';
import './RestriCovid.module.css';
import RestriCovid from './RestriCovid';
import reportWebVitals from './reportWebVitals';

ReactDOM.render(
  <React.StrictMode>
    <RestriCovid />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
