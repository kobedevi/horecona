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

  async saveData() {
    const formData = new FormData(document.querySelector('form'));
    const tempUser = new User();
    await tempUser.getThisUser()
      .then(() => {
        tempUser.additionalInfo(formData);
      });
  }

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
    if (!this.model.profileInfo) {
      this.getUserData();
    } else if (this.model.profileInfo.type === 'Business') window.location.replace('/businessInfo');
    const container = document.createElement('section');
    container.classList.add('pageContainer');

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
      classes: ['small_gradient_button', 'col-12'],
    });

    form.appendChild(saveBtn);
    main.appendChild(form);
    container.insertAdjacentHTML('beforeend', '<script src="https://www.gstatic.com/firebasejs/8.2.1/firebase-app.js"></script>');
    container.appendChild(main);

    return container;
  }
}

export default ProfileInfoComponent;
