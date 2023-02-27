import './category-item';

class CategoryList extends HTMLElement {
    constructor() {
        super();
        this.shadowDOM = this.attachShadow({ mode: 'open' });
    }

    set categories(categories) {
        this._categories = categories;
        this.render();
    }

    render() {
        this.shadowDOM.innerHTML = '';

        if (this._categories.length > 0) {
            this.shadowDOM.innerHTML = `
                <style>
                    :host {
                        margin-top: 1rem;
                        display: grid;
                        gap: 1rem;
                        grid-template-columns: repeat(auto-fit, minmax(12rem, 1fr));
                    }
                </style>
            `;

            this._categories.forEach((category) => {
                const categoryItemElement = document.createElement('category-item');
                categoryItemElement.category = category;
                this.shadowDOM.appendChild(categoryItemElement);
            });
        } else {
            this.shadowDOM.innerHTML = `
                <style>
                    .category__empty-item {
                        font-size: 2rem;
                        text-align: center;
                    }
                </style>

                '<p class="category__empty-item">There is no category for this restaurant</p>'
            `;
        }
    }
}

customElements.define('category-list', CategoryList);
