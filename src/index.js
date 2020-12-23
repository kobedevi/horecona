import App from './App';
import { HomeComponent, LoginComponent, RegisterComponent, ProfileInfoComponent, TestComponent } from './Components';

import firebase from 'firebase/app';
import 'firebase/firestore';
import initFirebase from './lib/Firebase';
import 'firebase/auth';

const onAuthStateChanged = async (user) => {
    let executed = JSON.parse(localStorage.getItem('executed'));
    if(!executed){
        localStorage.setItem('executed', true);
        if(user) location.replace('/tester');
    }
}

const initApp = async() => {
    initFirebase();
    const appContainer = document.getElementById('appContainer');

    const app = new App(appContainer);
    app.addComponent(new HomeComponent());
    app.addComponent(new LoginComponent());
    app.addComponent(new RegisterComponent());
    app.addComponent(new ProfileInfoComponent());
    app.addComponent(new TestComponent());

}

window.addEventListener('load', initApp);
