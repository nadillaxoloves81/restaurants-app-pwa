/* eslint-disable no-undef */
import FavoriteRestaurantSearchPresenter from '../src/scripts/views/pages/liked-restaurants/favorite-restaurant-search-presenter';
import FavoriteRestaurantIdb from '../src/scripts/data/favorite-restaurant-idb';
import FavoriteRestaurantSearchView from '../src/scripts/views/pages/liked-restaurants/favorite-restaurant-search-view';

describe('Searching restaurants', () => {
    let presenter;
    let favoriteRestaurants;
    let view;

    const searchRestaurants = (query) => {
        const queryElement = document.getElementById('searchInput');
        queryElement.value = query;

        const searchBtn = document.getElementById('searchBtn');
        searchBtn.dispatchEvent(new Event('click'));
    };

    const setRestaurantSearchContainer = () => {
        view = new FavoriteRestaurantSearchView();
        document.body.innerHTML = view.getTemplate();
    };

    const constructPresenter = () => {
        favoriteRestaurants = spyOnAllFunctions(FavoriteRestaurantIdb);
        presenter = new FavoriteRestaurantSearchPresenter({
            favoriteRestaurants,
            view,
        });
    };

    beforeEach(() => {
        jasmine.DEFAULT_TIMEOUT_INTERVAL = 5000;
        setRestaurantSearchContainer();
        constructPresenter();
    });

    describe('When query is not empty', () => {
        it('should be able to capture the query typed by the user', () => {
            searchRestaurants('restaurant a');

            expect(presenter.userQuery).toEqual('restaurant a');
        });

        it('should ask the model to search for liked restaurants', () => {
            searchRestaurants('restaurant a');

            expect(favoriteRestaurants.searchRestaurants)
                .toHaveBeenCalledWith('restaurant a');
        });

        it('should show the restaurants found by Favorite Restaurants', (done) => {
            document.getElementById('restaurantSearchContainer')
                .addEventListener('restaurants:updated', () => {
                    const restaurantItems = document.querySelectorAll('restaurant-item');

                    expect(restaurantItems.length).toEqual(3);
                    done();
                });

            favoriteRestaurants.searchRestaurants.withArgs('restaurant a').and.returnValues([
                { id: 1, name: 'restaurant abc' },
                { id: 6, name: 'restaurant anak negeri' },
                { id: 13, name: 'restaurant asia tenggara' },
            ]);

            searchRestaurants('restaurant a');
        });

        it('should show the name of the restaurants found by Favorite Restaurants', (done) => {
            document.getElementById('restaurantSearchContainer')
                .addEventListener('restaurants:updated', () => {
                    const restaurantName = document.querySelectorAll('.restaurants__name');

                    expect(restaurantName.item(0).textContent).toEqual('restaurant abc');
                    expect(restaurantName.item(1).textContent).toEqual('restaurant anak negeri');
                    expect(restaurantName.item(2).textContent).toEqual('restaurant asia tenggara');

                    done();
                });

            favoriteRestaurants.searchRestaurants.withArgs('restaurant a').and.returnValues([
                { id: 1, name: 'restaurant abc' },
                { id: 6, name: 'restaurant anak negeri' },
                { id: 13, name: 'restaurant asia tenggara' },
            ]);

            searchRestaurants('restaurant a');
        });

        it('should show - when the restaurant returned does not contain a name', (done) => {
            document.getElementById('restaurantSearchContainer')
                .addEventListener('restaurants:updated', () => {
                    const restaurantName = document.querySelector('.restaurants__name').textContent;

                    expect(restaurantName).toEqual('-');

                    done();
                });

            favoriteRestaurants.searchRestaurants.withArgs('restaurant a').and.returnValues([
                { id: 8 },
            ]);

            searchRestaurants('restaurant a');
        });
    });

    describe('When query is empty', () => {
        it('should capture the query as empty', () => {
            searchRestaurants(' ');
            expect(presenter.userQuery.length).toEqual(0);

            searchRestaurants('    ');
            expect(presenter.userQuery.length).toEqual(0);

            searchRestaurants('');
            expect(presenter.userQuery.length).toEqual(0);

            searchRestaurants('\t');
            expect(presenter.userQuery.length).toEqual(0);
        });

        it('should show all favorite restaurants', () => {
            searchRestaurants('    ');
            expect(favoriteRestaurants.getAllRestaurants).toHaveBeenCalled();
        });
    });

    describe('When no favorite restaurants couldn\'t be found', () => {
        it('should show the empty message', (done) => {
            document.getElementById('restaurantSearchContainer')
                .addEventListener('restaurants:updated', () => {
                    const emptyMsg = document.querySelectorAll('.error-or-empty-message');
                    expect(emptyMsg.length).toEqual(1);

                    done();
                });

            favoriteRestaurants.searchRestaurants.withArgs('restaurant a')
                .and.returnValues([]);

            searchRestaurants('restaurant a');
        });

        it('should not show any restaurant', (done) => {
            document.getElementById('restaurantSearchContainer')
                .addEventListener('restaurants:updated', () => {
                    const restaurantItems = document.querySelectorAll('restaurant-item');

                    expect(restaurantItems.length).toEqual(0);

                    done();
                });

            favoriteRestaurants.searchRestaurants.withArgs('restaurant a')
                .and.returnValues([]);

            searchRestaurants('restaurant a');
        });
    });
});
