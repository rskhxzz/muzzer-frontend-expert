import LikeRestaurantIdb from '../src/scripts/data/favorite';

describe('LikeRestaurantIdb Integration Test', () => {
  afterEach(async () => {
    const restaurants = await LikeRestaurantIdb.getAllRestaurants();
    restaurants.forEach(async (restaurant) => {
      await LikeRestaurantIdb.deleteRestaurant(restaurant.id);
    });
  });

  it('should add a restaurant to the database', async () => {
    const restaurant = { id: 1, name: 'Restaurant A' };
    await LikeRestaurantIdb.putRestaurant(restaurant);

    const result = await LikeRestaurantIdb.getRestaurant(1);
    expect(result).toEqual(restaurant);
  });

  it('should retrieve all restaurants from the database', async () => {
    const restaurantA = { id: 1, name: 'Restaurant A' };
    const restaurantB = { id: 2, name: 'Restaurant B' };

    await LikeRestaurantIdb.putRestaurant(restaurantA);
    await LikeRestaurantIdb.putRestaurant(restaurantB);

    const allRestaurants = await LikeRestaurantIdb.getAllRestaurants();
    expect(allRestaurants).toEqual([restaurantA, restaurantB]);
  });

  it('should delete a restaurant from the database', async () => {
    const restaurant = { id: 1, name: 'Restaurant A' };
    await LikeRestaurantIdb.putRestaurant(restaurant);

    await LikeRestaurantIdb.deleteRestaurant(1);

    const result = await LikeRestaurantIdb.getRestaurant(1);
    expect(result).toBeUndefined();
  });

  it('should not add a restaurant without an id', async () => {
    const restaurant = { name: 'Restaurant A' };

    try {
      await LikeRestaurantIdb.putRestaurant(restaurant);
    } catch (error) {
      expect(error.name).toEqual('DataError');
    }

    const allRestaurants = await LikeRestaurantIdb.getAllRestaurants();
    expect(allRestaurants).toEqual([]);
  });
});
