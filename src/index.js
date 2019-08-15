import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import store from "./redux/redux-store";
import Map from './Map';
import * as serviceWorker from './serviceWorker';
import Provider from "react-redux/es/components/Provider";

ReactDOM.render(
    <Provider store={store}>
      <Map/>
    </Provider>, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();

