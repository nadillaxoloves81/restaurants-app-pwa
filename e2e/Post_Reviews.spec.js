/* eslint-disable no-undef */
Feature('Post Reviews');

const assert = require('assert');

Scenario('post a review, when user input is invalid', async ({ I }) => {
    I.amOnPage('/');

    I.wait(10);
    I.seeElement('.restaurants__item');

    const firstRestaurantName = await I.grabTextFrom(locate('.restaurants__name').at(8));
    I.click(locate('.restaurants__item a').at(8));

    I.wait(10);
    I.seeElement('.detail-hero__title');
    const detailRestaurantName = await I.grabTextFrom('.detail-hero__title');
    assert.strictEqual(firstRestaurantName, detailRestaurantName);

    // No input from user
    I.seeElement('#inputReviewName');
    I.seeElement('#textAreaReview');
    I.seeElement('#btnPostReview');

    I.fillField('#inputReviewName', '');
    I.fillField('#textAreaReview', '');
    I.click('#btnPostReview');

    I.seeElement('#swal2-title');
    const popUpMsg = await I.grabTextFrom('#swal2-title');
    assert.strictEqual(popUpMsg, 'Failed to add review');
    I.wait(2);

    // only username
    I.seeElement('#inputReviewName');
    I.seeElement('#textAreaReview');
    I.seeElement('#btnPostReview');

    I.fillField('#inputReviewName', 'Anonym');
    I.fillField('#textAreaReview', '');
    I.click('#btnPostReview');

    I.seeElement('#swal2-title');
    const popUpMsg2 = await I.grabTextFrom('#swal2-title');
    assert.strictEqual(popUpMsg2, 'Failed to add review');
    I.wait(2);

    // only review
    I.seeElement('#inputReviewName');
    I.seeElement('#textAreaReview');
    I.seeElement('#btnPostReview');

    I.fillField('#inputReviewName', '');
    I.fillField('#textAreaReview', 'Enak Sekali Makanan Di Sini');
    I.click('#btnPostReview');

    I.seeElement('#swal2-title');
    const popUpMsg3 = await I.grabTextFrom('#swal2-title');
    assert.strictEqual(popUpMsg3, 'Failed to add review');
    I.wait(2);
});

Scenario('post a review, when user input is valid', async ({ I }) => {
    I.amOnPage('/');

    I.wait(10);
    I.seeElement('.restaurants__item');

    const firstRestaurantName = await I.grabTextFrom(locate('.restaurants__name').at(10));
    I.click(locate('.restaurants__item a').at(10));

    I.wait(10);
    I.seeElement('.detail-hero__title');
    const detailRestaurantName = await I.grabTextFrom('.detail-hero__title');
    assert.strictEqual(firstRestaurantName, detailRestaurantName);

    I.seeElement('#inputReviewName');
    I.seeElement('#textAreaReview');
    I.seeElement('#btnPostReview');

    I.fillField('#inputReviewName', 'Anonym');
    I.fillField('#textAreaReview', 'Enak Sekali Makanan Di Sini');
    I.click('#btnPostReview');

    const popUpMsg = await I.grabTextFrom('#swal2-title');
    assert.strictEqual(popUpMsg, 'Successfully added a review');

    I.seeElement('.reviews__item');
    const userNameText = await I.grabTextFrom(locate('.reviews__user h3').first());
    const userReviewText = await I.grabTextFrom(locate('.reviews__desc').first());

    assert.strictEqual(userNameText, 'Anonym');
    assert.strictEqual(userReviewText, 'Enak Sekali Makanan Di Sini');
});
