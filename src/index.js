// import firebase from 'firebase/app';
import App from './App';
import {
  // eslint-disable-next-line max-len
  HomeComponent, LoginComponent, RegisterComponent, ProfileInfoComponent, BusinessInfoComponent, TestComponent,
} from './Components';

import 'firebase/firestore';
import initFirebase from './lib/Firebase';
import 'firebase/auth';

// const onAuthStateChanged = async (user) => {
//   const executed = JSON.parse(localStorage.getItem('executed'));
//   if (!executed) {
//     localStorage.setItem('executed', true);
//     if (user) window.location.replace('/tester');
//   }
// };

const initApp = async () => {
  initFirebase();
  const appContainer = document.getElementById('appContainer');

  const app = new App(appContainer);
  app.addComponent(new HomeComponent());
  app.addComponent(new LoginComponent());
  app.addComponent(new RegisterComponent());
  app.addComponent(new ProfileInfoComponent());
  app.addComponent(new BusinessInfoComponent());
  app.addComponent(new TestComponent());
};

window.addEventListener('load', initApp);
