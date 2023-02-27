class ReviewItem extends HTMLElement {
    set review(review) {
        this._review = review;
        this.render();
    }

    render() {
        this.innerHTML = `
            <style>      
                * {
                    font-family: 'Poppins', sans-serif;
                    margin: 0;
                    padding: 0;
                    box-sizing: border-box;
                    border: 0;
                    text-decoration: none;
                    text-transform: capitalize;
                    transition: all .2s linear;
                }
                
                .reviews__item {
                    background-color: #fff;
                    box-shadow: var(--box-shadow);
                    padding: 1.5rem;
                    border-radius: .5rem;
                    position: relative;
                    border: .1rem rgba(0, 0, 0, .1);
                }
                
                .reviews__item .fa-quote-right {
                    position: absolute;
                    font-size: 2rem;
                    color: #ccc;
                    top: 2rem;
                    right: 2rem;
                }
                
                .reviews__user {
                    display: flex;
                    gap: 1rem;
                    align-items: center;
                    margin-bottom: .7rem;
                }
                
                .reviews__user h3 {
                    color: var(--green);
                    font-size: 2rem;
                }
                
                .reviews__user p {
                    font-size: 1rem;
                    color: var(--light-color);
                }
                
                .reviews__stars i {
                    color: var(--orange);
                }
                
                .reviews__desc {
                    color: var(--light-color);
                    font-size: 1.3rem;
                }

                @media screen and (max-width: 400px) {
                    .reviews__user {
                        flex-direction: column;
                    }
                }
            </style>

            <article class="reviews__item">
                <div class="reviews__user">
                    <h3>${this._review.name}</h3>
                    <p>${this._review.date}</p>
                </div>
                <p class="reviews__desc">${this._review.review}</p>
            </article>
        `;
    }
}

customElements.define('review-item', ReviewItem);
