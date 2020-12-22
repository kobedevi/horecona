/*
* login component
*/

import 'regenerator-runtime/runtime';
import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

import Component from "../lib/Component";
import Elements from "../lib/Elements";
import { async } from 'regenerator-runtime/runtime';

class LoginComponent extends Component {
    constructor(){
        super({
            name: 'login',
            model: {
                login: null,
            },
            routerPath: '/login',
        });
    }    

    showError({message}) {
        if(!message) return;
        const errorContainer = document.querySelector('form .error-container');
        errorContainer.innerHTML = message;
        errorContainer.classList.remove('hide');
    }

    render(){
        // create a container
        const container = document.createElement('section');
        container.classList.add('pageContainer');

        // header
        container.insertAdjacentHTML("beforeend", Elements.createHeader({
            size:1,
            title: 'Login',
            subtitle: 'Login or sign up',
        }));

        const main = document.createElement('main');
        // form
        const form = document.createElement('form');
        form.setAttribute('method', 'POST');
        form.insertAdjacentHTML("beforeend", Elements.form({type: 'login'}));
        
        // create buttons
        const div = document.createElement('div');
        div.classList.add('seperate', 'row');
        
        const loginBtn = Elements.submitButton({
            textContent: 'Login',
            onClick: async() => {
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
            },
            classes: ['small_gradient_button', 'col-6'],
        });

        const registerBtn = Elements.submitButton({
            textContent: 'Sign-up',
            onClick: () => {window.location.replace('/register')},
            classes: ['small_gradient_button', 'outline','col-6'],
        });

        const text = `<p class="margin">OR</p>`;

        const googleBtn = Elements.submitButton({
            textContent: 'Sign in with Google',
            onClick: async () => {
                const provider = new firebase.auth.GoogleAuthProvider();
                await firebase.auth()
                .signInWithPopup(provider);
            },
            classes: ['small_gradient_button', 'google','col-12'],
        });

        div.appendChild(loginBtn);
        div.appendChild(registerBtn);
        div.insertAdjacentHTML('beforeend', text);
        div.appendChild(googleBtn);


        /*<div class="seperate row">
            <input id="btnLogin" type="submit" value="Login" class="small_gradient_button col-6">
            <input id="btnRegister" type="submit" value="Sign-up" class="small_gradient_button outline col-6">
            <p class="margin">OR</p>
            <input id="btnGoogle" type="submit" value="Sign in with Google" class="small_gradient_button google col-12">
        </div> */
        form.appendChild(div);
        main.appendChild(form);
        container.insertAdjacentHTML('beforeend',`<script src="https://www.gstatic.com/firebasejs/8.2.1/firebase-app.js"></script>`);
        container.appendChild(main);

        return container;
    }
}

export default LoginComponent;
