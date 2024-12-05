import FavoriteIdb from '../../scripts/data/favorite';
import { createRestaurantItemTemplate } from '../templates';

const Favorite = {
  async render() {
    return `
      <div id="loading" class="loading">Loading...</div>
      <div id="restaurant" class="restaurant-list"></div>
      <div id="error" class="error-message" style="display: none;">Gagal memuat data. Silakan coba lagi nanti.</div>
      <div id="no-favorites" style="display: none;">Belum ada restoran favorit.</div>
    `;
  },

  async afterRender() {
    const loadingIndicator = document.getElementById('loading');
    const errorMessage = document.getElementById('error');
    const restaurantContainer = document.querySelector('.restaurant-list');
    const noFavoritesMessage = document.getElementById('no-favorites');

    try {
      loadingIndicator.style.display = 'block';

      const restaurants = await FavoriteIdb.getAllRestaurants();

      if (restaurants.length > 0) {
        let restaurantHTML = '';
        restaurants.forEach((restaurant) => {
          restaurantHTML += createRestaurantItemTemplate(restaurant);
        });
        restaurantContainer.innerHTML = restaurantHTML;
        noFavoritesMessage.style.display = 'none';
      } else {
        restaurantContainer.innerHTML = '';
        noFavoritesMessage.style.display = 'block';
      }
    } catch (error) {
      console.error(error);
      errorMessage.style.display = 'block';
    } finally {
      loadingIndicator.style.display = 'none';
    }
  },
};

export default Favorite;
