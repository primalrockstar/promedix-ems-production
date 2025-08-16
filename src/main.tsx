import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App-minimal'
import './index.css'

console.log('ProMedix EMS Loading...')

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
