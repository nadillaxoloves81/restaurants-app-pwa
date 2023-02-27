/* eslint-disable no-await-in-loop */
/* eslint-disable no-undef */
Feature('Search Favorite Restaurants');

const assert = require('assert');

Before(({ I }) => {
    I.amOnPage('/#/favourites');
});

Scenario('searching favorite restaurants', async ({ I }) => {
    I.wait(10);
    I.see('Sorry, No Restaurant Data', '.error-or-empty-message__title');

    I.amOnPage('/');

    I.wait(10);
    I.seeElement('.restaurants__item a');

    const restaurantNames = [];

    for (let i = 1; i <= 3; i++) {
        I.click(locate('.restaurants__item a').at(i));

        I.wait(3);
        I.seeElement('#likeButton');
        I.click('#likeButton');
        restaurantNames.push(await I.grabTextFrom('.detail-hero__title'));

        I.amOnPage('/');
        I.wait(3);
    }

    I.amOnPage('/#/favourites');
    I.seeElement('#searchInput');
    I.seeElement('#searchBtn');

    const searchQuery = restaurantNames[1].substring(2, 4);
    const matchingRestaurants = restaurantNames.filter((name) => name.indexOf(searchQuery) !== -1);

    I.fillField('#searchInput', searchQuery);
    I.click('#searchBtn');

    const visibleFavoriteRestaurants = await I.grabNumberOfVisibleElements('.restaurants__item');
    assert.strictEqual(matchingRestaurants.length, visibleFavoriteRestaurants);

    matchingRestaurants.forEach(async (name, index) => {
        const visibleName = await I.grabTextFrom(locate('.restaurants__name').at(index + 1));
        assert.strictEqual(name, visibleName);
    });
});
