/*
firebase config
*/

import firebase from 'firebase/app';

export default () => {
  // Your web app's Firebase configuration
  // real thing
  const firebaseConfig = {
    apiKey: 'AIzaSyDpDkCYG7QhK5pUPm_B6qGAVvh0dxwGmz4',
    authDomain: 'mobedev1-eindwerk.firebaseapp.com',
    projectId: 'mobedev1-eindwerk',
    storageBucket: 'mobedev1-eindwerk.appspot.com',
    messagingSenderId: '243957921969',
    appId: '1:243957921969:web:c89314e05564a5f3a98a90',
  };

  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
};
