/* eslint-disable no-new */
/* eslint-disable no-undef */
import FavoriteRestaurantIdb from '../src/scripts/data/favorite-restaurant-idb';
import FavoriteRestaurantSearchView from '../src/scripts/views/pages/liked-restaurants/favorite-restaurant-search-view';
import FavoriteRestaurantShowPresenter from '../src/scripts/views/pages/liked-restaurants/favorite-restaurant-show-presenter';

describe('Showing all favorite restaurants', () => {
    let view;

    const renderTemplate = () => {
        view = new FavoriteRestaurantSearchView();
        document.body.innerHTML = view.getTemplate();
    };

    beforeEach(() => {
        renderTemplate();
    });

    describe('When no restaurants have been liked', () => {
        it('should ask for the favorite restaurants', () => {
            const favoriteRestaurants = spyOnAllFunctions(FavoriteRestaurantIdb);

            new FavoriteRestaurantShowPresenter({
                view,
                favoriteRestaurants,
            });

            expect(favoriteRestaurants.getAllRestaurants).toHaveBeenCalledTimes(1);
        });

        it('should show the information that no restaurants have been liked', (done) => {
            document.getElementById('restaurantSearchContainer').addEventListener('restaurants:updated', () => {
                const emptyMsg = document.querySelectorAll('.error-or-empty-message');

                expect(emptyMsg.length).toEqual(1);
                done();
            });

            const favoriteRestaurants = spyOnAllFunctions(FavoriteRestaurantIdb);
            favoriteRestaurants.getAllRestaurants.and.returnValue([]);

            new FavoriteRestaurantShowPresenter({
                view,
                favoriteRestaurants,
            });
        });
    });

    describe('When favorite restaurants exist', () => {
        it('should show the restaurants', (done) => {
            document.getElementById('restaurantSearchContainer').addEventListener('restaurants:updated', () => {
                const restaurantItems = document.querySelectorAll('restaurant-item');

                expect(restaurantItems.length).toEqual(2);
                done();
            });

            const favoriteRestaurants = spyOnAllFunctions(FavoriteRestaurantIdb, false);
            favoriteRestaurants.getAllRestaurants.and.returnValue([
                {
                    id: 1,
                    name: 'Restaurant Padang',
                    rating: 4.5,
                    city: 'Padang',
                },

                {
                    id: 2,
                    name: 'Restaurant Nusantara',
                    rating: 4.4,
                    city: 'Jakarta',
                },
            ]);

            new FavoriteRestaurantShowPresenter({
                view,
                favoriteRestaurants,
            });
        });
    });
});
