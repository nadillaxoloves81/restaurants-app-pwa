import CONFIG from '../../globals/config';

class RestaurantItem extends HTMLElement {
    set restaurant(restaurant) {
        this._restaurant = restaurant;
        this.render();
    }

    render() {
        this.innerHTML = `
            <article class="restaurants__item">
                <div class="restaurants__rate">
                    <p tabindex="0" aria-label="rate ${this._restaurant.rating || '-'}"><i class="fa fa-star"></i> ${this._restaurant.rating || '-'}</p>
                </div>

                <div class="restaurants__img">
                    <img class="lazyload" data-src="${CONFIG.BASE_IMAGE_URL_SMALL + this._restaurant.pictureId}" alt="${this._restaurant.name || '-'} src="./images/placeholder_img.jpg" Restaurant Picture">
                </div>
                
                <div class="restaurants__content">
                    <h3 tabindex="0" class="restaurants__name">${this._restaurant.name || '-'}</h3>
                    <p class="restaurants__place"><i class="fa fa-map-marker"></i> ${this._restaurant.city || '-'}</p>
                    <p class="restaurants__desc">${this._restaurant.description || '-'}</p>
                    <a href="/#/detail/${this._restaurant.id}" class="btn">visit</a>
                </div>
            </article>
        `;
    }
}

customElements.define('restaurant-item', RestaurantItem);
