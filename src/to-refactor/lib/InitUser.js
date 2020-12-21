/*
Init User object
*/
import 'regenerator-runtime/runtime';
import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

class InitUser {
  constructor({
    email = null, password = null, type = null,
  }) {
    this.email = email;
    this.password = password;
    this.type = type;
  }

  async register() {
    // try {
    //   await firebase.auth().createUserWithEmailAndPassword(this.email, this.password);
    //   try {
    //     await firebase.auth()
    //       .signInWithEmailAndPassword(this.email, this.password);
    //   } catch (err) {
    //     console.log(err);
    //   }
    // } catch (err) {
    //   console.log(err);
    // }
  }

  async login() {
    const formData = new FormData(document.querySelector('form'));
    this.email = formData.get('email');
    this.password = formData.get('password');

    try {
      await firebase.auth()
        .signInWithEmailAndPassword(this.email, this.password);
    } catch (err) {
      console.log(err);
    }

    firebase.auth().onAuthStateChanged(this.onAuthStateChanged);
  }

  // eslint-disable-next-line class-methods-use-this
  async loginGoogle() {
    const provider = new firebase.auth.GoogleAuthProvider();
    await firebase.auth()
      .signInWithPopup(provider);
    // .catch(showError);
  }

  // eslint-disable-next-line class-methods-use-this
  onAuthStateChanged(user) {
    if (user) window.location.replace('dashboard.html');
  }
}

export default InitUser;
