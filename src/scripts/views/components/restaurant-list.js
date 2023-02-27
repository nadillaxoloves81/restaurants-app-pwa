import { errorOrEmptyMessage } from '../templates/template-creator';
import './restaurant-item';

class RestaurantList extends HTMLElement {
    set restaurants(restaurants) {
        this._restaurants = restaurants;
        this.render();
    }

    render() {
        this.innerHTML = '';

        if (this._restaurants.length > 0) {
            this.classList.add('restaurant-list-container');

            this._restaurants.forEach((restaurant) => {
                const restaurantItemElement = document.createElement('restaurant-item');
                restaurantItemElement.restaurant = restaurant;
                this.appendChild(restaurantItemElement);
            });
        } else {
            this.classList.remove('restaurant-list-container');
            this.innerHTML = `
                ${errorOrEmptyMessage('Sorry, no restaurant data')}
            `;
        }
    }
}

customElements.define('restaurant-list', RestaurantList);
