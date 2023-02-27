import './review-item';

class ReviewList extends HTMLElement {
    set reviews(reviews) {
        this._reviews = reviews;
        this.render();
    }

    render() {
        this.innerHTML = '';

        if (this._reviews.length > 0) {
            this.classList.add('reviews__container');

            this._reviews.slice().reverse().forEach((review) => {
                const reviewItemElement = document.createElement('review-item');
                reviewItemElement.review = review;

                this.appendChild(reviewItemElement);
            });
        } else {
            this.innerHTML = `
                <style>
                    .revies__empty-item {
                        font-size: 1.7rem;
                        text-align: center;
                    }
                </style>

                '<p class="revies__empty-item">no reviews yet</p>'
            `;
        }
    }
}

customElements.define('review-list', ReviewList);
