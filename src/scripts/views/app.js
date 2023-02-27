/* eslint-disable class-methods-use-this */
import routes from '../routes/routes';
import UrlParser from '../routes/url-parser';
import DrawerInitiator from '../utils/drawer-initiator';
import './components/page-loader';

class App {
    constructor({ button, drawer, content }) {
        this._button = button;
        this._drawer = drawer;
        this._content = content;

        this._initialAppShell();
    }

    _initialAppShell() {
        DrawerInitiator.init({
            button: this._button,
            drawer: this._drawer,
            content: this._content,
        });
    }

    _pageLoader() {
        document.querySelector('page-loader').classList.remove('animation');
        document.querySelector('page-loader div').classList.add('loader');
        document.body.style.opacity = '0.7';
    }

    _pageLoaderAfter() {
        document.querySelector('page-loader').classList.add('animation');
        document.querySelector('page-loader div').classList.remove('loader');
        document.body.style.opacity = '1';
    }

    async renderPage() {
        this._pageLoader();
        const skipToContentLink = document.querySelector('.skip-link');
        skipToContentLink.addEventListener('click', (event) => {
            event.preventDefault();
            document.querySelector('#mainContent').focus();
        });

        try {
            const url = UrlParser.parseActiveUrlWithCombiner();
            const page = routes[url];
            this._content.innerHTML = await page.render();
            await page.afterRender();
        } catch (error) {
            console.log(error);
        } finally {
            this._pageLoaderAfter();
        }
    }
}

export default App;
