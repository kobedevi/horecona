import App from './App';
import { HomeComponent } from './Components';
import Router from './Router';

const initApp = () => {
    const appContainer = document.querySelector('html');
    
    const app = new App(appContainer);
    app.showComponent(new HomeComponent());

    Router.getRouter().on('/test', () => {
        console.log('testing...');
    }).resolve();
}

window.addEventListener('load', initApp);
