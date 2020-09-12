import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import reducer, { initialState } from './reducer';
import { StateProvider } from './StateProvider';

ReactDOM.render(
  <React.StrictMode>
    {/* Wraps the app in the state provider */}
    {/* initial state - what does the data layer look like in the beginning */}
    {/* reducer - how can we manipulate / play with the data layer */}
    <StateProvider initialState={initialState} reducer={reducer}>
      <App />
    </StateProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
