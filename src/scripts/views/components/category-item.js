class CategoryItem extends HTMLElement {
    constructor() {
        super();
        this.shadowDOM = this.attachShadow({ mode: 'open' });
    }

    set category(category) {
        this._category = category;
        this.render();
    }

    render() {
        this.shadowDOM.innerHTML = `
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
                
                p {
                    padding: 2rem;
                    text-align: center;
                    background-color: var(--white-green);
                    border-radius: 1.5rem;
                    cursor: pointer;
                    font-size: 1.5rem;
                    font-weight: bold;
                }
                
                p:hover {
                    background-color: var(--green);
                }
            </style>
            
            <p tabindex="0">${this._category.name}</p>
        `;
    }
}

customElements.define('category-item', CategoryItem);
