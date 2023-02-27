import RestaurantApiSource from '../../data/restaurant-api-source';
import SearchRestaurantInitiator from '../../utils/search-restaurant-initiator';
import '../components/restaurant-list';
import { crateHomePageTemplate, createHeroHomeTemplate, errorOrEmptyMessage } from '../templates/template-creator';

const Home = {
    async render() {
        return `
            ${createHeroHomeTemplate()}
            <div class="content" id="home"></div>
        `;
    },

    async afterRender() {
        const homeContainer = document.querySelector('#home');
        homeContainer.innerHTML = crateHomePageTemplate();

        SearchRestaurantInitiator.init({
            searchContainer: document.querySelector('#searchContainer'),
        });

        const restaurantList = document.querySelector('restaurant-list');
        try {
            const restaurants = await RestaurantApiSource.restaurantList();
            restaurantList.restaurants = restaurants;
        } catch (error) {
            const content = document.querySelector('.content');
            content.innerHTML = errorOrEmptyMessage('Opps!, it seem like there is something wrong');
        }
    },
};

export default Home;
