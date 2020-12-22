
/*
* register component
*/

import 'regenerator-runtime/runtime';
import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

import Component from "../lib/Component";
import Elements from "../lib/Elements";

class RegisterComponent extends Component {
    constructor(){
        super({
            name: 'register',
            model: {
                register: null,
            },
            routerPath: '/register',
        });
    }    

    showError = ({message}) => {
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
            title: 'Sign-up',
            subtitle: 'Sign up as user or business',
        }));

        const main = document.createElement('main');
        // form
        const form = document.createElement('form');
        form.insertAdjacentHTML("beforeend", Elements.form({type: 'register'}));
        
        // create buttons
        const div = document.createElement('div');
        div.classList.add('seperate', 'row');
        
        const registerBtn = Elements.submitButton({
            textContent: 'Register',
            onClick: async () => {
                const formData = new FormData(document.querySelector('form'));
                const password = formData.get('password'); 
                const repeatPassword = formData.get('repeat-password'); 
                // if passwords match, create account
                if(password == repeatPassword){
                    const email = formData.get('email');
                    try {
                        await firebase.auth()
                        .createUserWithEmailAndPassword(email, password);
                        window.location.replace('/');
                    } 
                    catch(err) {
                        this.showError(err);
                    }
                } else {
                    // passwords don't match, show error
                    this.showError({message: `Passwords don't match.`})
                }
            },
            classes: ['small_gradient_button', 'col-12'],
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

        div.appendChild(registerBtn);
        div.insertAdjacentHTML('beforeend', text);
        div.appendChild(googleBtn);

        form.appendChild(div);
        main.appendChild(form);
        container.insertAdjacentHTML('beforeend',`<script src="https://www.gstatic.com/firebasejs/8.2.1/firebase-app.js"></script>`);
        container.appendChild(main);

        return container;
    }
}

export default RegisterComponent;


{/* <div class="seperate row">
<input id="btnLogin" type="submit" value="Login" class="small_gradient_button col-6">
<input id="btnRegister" type="submit" value="Sign-up" class="small_gradient_button outline col-6">
<p class="margin">OR</p>
<input type="submit" value="Sign in with Google" class="small_gradient_button google col-12">
</div> */}