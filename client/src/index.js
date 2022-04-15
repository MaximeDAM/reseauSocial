import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import "./styles/index.scss";
import { Provider } from 'react-redux';
import { applyMiddleware, createStore } from 'redux';
import thunk from "redux-thunk"
import rootReducer from "./reducers/indexReducer"

//dev tools
import {composeWithDevTools} from "redux-devtools-extension"


const store = createStore(
    rootReducer, composeWithDevTools(applyMiddleware(thunk))
)

const rootElement = document.getElementById('root');
const root = createRoot(rootElement);

root.render(
    <Provider store={store}>
    <App />
    </Provider>
);

