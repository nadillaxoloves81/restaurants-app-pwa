import Swal from 'sweetalert2';
import RestaurantApiSource from '../data/restaurant-api-source';
import { createCustomerReviewForm } from '../views/templates/template-creator';

const PostReviewInitiator = {
    async init({ postReviewFormContainer, restaurantId }) {
        this._postReviewFormContainer = postReviewFormContainer;
        this._restaurantId = restaurantId;

        this._renderReviewForm();
    },

    async _renderReviewForm() {
        this._postReviewFormContainer.innerHTML = createCustomerReviewForm();

        const restaurant = await RestaurantApiSource.restaurantDetail(this._restaurantId);
        const reviewContainer = document.querySelector('review-list');
        reviewContainer.reviews = restaurant.customerReviews;

        const inputReviewName = document.querySelector('#inputReviewName');
        const textAreaReview = document.querySelector('#textAreaReview');
        const btnPostReview = document.querySelector('#btnPostReview');

        btnPostReview.addEventListener('click', async () => {
            const customerReview = {
                id: this._restaurantId,
                name: inputReviewName.value,
                review: textAreaReview.value,
            };

            try {
                const postReviewResponse = await RestaurantApiSource.insertCustomerReview(customerReview);
                reviewContainer.innerHTML = '';
                reviewContainer.reviews = postReviewResponse.customerReviews;

                inputReviewName.value = '';
                textAreaReview.value = '';

                Swal.fire({
                    icon: 'success',
                    title: 'Successfully added a review',
                    showConfirmButton: false,
                });
            } catch (error) {
                reviewContainer.reviews = restaurant.customerReviews;

                Swal.fire({
                    icon: 'error',
                    title: 'Failed to add review',
                    text: 'Make sure the username and review are not empty',
                    showConfirmButton: false,
                });
            }
        });
    },
};

export default PostReviewInitiator;
