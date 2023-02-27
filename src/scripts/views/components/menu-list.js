import './menu-item';

class MenuList extends HTMLElement {
    constructor() {
        super();
        this.shadowDOM = this.attachShadow({ mode: 'open' });
    }

    set menus(menus) {
        this._menus = menus;
        this.render();
    }

    render() {
        this.shadowDOM.innerHTML = '';
        if (this._menus.foods.length > 0 || this._menus.drinks.length > 0) {
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

                :host {
                    display: grid;
                    grid-template-columns: repeat(auto-fit, minmax(22rem, 1fr));
                    gap: 2rem;
                    margin-top: 1rem;
                }
                
                .detail-desc__menu-type {
                    border: 1px solid var(--green);
                    padding: 2rem 3.5rem 3.5rem;
                    border-radius: 3rem;
                }
                
                .detail-desc__menu-type h3 {
                    font-size: 2rem;
                    text-align: center;
                    margin-bottom: 1rem;
                }
                
                .detail-desc__menu-type i {
                    color: var(--green);
                }
            </style>
        `;

            const menuItemWithType = Object.entries(this._menus);

            menuItemWithType.forEach((menuType) => {
                const menuTypeContainer = document.createElement('div');
                menuTypeContainer.setAttribute('class', 'detail-desc__menu-type');

                const menuTypeContainerTitle = document.createElement('h3');
                menuTypeContainerTitle.setAttribute('tabindex', '0');

                if (menuType[0] === 'foods') {
                    menuTypeContainerTitle.innerHTML = `<i class="fa fa-cutlery"></i> ${menuType[0]}`;
                } else {
                    menuTypeContainerTitle.innerHTML = `<i class="fa fa-coffee"></i> ${menuType[0]}`;
                }

                menuTypeContainer.appendChild(menuTypeContainerTitle);

                this.shadowDOM.appendChild(menuTypeContainer);

                menuType[1].forEach((menu) => {
                    const menuItemElement = document.createElement('menu-item');
                    menuItemElement.menu = menu;

                    menuTypeContainer.appendChild(menuItemElement);
                });
            });
        } else {
            this.shadowDOM.innerHTML = `
                <style>
                    .menus__empty-item {
                        font-size: 1.7rem;
                        text-align: center;
                    }
                </style>

                '<p class="menus__empty-item">There is no menus for this restaurant</p>'
            `;
        }
    }
}

customElements.define('menu-list', MenuList);
