/*
* Form functions
*/

import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

import User from './User';
import Component from "./Component";

class Form extends Component{
    constructor({name, model, routerPath}){
        super({
            name: name,
            model: model,
            routerPath: routerPath,
        });
    }

    storeAditional(userData) {
        const formData = new FormData(document.querySelector('form'));
        const type = formData.get('type'); 
        const user = new User(userData, type);
        user.storeUser();
    }

    showError({message}) {
        if(!message) return;
        const errorContainer = document.querySelector('form .error-container');
        errorContainer.innerHTML = message;
        errorContainer.classList.remove('hide');
    }

    async register(){
        const formData = new FormData(document.querySelector('form'));
        const password = formData.get('password'); 
        const repeatPassword = formData.get('repeat-password'); 
        // if passwords match, create account
        if(password == repeatPassword){
            const email = formData.get('email');
            try {
                await firebase.auth()
                .createUserWithEmailAndPassword(email, password);
                firebase.auth().onAuthStateChanged(this.storeAditional);
            } 
            catch(err) {
                this.showError(err);
            }
        } else {
            // passwords don't match, show error
            this.showError({message: `Passwords don't match.`});
        }
    }

    async loginGoogle(){
        const provider = new firebase.auth.GoogleAuthProvider();
        await firebase.auth()
        .signInWithPopup(provider);
        firebase.auth().onAuthStateChanged(this.storeAditional);
    }

    async loginEmail(){
        const formData = new FormData(document.querySelector('form'));
        const email = formData.get('email');
        const password = formData.get('password');
        try {
            await firebase.auth()
            .signInWithEmailAndPassword(email, password);
            window.location.replace('/tester');
        }
        catch(err) {
            this.showError(err);
        }
    }
}

export default Form;
