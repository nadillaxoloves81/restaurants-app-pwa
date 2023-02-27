import RestaurantApiSource from '../../data/restaurant-api-source';
import UrlParser from '../../routes/url-parser';
import { createDetailRestaurantTemplate, errorOrEmptyMessage } from '../templates/template-creator';
import FavoriteMovieIdb from '../../data/favorite-restaurant-idb';
import LikeButtonPresenter from '../../utils/like-button-presenter';
import PostReviewInitiator from '../../utils/post-review-initiator';
import '../components/category-list';
import '../components/menu-list';
import '../components/review-list';

const Detail = {
    async render() {
        return `
            <div class="content" id="restaurant"></div>
            <div id="likeButtonContainer"></div>
        `;
    },

    async afterRender() {
        const url = UrlParser.parseActiveUrlWithoutCombiner();
        const restaurantDetailContainer = document.querySelector('#restaurant');

        try {
            const restaurant = await RestaurantApiSource.restaurantDetail(url.id);
            restaurantDetailContainer.innerHTML = createDetailRestaurantTemplate(restaurant);

            const categoryContainer = document.querySelector('category-list');
            categoryContainer.categories = restaurant.categories;

            const menuContainer = document.querySelector('menu-list');
            menuContainer.menus = restaurant.menus;

            PostReviewInitiator.init({
                postReviewFormContainer: document.querySelector('#reviews'),
                restaurantId: url.id,
            });

            LikeButtonPresenter.init({
                likeButtonContainer: document.querySelector('#likeButtonContainer'),
                favoriteRestaurants: FavoriteMovieIdb,
                restaurant: {
                    id: restaurant.id,
                    name: restaurant.name,
                    description: restaurant.description,
                    pictureId: restaurant.pictureId,
                    city: restaurant.city,
                    rating: restaurant.rating,
                },
            });
        } catch (error) {
            restaurantDetailContainer.innerHTML = errorOrEmptyMessage('Opps!, it seem like there is something wrong');
        }
    },
};

export default Detail;
