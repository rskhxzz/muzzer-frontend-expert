import 'regenerator-runtime';
import '../styles/main.scss';

import App from '../views/app';

const app = new App({
  content: document.querySelector('#main-content'),
});

document.addEventListener('DOMContentLoaded', () => {
  app.renderPage();
});

window.addEventListener('hashchange', () => {
  app.renderPage();
});
