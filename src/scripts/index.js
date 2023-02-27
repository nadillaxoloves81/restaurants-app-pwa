import 'regenerator-runtime'; /* for async await transpile */
import '../styles/main.css';
import '../styles/responsive.css';
import swRegister from './utils/sw-register';
import App from './views/app';
import 'lazysizes';
import 'lazysizes/plugins/parent-fit/ls.parent-fit';

const app = new App({
    button: document.querySelector('#menuBtn'),
    drawer: document.querySelector('#navigationDrawer'),
    content: document.querySelector('#mainContent'),
});

window.addEventListener('hashchange', () => {
    app.renderPage();
    window.scrollTo({
        top: 0,
        behavior: 'smooth',
    });
});

window.addEventListener('load', () => {
    app.renderPage();
    window.scrollTo({
        top: 0,
        behavior: 'smooth',
    });
    swRegister();
});
