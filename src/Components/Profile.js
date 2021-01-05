/*
* register component
*/

import 'regenerator-runtime/runtime';

import firebase from 'firebase/app';
import 'firebase/firestore';

import Elements from '../lib/Elements';
import Component from '../lib/Component';
import User from '../lib/User';

class Profile extends Component {
  constructor() {
    super({
      name: 'profile',
      model: {
        profileInfo: null,
      },
      routerPath: '/dashboard/profile',
    });
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
          this.userLoaded = true;
        });
    }
  }

  render() {
    if (!this.model.profileInfo) {
      this.getUserData();
    }

    // create a container
    const container = document.createElement('section');
    container.classList.add('pageContainer');

    container.insertAdjacentHTML('beforeend', Elements.createHeader({
      size: 1,
      title: 'Profile',
      subtitle: 'This is your profile page',
    }));

    const main = document.createElement('main');
    main.classList.add('left');

    main.insertAdjacentHTML('beforeend', Elements.subsubtitle({ textContent: 'Edit information' }));
    main.appendChild(Elements.actionBtn({ textContent: 'Update info', icon: 'edit', href: '#' }));

    main.insertAdjacentHTML('beforeend', Elements.subsubtitle({ textContent: 'Actions' }));
    main.appendChild(Elements.actionBtn({
      textContent: 'Log out',
      icon: 'logout',
      onClick: () => {
        firebase.auth().signOut();
        window.location.replace('/login');
      },
    }));
    main.insertAdjacentHTML('beforeend', Elements.navigation({ active: 'profile' }));

    container.append(main);

    return container;
  }
}

export default Profile;
