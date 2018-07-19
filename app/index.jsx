import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App.jsx';
import configureStore from './store/configureStore';
import { Provider } from 'react-redux';
import WebFont from 'webfontloader';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faCheckCircle, faBan } from '@fortawesome/free-solid-svg-icons';

library.add( faCheckCircle, faBan );

WebFont.load({
    google: {
        families: ['Roboto', 'Lato']
    }
});

const store = configureStore();

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById('app'));