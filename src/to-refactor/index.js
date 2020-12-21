import 'regenerator-runtime/runtime';
import firebase from 'firebase/app';
import InitUser from './lib/InitUser';
import 'firebase/firestore';
import initFirebase from './lib/Firebase';
import 'firebase/auth';

/*
======================
---Main application---
======================
*/

// const register = async (e) => {
//   e.preventDefault();
//   // const formData = new FormData(document.querySelector('form'));
//   // eslint-disable-next-line max-len
//   // const user = new InitUser({ email: formData.get('email'), password: formData.get('password'), type: formData.get('type') });
//   // user.register();
//   window.location.replace('google.html');
// };

const login = async (e) => {
  e.preventDefault();
  const formData = new FormData(document.querySelector('form'));
  const user = new InitUser({ email: formData.get('email'), password: formData.get('password'), type: formData.get('type') });
  user.login();
};

const App = async () => {
  initFirebase();

  const btnLogin = document.getElementById('btnLogin');
  btnLogin.addEventListener('click', login);

  const btnRegister = document.getElementById('btnRegister');
  btnRegister.addEventListener('click', (e) => {
    e.preventDefault();
    window.location.replace('register.html');
  });

  const btnGoogle = document.getElementById('btnGoogle');
  btnGoogle.addEventListener('click', async (e) => {
    e.preventDefault();
    const provider = new firebase.auth.GoogleAuthProvider();
    await firebase.auth()
      .signInWithPopup(provider);
  });
//   const db = firebase.firestore();
//   const queryChatroom = db.collection('users').orderBy('name', 'asc');
//   queryChatroom.onSnapshot((snapshot) => {
//     const changes = snapshot.docChanges();
//     changes.forEach((change) => {
//       console.log(change.doc.data());
//     });
//   });
};

App();
