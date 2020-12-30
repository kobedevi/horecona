/*
* register component
*/

import 'regenerator-runtime/runtime';

import Elements from '../lib/Elements';
import Component from '../lib/Component';
import User from '../lib/User';

class UserDashboard extends Component {
  constructor() {
    super({
      name: 'Dashboard',
      model: {
        locations: null,
        profileInfo: null,
        checkin: null,
      },
      routerPath: '/dashboard',
    });
    this.userLoaded = false;
  }

  async getUserData() {
    if (!this.userLoaded) {
      const tempUser = new User();
      await tempUser.getThisUser2()
        .then(async (data) => {
          await tempUser.getCheckinData(data)
            .then((checkinData) => {
              this.model.profileInfo = data;
              this.model.checkin = checkinData;
            });
          // this.model.profileInfo = data;
          this.userLoaded = true;
        });
    }
  }

  async checkout() {
    const tempUser = new User();
    await tempUser.checkout(this.model.profileInfo, this.model.checkin);
  }

  userDashboard(container) {
    // header
    if (!this.model.checkin) {
      container.insertAdjacentHTML('beforeend', Elements.createHeader({
        size: 1,
        title: 'Not checked in',
        subtitle: 'You\'re currently not checked in',
      }));
    } else {
      container.insertAdjacentHTML('beforeend', Elements.createHeader({
        size: 1,
        title: 'Checked in',
        subtitle: `You\'re checked in at ${this.model.checkin.data.name}`,
      }));
    }

    const main = document.createElement('main');
    main.classList.add('left');

    main.insertAdjacentHTML('beforeend', Elements.subsubtitle({ textContent: 'Corona proof locations' }));
    main.insertAdjacentHTML('beforeend', Elements.subsubtitle({ textContent: 'Actions' }));
    // if user is not checked in checked in show check in button
    if (this.model.checkin === null) {
      main.insertAdjacentHTML('beforeend', Elements.actionBtn({ textContent: 'Check in', href: '/scanner' }));
    } else {
      // else check out button
      // Handlebars is shit with this so I create it once here...
      const button = document.createElement('a');
      button.href = '#';
      button.classList.add('action', 'textMargin');
      const div = document.createElement('div');
      button.appendChild(div);
      const img = document.createElement('img');
      img.src = 'https://pbs.floatplane.com/icons/favicon-32x32.png';
      img.alt = 'icon';
      div.appendChild(img);
      const text = document.createElement('p');
      text.innerHTML = 'Check out';
      div.appendChild(text);
      button.addEventListener('click', (e) => {
        e.preventDefault();
        this.checkout();
      });
      main.append(button);
    }
    main.insertAdjacentHTML('beforeend', Elements.actionBtn({ textContent: 'History', href: '/history' }));

    main.insertAdjacentHTML('beforeend', Elements.navigation({ active: 'home' }));

    container.insertAdjacentHTML('beforeend', '<script src="https://www.gstatic.com/firebasejs/8.2.1/firebase-app.js"></script>');
    container.appendChild(main);
  }

  businessDashboard(container) {
    // header
    container.insertAdjacentHTML('beforeend', Elements.createHeader({
      size: 1,
      title: 'BUSINESS',
      subtitle: 'MANAGER AT NAME BUSINESS',
    }));

    const main = document.createElement('main');
    main.classList.add('left');

    main.insertAdjacentHTML('beforeend', Elements.subsubtitle({ textContent: 'Actions' }));
    main.insertAdjacentHTML('beforeend', Elements.actionBtn({ textContent: 'Generate QR-code', href: '/generate' }));
    main.insertAdjacentHTML('beforeend', Elements.actionBtn({ textContent: 'Active users', href: '#' }));
    main.insertAdjacentHTML('beforeend', Elements.actionBtn({ textContent: 'History', href: '#' }));

    main.insertAdjacentHTML('beforeend', Elements.navigation({ active: 'home' }));

    container.insertAdjacentHTML('beforeend', '<script src="https://www.gstatic.com/firebasejs/8.2.1/firebase-app.js"></script>');
    container.appendChild(main);
  }

  render() {
    // create a container
    const container = document.createElement('section');
    container.classList.add('pageContainer');

    if (!this.model.profileInfo) {
      this.getUserData();
    } else if (this.model.profileInfo.type === 'user') {
      this.userDashboard(container);
    } else if (this.model.profileInfo.type === 'Business') {
      this.businessDashboard(container);
    }

    return container;
  }
}

export default UserDashboard;
