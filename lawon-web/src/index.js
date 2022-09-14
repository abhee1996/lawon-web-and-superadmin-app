import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

import 'bootstrap/dist/css/bootstrap.css';
import 'react-phone-number-input/style.css'

import './index.css';
import App from './App';
import '../node_modules/font-awesome/css/font-awesome.min.css';
import store from './store';
import './utils/interceptors';


window.baseUrl = "https://lawon.herokuapp.com"
// window.baseUrl = "http://localhost:3000";
// window.baseUrl = "http://192.168.18.195:3000";


ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);
