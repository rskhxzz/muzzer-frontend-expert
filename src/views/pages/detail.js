import UrlParser from '../../scripts/routes/url-parser';
import FetchData from '../../scripts/data/fetch-data';
import FavoriteIdb from '../../scripts/data/favorite';

import { createRestaurantDetailTemplate, renderSkeletonUI } from '../templates';
import './../../styles/detail.scss';

const Detail = {
  async render() {
    return `
      <div id="loading-indicator" class="loading-indicator" style="display: none; background-color: #fff">
        Loading...
      </div>
      <div id="restaurant-detail" class="restaurant-detail"></div>
      <div id="favorite-button-container" class="favorite-button-container"></div>
    `;
  },

  async afterRender() {
    const loadingIndicator = document.querySelector('#loading-indicator');
    const restaurantContainer = document.querySelector('#restaurant-detail');
    const favoriteButtonContainer = document.querySelector(
      '#favorite-button-container'
    );

    restaurantContainer.innerHTML = renderSkeletonUI();

    try {
      loadingIndicator.style.display = 'block';

      const url = UrlParser.parseActiveUrlWithoutCombiner();
      const restaurant = await FetchData.detailRestaurant(url.id);

      restaurantContainer.innerHTML =
        createRestaurantDetailTemplate(restaurant);

      let isFavorited = await FavoriteIdb.getRestaurant(restaurant.id);

      const renderFavoriteButton = () => {
        if (isFavorited) {
          favoriteButtonContainer.innerHTML = `
            <button id="delete-favorite-button" class="favorite-button">
              -
            </button>
          `;

          const deleteFavoriteButton = document.querySelector(
            '#delete-favorite-button'
          );
          deleteFavoriteButton.addEventListener('click', async () => {
            await FavoriteIdb.deleteRestaurant(restaurant.id);
            alert(`${restaurant.name} telah dihapus dari daftar favorit.`);
            isFavorited = null;
            renderFavoriteButton();
          });
        } else {
          favoriteButtonContainer.innerHTML = `
            <button id="add-favorite-button" class="favorite-button">
              +
            </button>
          `;

          const addFavoriteButton = document.querySelector(
            '#add-favorite-button'
          );
          addFavoriteButton.addEventListener('click', async () => {
            await FavoriteIdb.putRestaurant(restaurant);
            alert(`${restaurant.name} telah ditambahkan ke daftar favorit.`);
            isFavorited = true;
            renderFavoriteButton();
          });
        }
      };

      renderFavoriteButton();
      const reviewForm = document.querySelector('#form-review');
      reviewForm.addEventListener('submit', async (event) => {
        event.preventDefault();

        const reviewerName = document.querySelector('#reviewer-name').value;
        const reviewText = document.querySelector('#review-text').value;

        try {
          const response = await FetchData.addReview({
            id: restaurant.id,
            name: reviewerName,
            review: reviewText,
          });

          const newReview = response.customerReviews.slice(-1)[0];

          const reviewContainer = document.querySelector('#customer-reviews');
          reviewContainer.innerHTML += `
          <div class="review">
            <p><strong>${newReview.name}</strong></p>
            <p>${newReview.review}</p>
            <p><small>Posted on: ${newReview.date}</small></p>
          </div>
        `;

          reviewForm.reset();
          alert('Review berhasil ditambahkan!');
        } catch (error) {
          console.error('Gagal menambahkan review:', error);
          alert('Gagal menambahkan review. Silakan coba lagi.');
        }
      });
    } catch (error) {
      console.error(error);
      alert('Gagal memuat detail restoran. Silakan coba lagi.');
    } finally {
      loadingIndicator.style.display = 'none';
    }
  },
};

export default Detail;
