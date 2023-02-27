/* eslint-disable no-undef */
Feature('Favorite Restaurants');

Before(({ I }) => {
    I.amOnPage('/#/favourites');
});

const assert = require('assert');

Scenario('showing empty favorite restaurants', ({ I }) => {
    I.wait(10);
    I.seeElement('#searchInput');
    I.seeElement('#searchBtn');
    I.see('Sorry, No Restaurant Data', '.error-or-empty-message__title');
});

Scenario('favorite one restaurant', async ({ I }) => {
    I.wait(10);
    I.see('Sorry, No Restaurant Data', '.error-or-empty-message__title');

    I.amOnPage('/');

    I.wait(10);
    I.seeElement('.restaurants__item a');

    const firstRestaurant = locate('.restaurants__item a').first();
    const firstRestaurantName = await I.grabTextFrom(firstRestaurant);
    I.click(firstRestaurant);

    I.wait(10);
    I.seeElement('#likeButton');
    I.click('#likeButton');

    I.wait(10);
    I.amOnPage('/#/favourites');
    I.seeElement('.restaurants__item');
    const favoriteRestaurantName = await I.grabTextFrom('.restaurants__item a');

    assert.strictEqual(firstRestaurantName, favoriteRestaurantName);
});

Scenario('unfavorite one restaurant', async ({ I }) => {
    I.wait(10);
    I.see('Sorry, No Restaurant Data', '.error-or-empty-message__title');

    I.amOnPage('/');

    I.wait(10);
    I.seeElement('.restaurants__item a');

    const firstRestaurant = locate('.restaurants__item a').first();
    const firstRestaurantName = await I.grabTextFrom(firstRestaurant);
    I.click(firstRestaurant);

    I.wait(10);
    I.seeElement('#likeButton');
    I.click('#likeButton');

    I.amOnPage('/#/favourites');

    I.wait(10);
    I.seeElement('.restaurants__item');
    const favoriteRestaurantName = await I.grabTextFrom('.restaurants__item a');

    assert.strictEqual(firstRestaurantName, favoriteRestaurantName);

    I.click(locate('.restaurants__item a').first());

    I.wait(10);
    I.seeElement('#likeButton');
    I.click('#likeButton');

    I.amOnPage('/#/favourites');

    I.wait(10);
    I.see('Sorry, No Restaurant Data', '.error-or-empty-message__title');
});
