import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';

ReactDOM.render(
    <App />,
    document.getElementById('root')
);

//Hot Module Replacement (HMR) is a tool for reloading your application in the browser without the page refresh.
if (module.hot) {
    module.hot.accept();
}

