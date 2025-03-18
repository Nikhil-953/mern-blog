import React from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';
import 'flowbite/dist/flowbite.css';
import { store, persistor } from './redux/store.js'; // ✅ Import persistor
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';

createRoot(document.getElementById('root')).render(
  <Provider store={store}> {/* ✅ Provider wraps the entire app */}
    <PersistGate loading={null} persistor={persistor}> {/* ✅ PersistGate inside Provider */}
      <App />
    </PersistGate>
  </Provider>
);
