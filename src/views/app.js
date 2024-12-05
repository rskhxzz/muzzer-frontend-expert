import routes from '../../src/scripts/routes/routes';
import UrlParser from '../scripts/routes/url-parser';

class App {
  constructor({ content }) {
    this._content = content;
  }

  async renderPage() {
    const url = UrlParser.parseActiveUrlWithCombiner();
    const page = routes[url];
    this._content.innerHTML = await page.render();
    await page.afterRender();

    document.getElementById('menu-button').addEventListener('click', () => {
      const sidebar = document.getElementById('sidebar');
      sidebar.classList.toggle('show');
    });

    const menuButton = document.getElementById('menu-button');
    const navList = document.getElementById('nav-list');

    menuButton.addEventListener('click', () => {
      navList.classList.toggle('show');
    });

    const skipLinkElem = document.querySelector('.skip-link');
    if (skipLinkElem) {
      skipLinkElem.addEventListener('click', (event) => {
        event.preventDefault();
        document.querySelector('#main-content').focus();
      });
    }

    if ('serviceWorker' in navigator) {
      window.addEventListener('load', () => {
        navigator.serviceWorker
          .register('/sw.js')
          .then((registration) => {
            console.log('Service Worker berhasil didaftarkan:', registration);
          })
          .catch((error) => {
            console.log('Pendaftaran Service Worker gagal:', error);
          });
      });
    }
  }
}

export default App;
