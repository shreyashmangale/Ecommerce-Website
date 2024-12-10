import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { Provider } from 'react-redux';
import store from '../src/redux/store.js'
import { CartContextProvider } from './context/cartContext.js';
import { WishlistContextProvider } from './context/wishlistContext.js';
import { SearchProvider } from './context/searchContext.js';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <CartContextProvider>
        <WishlistContextProvider>
          <SearchProvider>
            <App />
          </SearchProvider>
        </WishlistContextProvider>
      </CartContextProvider>
    </Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
