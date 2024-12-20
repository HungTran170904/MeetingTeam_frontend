import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import rootReducer from './Redux/rootReducer';


const root = ReactDOM.createRoot(document.getElementById('root'));
const store=createStore(rootReducer);
root.render(
      <Provider store={store}>
            <React.StrictMode>
              <App />
            </React.StrictMode>
      </Provider>
);
