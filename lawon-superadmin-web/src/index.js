import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import 'bootstrap/dist/css/bootstrap.css';
import '../node_modules/font-awesome/css/font-awesome.min.css';
import { createStore } from 'redux'
import reducer from './store/reducer'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'
import { store, persistor } from './store/index.js'

ReactDOM.render(<Provider store={store}>
   <PersistGate loading={null} persistor={persistor}>
      <App />
   </PersistGate></Provider>, document.getElementById('root'));

