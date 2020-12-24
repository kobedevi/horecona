import smallHeader from '../views/templates/smallHeader';
import bigHeader from '../views/templates/bigHeader';
import loginForm from '../views/templates/loginForm';
import registerForm from '../views/templates/registerForm';
import profileInfoForm from '../views/templates/profileInfoForm';
import businessInfoForm from '../views/templates/businessInfoForm';

const Handlebars = require('handlebars');

const Elements = {

  createHeader(headerData) {
    if (headerData.size < 1 || headerData.size > 2) return null;
    let header;
    if (headerData.size === 1) {
      const template = Handlebars.compile(smallHeader);
      header = template({ headerData });
    } else {
      const template = Handlebars.compile(bigHeader);
      header = template();
    }
    return header;
  },

  title({ textContent = 'This is a title' }) {
    return `<h1>${textContent}</h1>`;
  },

  subtitle({ textContent = 'This is a title' }) {
    return `<p>${textContent}</p>`;
  },

  buttonLink({ textContent = 'This is your button', href = '#', target = '_self' }) {
    return `<a href="${href}" target="${target}" class="small_gradient_button">${textContent}</a>`;
  },

  form({ type = 'login' }) {
    let form;
    if (type === 'login') {
      const template = Handlebars.compile(loginForm);
      form = template();
    } else if (type === 'register') {
      const template = Handlebars.compile(registerForm);
      form = template();
    } else if (type === 'profileInfo') {
      const template = Handlebars.compile(profileInfoForm);
      form = template();
    } else if (type === 'businessInfo') {
      const template = Handlebars.compile(businessInfoForm);
      form = template();
    }
    return form;
  },

  submitButton({ textContent = 'sample text', onClick = null, classes = [] }) {
    const button = document.createElement('input');
    button.type = 'submit';
    button.value = textContent;
    classes.forEach((curClass) => {
      button.classList.add(curClass);
    });

    if (onClick) {
      button.addEventListener('click', (e) => {
        e.preventDefault();
        onClick();
      });
    }
    return button;
  },

  // this one doesn't prevent default
  submitButton2({ textContent = 'sample text', onClick = null, classes = [] }) {
    const button = document.createElement('input');
    button.type = 'submit';
    button.value = textContent;
    classes.forEach((curClass) => {
      button.classList.add(curClass);
    });

    if (onClick) {
      button.addEventListener('click', () => {
        onClick();
      });
    }
    return button;
  },
  createHeaderTemp({
    size = 1,
    textContent = '',
  }) {
    if (size < 1 || size > 6) return null;
    const header = document.createElement(`h${size}`);
    header.textContent = textContent;
    return header;
  },
  createButtonTemp({
    textContent = '',
    action = null,
  }) {
    const button = document.createElement('button');
    button.textContent = textContent;
    if (action != null) {
      button.addEventListener('click', () => {
        action();
      });
    }
    return button;
  },
};

export default Elements;
