import React from 'react';
import {createRoot} from 'react-dom/client';
import './index.css';
import * as serviceWorker from './serviceWorker';
import {Provider} from 'react-redux';
import {BrowserRouter, HashRouter} from "react-router-dom";
import {store} from "./app";
import App from "./app/ui/App";

const rerenderEntireTree = () => {
    const container = document.getElementById('root') as HTMLElement
    const root = createRoot(container);
    root.render(
        <Provider store={store}>
            <HashRouter>
                <App/>
            </HashRouter>
        </Provider>
    );
}

rerenderEntireTree()
// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();

if (process.env.NODE_ENV === 'development' && module.hot) {
    module.hot.accept('./app/ui/App', () => {
        rerenderEntireTree()
    })
}
