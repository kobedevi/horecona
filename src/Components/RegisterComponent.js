/*
* register component
*/

import 'regenerator-runtime/runtime';
import 'firebase/firestore';
import 'firebase/auth';

import Form from '../lib/Form';
import Elements from '../lib/Elements';

class RegisterComponent extends Form {
  constructor() {
    super({
      name: 'register',
      model: {
        register: null,
      },
      routerPath: '/register',
    });
  }

  render() {
    // create a container
    const container = document.createElement('section');
    container.classList.add('pageContainer');

    // header
    container.insertAdjacentHTML('beforeend', Elements.createHeader({
      size: 1,
      title: 'Sign-up',
      subtitle: 'Sign up as user or business',
    }));

    const main = document.createElement('main');
    // form
    const form = document.createElement('form');
    form.setAttribute('method', 'POST');
    form.insertAdjacentHTML('beforeend', Elements.form({ type: 'register' }));

    // create buttons
    const div = document.createElement('div');
    div.classList.add('seperate', 'row');

    const registerBtn = Elements.submitButton({
      textContent: 'Register',
      // call super function register and bind 'this' to keep context
      onClick: super.register.bind(this),
      classes: ['m-button__small_gradient_button', 'col-12'],
    });
    const text = '<p class="margin">OR</p>';

    const googleBtn = Elements.submitButton({
      textContent: 'Sign in with Google',
      // call super function login and bind 'this' to keep context
      onClick: super.loginGoogle.bind(this),
      classes: ['m-button__small_gradient_button', 'google', 'col-12'],
    });

    div.appendChild(registerBtn);
    div.insertAdjacentHTML('beforeend', text);
    div.appendChild(googleBtn);

    form.appendChild(div);
    main.appendChild(form);
    container.insertAdjacentHTML('beforeend', '<script src="https://www.gstatic.com/firebasejs/8.2.1/firebase-app.js"></script>');
    container.appendChild(main);

    return container;
  }
}

export default RegisterComponent;
