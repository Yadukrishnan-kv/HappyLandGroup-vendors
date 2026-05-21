import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import reportWebVitals from './reportWebVitals';

// Design System & Style Guide Imports
import './styles/globals/variables.css';
import './styles/globals/global.css';
import './styles/globals/utilities.css';
import './styles/animations/animation.css';
import './styles/globals/navbar.css';
import './styles/globals/footer.css';
import './styles/globals/card.css';
import './styles/globals/skeleton.css';
import './styles/pages/home.css';
import './styles/pages/inner.css';
import './styles/responsive/responsive.css';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

reportWebVitals();
