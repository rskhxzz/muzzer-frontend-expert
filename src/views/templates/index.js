const createRestaurantItemTemplate = (restaurant) => `
    <article class='restaurant-card' style='position: relative;'>
         <p class='city-label'>Kota: ${restaurant.city}</p>
          <img 
  srcset="https://restaurant-api.dicoding.dev/images/small/${restaurant.pictureId} 200w, 
          https://restaurant-api.dicoding.dev/images/medium/${restaurant.pictureId} 500w, 
          https://restaurant-api.dicoding.dev/images/large/${restaurant.pictureId} 1000w" 
  sizes="(max-width: 600px) 200px, 
         (max-width: 1000px) 500px, 
         1000px" 
  src="https://restaurant-api.dicoding.dev/images/small/${restaurant.pictureId}" 
  alt="${restaurant.name}" 
  class="restaurant-img" 
  loading="lazy" 
/>
          <div class='restaurant-content'>
            <h3>${restaurant.name}</h3>
            <p class='rating'>Rating: ⭐ ${restaurant.rating}</p>
            <p class='restaurant-description'>${restaurant.description}...</p>
            <a class='read-more-btn' href='#/detail/${restaurant.id}'>Lihat Selengkapnya</a>
          </div>
    </article>
`;

const createRestaurantDetailTemplate = (restaurant) => `
      <div class="detail-header">
        <img 
          id="restaurant-image" 
          srcset="https://restaurant-api.dicoding.dev/images/medium/${
  restaurant.pictureId
}?w=200 200w, 
                  https://restaurant-api.dicoding.dev/images/medium/${
  restaurant.pictureId
}?w=500 500w, 
                  https://restaurant-api.dicoding.dev/images/medium/${
  restaurant.pictureId
}?w=1000 1000w" 
          sizes="(max-width: 600px) 200px, (max-width: 1000px) 500px, 1000px"
          src="https://restaurant-api.dicoding.dev/images/medium/${
  restaurant.pictureId
}?w=1000" 
          alt="${restaurant.name}" 
          class="restaurant-image" 
          loading="lazy" />
        <div class="restaurant-info">
          <h1 id="restaurant-name" class="restaurant-name">
            ${restaurant.name}</h1>
          <p id="restaurant-city" class="restaurant-city">
            ${restaurant.city}</p>
          <p id="restaurant-address" class="restaurant-address">
            ${restaurant.address}</p>
          <p id="restaurant-rating" class="restaurant-rating">
            ${restaurant.rating}</p>
            
        </div>
      </div>

      <div class="detail-content">
        <h2>Description</h2>
        <p id="restaurant-description" class="restaurant-description">
          ${restaurant.description}</p>

        <h2>Menu</h2>
        <div id="restaurant-menu" class="restaurant-menu">
          <div class="menu-section">
            <h3>Foods</h3>
            <ul id="food-menu" class="menu-list">
            ${restaurant.menus.foods
    .map(
      (food) => `
                       <li>${food.name}</li>`
    )
    .join('')}
            </ul>
          </div>
          <div class="menu-section">
            <h3>Drinks</h3>
            <ul id="drink-menu" class="menu-list">
           ${restaurant.menus.drinks
    .map(
      (drink) => `
                        <li>${drink.name}</li>`
    )
    .join('')}</ul>
          </div>
          <div id="customer-reviews">
              ${restaurant.customerReviews
    .map(
      (review) => `
                       <div class="review">
             <p><strong>${review.name}</strong></p>
              <p>${review.review}</p>
              <p><small>Posted on: ${review.date}</small></p>
            </div>`
    )
    .join('')}
          </div>
          <div id="review-form" class="mt-6">
            <h3 class="text-2xl font-semibold">Berikan Review</h3>
            <form id="form-review" class="space-y-4">
              <div>
                <label for="reviewer-name" class="block">Nama:</label>
                <input type="text" id="reviewer-name" name="nama" class="w-full px-4 py-2 border rounded-lg"
                  placeholder="Masukkan nama Anda" required>
              </div>
              <div>
                <label for="review-text" class="block">Review:</label>
                <textarea id="review-text" name="review" class="w-full px-4 py-2 border rounded-lg"
                  placeholder="Tulis review Anda di sini" required></textarea>
              </div>
              <button id="button-submit-review" type="submit" class="bg-blue-500 text-white px-6 py-2 rounded-md">Kirim Review</button>
            </form>
          </div>
        </div>
      </div>
`;

const renderSkeletonUI = () => {
  return `
    <div class="skeleton">
        <div class="skeleton-header"></div>
        <div class="skeleton-rating"></div>
        <div class="skeleton-description"></div>
        <div class="skeleton-button"></div>
    </div>
  `;
};
export {
  createRestaurantItemTemplate,
  createRestaurantDetailTemplate,
  renderSkeletonUI,
};
