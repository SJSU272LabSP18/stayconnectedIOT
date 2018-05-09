import React from 'react';
import ReactDOM from "react-dom";
import {Provider} from 'react-redux';
import {createStore, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import promise from 'redux-promise';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import {createLogger} from 'redux-logger';
import { PersistGate } from 'redux-persist/integration/react'

import allReducers from './reducers';
import App from './components/app';
import 'bootstrap/dist/css/bootstrap.min.css';
import './assets/css/animate.min.css';
import './assets/sass/light-bootstrap-dashboard.css?v=1.2.0';
import './assets/css/demo.css';
import './assets/css/pe-icon-7-stroke.css';
// const logger = createLogger();

const persistConfig = {
    key: 'root',
    storage,
};

const persistedReducer = persistReducer(persistConfig, allReducers)

const store = createStore(
    persistedReducer,
    applyMiddleware(thunk, promise)
);

const persistor = persistStore(store);

ReactDOM.render(
    <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
            <App />
        </PersistGate>

    </Provider>,
    document.getElementById('root')
);