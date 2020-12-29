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
      },
      routerPath: '/dashboard',
    });
    this.typeLoaded = false;
  }

  async getUserData() {
    if (!this.typeLoaded) {
      const tempUser = new User();
      await tempUser.getThisUser2()
        .then((data) => {
          this.model.profileInfo = data;
          this.typeLoaded = true;
        });
    }
  }

  userDashboard(container) {
    // header
    container.insertAdjacentHTML('beforeend', Elements.createHeader({
      size: 1,
      title: 'Not checked in',
      subtitle: 'You\'re currently not checked in',
    }));

    const main = document.createElement('main');
    main.classList.add('left');

    main.insertAdjacentHTML('beforeend', Elements.subsubtitle({ textContent: 'Corona proof locations' }));
    main.insertAdjacentHTML('beforeend', Elements.subsubtitle({ textContent: 'Actions' }));
    main.insertAdjacentHTML('beforeend', Elements.actionBtn({ textContent: 'Check in', href: '/scanner' }));
    main.insertAdjacentHTML('beforeend', Elements.actionBtn({ textContent: 'History', href: '#' }));

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
    main.insertAdjacentHTML('beforeend', Elements.actionBtn({ textContent: 'Generate QR-code', href: '#' }));
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
    console.log(this.model.profileInfo);

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
