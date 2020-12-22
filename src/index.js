import App from './App';
import { HomeComponent, LoginComponent, RegisterComponent } from './Components';

import 'firebase/firestore';
import initFirebase from './lib/Firebase';
import 'firebase/auth';

const initApp = () => {
    initFirebase();
    const appContainer = document.getElementById('appContainer');
    
    const app = new App(appContainer);
    app.addComponent(new HomeComponent());
    app.addComponent(new LoginComponent());
    app.addComponent(new RegisterComponent());
}

window.addEventListener('load', initApp);
