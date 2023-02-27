class MenuItem extends HTMLElement {
    constructor() {
        super();
        this.shadowDOM = this.attachShadow({ mode: 'open' });
    }

    set menu(menu) {
        this._menu = menu;
        this.render();
    }

    render() {
        this.shadowDOM.innerHTML = `
            <style>
                @import url("https://stackpath.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css");
                    
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
                    font-size: 1.5rem;
                    cursor: pointer;
                    margin: 1rem 0;
                }
                
                p:hover {
                    margin-left: 2rem;
                }

                i {
                    color: var(--green);
                }
            </style>

            <p><i class="fa fa-arrow-right"></i> ${this._menu.name}</p>
        `;
    }
}

customElements.define('menu-item', MenuItem);
