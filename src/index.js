// import firebase from 'firebase/app';
import App from './App';
import {
  // eslint-disable-next-line max-len
  HomeComponent, LoginComponent, RegisterComponent, ProfileInfoComponent, BusinessInfoComponent, UserDashboard, Scanner, Generator, History, ActiveUsers, Profile,
} from './Components';

import 'firebase/firestore';
// import initFirebase from './lib/Firebase';
import 'firebase/auth';

const initApp = async () => {
  const appContainer = document.getElementById('appContainer');

  const app = new App(appContainer);
  app.addComponent(new HomeComponent());
  app.addComponent(new LoginComponent());
  app.addComponent(new RegisterComponent());
  app.addComponent(new ProfileInfoComponent());
  app.addComponent(new BusinessInfoComponent());
  app.addComponent(new UserDashboard());
  app.addComponent(new Scanner());
  app.addComponent(new Generator());
  app.addComponent(new History());
  app.addComponent(new ActiveUsers());
  app.addComponent(new Profile());

  // register serviceworker if possible
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('./sw.js');
  }
};

window.addEventListener('load', initApp);
