import React from 'react';
import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import './index.css';
import App from './App.js';
import * as serviceWorker from './serviceWorker.js';
import reducer from './store/reducer.js';
import version from './version.js'
console.log(`Refreshed at: ${version.version}`)

const store = createStore(reducer, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());

const app = (
  <Provider store={store}>
    <App />
  </Provider>
);

createRoot(document.getElementById('root')).render(app)

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
