import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './utils/hooks/Store';
import { LoadScript } from '@react-google-maps/api';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <Provider store={store}>
    <React.StrictMode>
      <BrowserRouter>
        <LoadScript googleMapsApiKey="AIzaSyBLpdGBy1VDUl28Rn_AFgfnqzLj0ozj2MQ">
            <App />
        </LoadScript>
      </BrowserRouter>
    </React.StrictMode>
  </Provider>
);

reportWebVitals();
