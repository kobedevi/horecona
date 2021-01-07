/*
* login component
*/

import 'regenerator-runtime/runtime';
import 'firebase/firestore';
import 'firebase/auth';

import Form from '../lib/Form';
import Elements from '../lib/Elements';

class LoginComponent extends Form {
  constructor() {
    super({
      name: 'login',
      model: {
        login: null,
      },
      routerPath: '/login',
    });
  }

  render() {
    // create a container
    const container = document.createElement('section');
    container.classList.add('pageContainer');

    // header
    container.insertAdjacentHTML('beforeend', Elements.createHeader({
      size: 1,
      title: 'Login',
      subtitle: 'Login or sign up',
    }));

    const main = document.createElement('main');
    // form
    const form = document.createElement('form');
    form.setAttribute('method', 'POST');
    form.insertAdjacentHTML('beforeend', Elements.form({ type: 'login' }));

    // create buttons
    const div = document.createElement('div');
    div.classList.add('seperate', 'row');

    const loginBtn = Elements.submitButton({
      textContent: 'Login',
      onClick: super.loginEmail.bind(this),
      classes: ['m-button__small_gradient_button', 'col-6'],
    });

    const registerBtn = Elements.submitButton({
      textContent: 'Sign-up',
      onClick: () => { window.location.replace('/register'); },
      classes: ['m-button__small_gradient_button', 'outline', 'col-6'],
    });

    const text = '<p class="margin">OR</p>';

    const googleBtn = Elements.submitButton({
      textContent: 'Sign in with Google',
      onClick: super.loginGoogle.bind(this),
      classes: ['m-button__small_gradient_button', 'google', 'col-12'],
    });

    // append everything
    div.appendChild(loginBtn);
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

export default LoginComponent;
