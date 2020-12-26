/*
* register component
*/

import 'regenerator-runtime/runtime';

import Elements from '../lib/Elements';
import Component from '../lib/Component';

class UserDashboard extends Component {
  constructor() {
    super({
      name: 'Dashboard',
      model: {
        locations: null,
      },
      routerPath: '/userdashboard',
    });
  }

  render() {
    // create a container
    const container = document.createElement('section');
    container.classList.add('pageContainer');

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
    main.insertAdjacentHTML('beforeend', Elements.actionBtn({ textContent: 'Check in', href: '#' }));
    main.insertAdjacentHTML('beforeend', Elements.actionBtn({ textContent: 'History', href: '#' }));

    main.insertAdjacentHTML('beforeend', Elements.navigation({ active: 'home' }));

    container.insertAdjacentHTML('beforeend', '<script src="https://www.gstatic.com/firebasejs/8.2.1/firebase-app.js"></script>');
    container.appendChild(main);

    return container;
  }
}

export default UserDashboard;
