import API_ENDPOINT from '../globals/api-endpoint';

class RestaurantDBSource {
  static async restaurant() {
    const response = await fetch(API_ENDPOINT.RESTAURANT);
    const responseJson = await response.json();
    return responseJson.restaurants;
  }

  static async detailRestaurant(id) {
    const response = await fetch(API_ENDPOINT.DETAIL(id));
    const responseJson = await response.json();

    console.log('responseJson', responseJson);
    return responseJson.restaurant;
  }

  // Tambahkan metode addReview
  static async addReview({ id, name, review }) {
    try {
      const response = await fetch(API_ENDPOINT.ADD_REVIEW, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          id,
          name,
          review,
        }),
      });
      const responseJson = await response.json();

      console.log('Review Response:', responseJson);
      return responseJson;
    } catch (error) {
      console.error('Failed to add review:', error);
      throw error;
    }
  }
}

export default RestaurantDBSource;
