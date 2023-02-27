import CONFIG from '../../globals/config';

const crateHomePageTemplate = () => `
    <section id="restaurants">
        <div class="heading">
            <h2>Explore Restaurants</h2>
        </div>
        <div id="searchContainer" class="searchContainer"></div>
        <restaurant-list></restaurant-list>
    </section>
`;

const createHeroHomeTemplate = () => `
    <div class="hero">
        <picture class="hero__img">
            <source media="(max-width: 600px)" srcset="./images/hero/hero-image-small.jpg">
            <img src="./images/hero/hero-image.jpg" alt="restaurant hero image">
        </picture>
        <div class="hero__content">
            <h1 class="hero__title">Find <span>fresh</span> and <span>delicious foods</span> in our
                menu
            </h1>
            <p class="hero__description">Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Aspernatur,
                voluptatibus nemo quod delectus possimus explicabo?</p>
            <a class="hero__btn btn" href="#restaurants">explore restaurant</a>
        </div>
    </div>
`;

const createSearchFormTemplate = () => `
    <input type="search" id="searchInput" placeholder="Search here">
    <button class="fa fa-search" id="searchBtn" aria-label="search"></button>
`;

const createDetailRestaurantTemplate = (restaurant) => `
    <div class="detail-hero">
        <img src="${CONFIG.BASE_IMAGE_URL_MEDITUM}${restaurant.pictureId}" alt="${restaurant.name} picture" class="detail-hero__img">
        <div class="detail-hero__descriptions">
            <h2 tabindex="0" class="detail-hero__title">${restaurant.name}</h2>
            <p tabindex="0" class="detail-hero__location"><i class="fa fa-map-marker"></i> ${restaurant.city},
                ${restaurant.address}</p>
            <p tabindex="0" class="detail-hero__rate"><i class="fa fa-star"></i> Rate: ${restaurant.rating}</p>
        </div>
    </div>

    <section class="detail-desc">
        <p tabindex="0" class="detail-desc__description"><b>Description: </b> ${restaurant.description}</p>

        <h2 tabindex="0" class="detail-desc__category-title">categories</h2>
        <category-list></category-list>

        <h2 tabindex="0" class="detail-desc__menu-title">Menu</h2>
        <menu-list></menu-list>

        <div class="reviews" id="reviews"></div>    
    </section>
`;

const errorOrEmptyMessage = (message) => `
    <div class="error-or-empty-message">
        <img src="./images/sad-apple.png" alt="Error Image" class="error-or-empty-message__img">
        <h1 tabindex="0" class="error-or-empty-message__title">${message}</h1>
    </div>
`;

const createCustomerReviewForm = () => `
    <h2 tabindex="0" class="detail-desc__review-title">customer's reviews</h2>

    <div class="reviews__form">
        <input type="text" placeholder="Enter your name" id="inputReviewName" class="reviews__input-name">
        <textarea name="review" placeholder="Enter your review" id="textAreaReview" rows="4"
            class="reviews__textarea"></textarea>
        <input type="submit" value="submit" id="btnPostReview" class="btn">
    </div>

    <review-list></review-list>
`;

const createLikeRestaurantButtonTemplate = () => `
    <button aria-label="like this restaurant" id="likeButton" class="like">
        <i class="fa fa-heart-o" aria-hidden="true"></i>
    </button>
`;

const createUnlikeRestaurantButtonTemplate = () => `
    <button aria-label="unlike this restaurant" id="likeButton" class="like">
        <i class="fa fa-heart" aria-hidden="true"></i>
    </button>
`;

export {
    crateHomePageTemplate,
    createHeroHomeTemplate,
    createSearchFormTemplate,
    createDetailRestaurantTemplate,
    errorOrEmptyMessage,
    createCustomerReviewForm,
    createLikeRestaurantButtonTemplate,
    createUnlikeRestaurantButtonTemplate,
};
