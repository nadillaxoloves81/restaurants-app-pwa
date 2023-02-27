/* eslint-disable class-methods-use-this */
import '../../components/restaurant-list';
import { createSearchFormTemplate } from '../../templates/template-creator';

class FavoriteRestaurantSearchView {
    getTemplate() {
        return `
            <div id="restaurantSearchContainer">
                <section class="favourites" id="favourites">
                    <div class="heading">
                        <h2 tabindex="0">Favourite Restaurants</h2>
                    </div>
                    <div id="searchContainer" class="searchContainer">
                        ${createSearchFormTemplate()}
                    </div>
                    <restaurant-list></restaurant-list>
                </section>
            </div>
        `;
    }

    runWhenUserIsSearching(callback) {
        const userInput = document.getElementById('searchInput');
        const searchBtn = document.getElementById('searchBtn');
        searchBtn.addEventListener('click', () => {
            callback(userInput.value);
        });
    }

    showFavoriteRestaurants(restaurants) {
        const restaurantList = document.querySelector('restaurant-list');
        restaurantList.restaurants = restaurants;

        document.getElementById('restaurantSearchContainer')
            .dispatchEvent(new Event('restaurants:updated'));
    }
}

export default FavoriteRestaurantSearchView;
