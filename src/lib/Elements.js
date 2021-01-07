import smallHeader from '../views/templates/smallHeader';
import bigHeader from '../views/templates/bigHeader';
import loginForm from '../views/templates/loginForm';
import registerForm from '../views/templates/registerForm';
import profileInfoForm from '../views/templates/profileInfoForm';
import businessInfoForm from '../views/templates/businessInfoForm';
import navigation from '../views/templates/navigation';
import history from '../views/templates/history';

// import all images... didn't know a better solution
import iconCheckin from '../img/icons/checkin.svg';
import iconGenerate from '../img/icons/generate.svg';
import iconUsers from '../img/icons/users.svg';
import iconHistory from '../img/icons/history.svg';
import iconEdit from '../img/icons/edit.svg';
import iconLogout from '../img/icons/logout.svg';

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
    return `<h1 class=".m-tittle">${textContent}</h1>`;
  },

  subtitle({ textContent = 'This is a title' }) {
    return `<p class=".m-subtitle">${textContent}</p>`;
  },

  subsubtitle({ textContent = 'this is a title' }) {
    return `<h3 class="textMargin">${textContent}</h3>`;
  },

  actionBtn({
    textContent = 'Action description', icon = 'checkin', href = '#', onClick = null,
  }) {
    const a = document.createElement('a');
    a.href = href;
    a.classList.add('m-button__action');
    const div = document.createElement('div');
    div.classList.add('m-action__container');
    const img = document.createElement('img');
    img.classList.add('a-container__img');

    // check which icon to use
    img.alt = 'icon';
    switch (icon) {
      case 'checkin':
        img.src = iconCheckin;
        break;
      case 'generate':
        img.src = iconGenerate;
        break;
      case 'history':
        img.src = iconHistory;
        break;
      case 'users':
        img.src = iconUsers;
        break;
      case 'logout':
        img.src = iconLogout;
        break;
      case 'edit':
        img.src = iconEdit;
        break;
      default:
        img.alt = 'image not found';
    }

    if (onClick) {
      a.classList.add('action__gradient');
      a.addEventListener('click', (e) => {
        e.preventDefault();
        onClick();
      });
    }

    const p = document.createElement('p');
    p.classList.add('a-container__text');
    p.innerHTML = textContent;
    div.appendChild(img);
    div.appendChild(p);
    a.appendChild(div);

    return a;
  },

  buttonLink({ textContent = 'This is your button', href = '#', target = '_self' }) {
    return `<a href="${href}" target="${target}" class="m-button__small_gradient_button">${textContent}</a>`;
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
  navigation({ active = null, home = '/dashboard', profile = '/dashboard/profile' }) {
    let nav;
    if (active === 'home') {
      const classData = {
        home: {
          active: 'active',
          href: home,
        },
        profile: {
          active: '',
          href: profile,
        },
      };
      const template = Handlebars.compile(navigation);
      nav = template({ classData });
    } else if (active === 'profile') {
      const classData = {
        home: {
          active: '',
          href: home,
        },
        profile: {
          active: 'active',
          href: profile,
        },
      };
      const template = Handlebars.compile(navigation);
      nav = template({ classData });
    }
    return nav;
  },

  history({ place = 'placeholder', active = false, date = null }) {
    const template = Handlebars.compile(history);
    const historyItem = template({ place, date, active });
    return historyItem;
  },
};

export default Elements;
