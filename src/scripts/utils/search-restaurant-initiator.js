import Swal from 'sweetalert2';
import RestaurantApiSource from '../data/restaurant-api-source';
import { createSearchFormTemplate } from '../views/templates/template-creator';

const SearchRestaurantInitiator = {
    async init({ searchContainer }) {
        this._searchContainer = searchContainer;

        await this._renderSearchForm();
    },

    async _renderSearchForm() {
        this._searchContainer.innerHTML = createSearchFormTemplate();

        const searchInput = document.getElementById('searchInput');
        const searchBtn = document.querySelector('#searchBtn');
        searchBtn.addEventListener('click', async () => {
            const restaurantList = document.querySelector('restaurant-list');
            const allRestaurants = await RestaurantApiSource.restaurantList();
            if (searchInput.value === '') {
                restaurantList.restaurants = allRestaurants;
            } else {
                try {
                    const restaurantSearchResults = await RestaurantApiSource.searchRestaurant(searchInput.value);
                    restaurantList.restaurants = restaurantSearchResults.restaurants;
                } catch (error) {
                    restaurantList.restaurants = allRestaurants;
                    Swal.fire({
                        icon: 'error',
                        title: 'Failed to load data from server',
                        showConfirmButton: false,
                        timer: 1500,
                    });
                }
            }
        });
    },
};

export default SearchRestaurantInitiator;
