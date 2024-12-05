import FetchData from '../../scripts/data/fetch-data';
import { createRestaurantItemTemplate, renderSkeletonUI } from '../templates';
import './../../styles/main.scss';

const Home = {
  async render() {
    return `
      <section class="hero">
        <img src="./images/heros/hero-image_2.jpg" alt="Cozy restaurant view" class="hero-img" />

        <div class="hero-overlay">
          <h1 class="hero-title">Experience the finest dining with a cozy ambiance</h1>
          <a href="#content" class="hero-btn">Explore Our Restaurants</a>
        </div>
      </section>

      <main id="content">
          <section class="main-content">
              <div class="latest-explore">
                  <h1  tabindex="0">Explore Restaurant</h1>
                  <div id="loading-indicator" class="loading-indicator" style="display: none;">
                    Loading...
                  </div>
                  <div class="restaurant-list"></div>
              </div>
          </section>
      </main>
    `;
  },

  async afterRender() {
    const loadingIndicator = document.querySelector('#loading-indicator');
    const restaurantsContainer = document.querySelector('.restaurant-list');

    restaurantsContainer.innerHTML = renderSkeletonUI();

    try {
      loadingIndicator.style.display = 'block';

      const restaurants = await FetchData.restaurant();
      restaurantsContainer.innerHTML = '';
      restaurants.forEach((restaurant) => {
        restaurantsContainer.innerHTML +=
          createRestaurantItemTemplate(restaurant);
      });
    } catch (error) {
      restaurantsContainer.innerHTML = `
        <p class="error-message">Gagal memuat restoran. Silakan coba lagi nanti.</p>
      `;
      console.error(error);
    } finally {
      loadingIndicator.style.display = 'none';
    }
  },
};

export default Home;
