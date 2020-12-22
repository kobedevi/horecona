import App from './App';
import { HomeComponent, LoginComponent, RegisterComponent, TestComponent } from './Components';

import firebase from 'firebase/app';
import 'firebase/firestore';
import initFirebase from './lib/Firebase';
import 'firebase/auth';

const onAuthStateChanged = (user) => {
    let executed = JSON.parse(localStorage.getItem('executed'));
    if(!executed){
        if(user) location.replace('/tester');
        localStorage.setItem('executed', true);
    }
}

const initApp = () => {
    initFirebase();
    const appContainer = document.getElementById('appContainer');
    
    const app = new App(appContainer);
    app.addComponent(new HomeComponent());
    app.addComponent(new LoginComponent());
    app.addComponent(new RegisterComponent());
    app.addComponent(new TestComponent());

	firebase.auth().onAuthStateChanged(onAuthStateChanged);
}

window.addEventListener('load', initApp);
