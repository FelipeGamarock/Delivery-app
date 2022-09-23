import React from 'react';
import ReactDOM from 'react-dom';
import { createBrowserHistory } from 'history';
import { BrowserRouter as Router } from 'react-router-dom';
import reportWebVitals from './reportWebVitals';
import CustomerProvider from './context/customer.provider';
import App from './App';

const history = createBrowserHistory();

ReactDOM.render(
  <Router history={ history }>
    <React.StrictMode>
      <CustomerProvider>
        <App />
      </CustomerProvider>
    </React.StrictMode>
  </Router>,
  document.getElementById('root'),
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
