/*
* register component
*/

import 'regenerator-runtime/runtime';

import Elements from '../lib/Elements';
import Component from '../lib/Component';
import User from '../lib/User';

class ProfileInfoComponent extends Component {
  constructor() {
    super({
      name: 'ProfileInfo',
      model: {
        profileInfo: null,
      },
      routerPath: '/profileInfo',
    });
    this.userLoaded = false;
  }

  // save user data
  async saveData() {
    // get form data
    const formData = new FormData(document.querySelector('form'));
    const tempUser = new User(this.model.profileInfo, 'user');
    // store it with the relevant user id
    tempUser.additionalInfo(formData);
  }

  // get relevant user data
  async getUserData() {
    if (!this.userLoaded) {
      const tempUser = new User();
      await tempUser.getThisUser()
        .then((data) => {
          this.model.profileInfo = data;
          this.userLoaded = true;
        });
    }
  }

  render() {
    const container = document.createElement('section');
    container.classList.add('pageContainer');

    // get user data before continuing
    if (!this.model.profileInfo) {
      this.getUserData();
      // if the user is a business redirect
    } else if (this.model.profileInfo.type === 'Business') {
      window.location.replace('/businessInfo');
      // otherwise render the page
    } else {
      // header
      container.insertAdjacentHTML('beforeend', Elements.createHeader({
        size: 1,
        title: 'Profile info',
        subtitle: 'Tell us a little about yourself',
      }));

      const main = document.createElement('main');
      // form
      const form = document.createElement('form');
      form.insertAdjacentHTML('beforeend', Elements.form({
        type: 'profileInfo',
      }));

      form.addEventListener('submit', (e) => {
        e.preventDefault();
      });

      const saveBtn = Elements.submitButton2({
        textContent: 'Save',
        onClick: this.saveData.bind(this),
        classes: ['m-button__small_gradient_button', 'col-12'],
      });

      form.appendChild(saveBtn);
      main.appendChild(form);
      container.insertAdjacentHTML('beforeend', '<script src="https://www.gstatic.com/firebasejs/8.2.1/firebase-app.js"></script>');
      container.appendChild(main);
    }

    /*
    async functions can take a while so show that it's loading
    */
    if (container.innerHTML === '') {
      container.innerHTML = '<p>Loading...</p>';
    }

    return container;
  }
}

export default ProfileInfoComponent;
