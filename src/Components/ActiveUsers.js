/*
* register component
*/

import 'regenerator-runtime/runtime';

import firebase from 'firebase/app';
import 'firebase/firestore';

import Elements from '../lib/Elements';
import Component from '../lib/Component';
import User from '../lib/User';
import Business from '../lib/Business';

class ActiveUsers extends Component {
  constructor() {
    super({
      name: 'Active Users',
      model: {
        profileInfo: null,
      },
      routerPath: '/activeUsers',
    });
    this.userLoaded = false;
  }

  async getUserData(tempUser) {
    if (!this.userLoaded) {
      await tempUser.getThisUser()
        .then(async (data) => {
          this.model.profileInfo = data;
          this.userLoaded = true;
        });
    }
  }

  async businessInfo() {
    const db = firebase.firestore();
    const query = await db.collection('users').doc(this.model.profileInfo.docid).collection('info').get()
      .then(async (data) => data.docs[0].data());
    return query;
  }

  async activeUsersDOM(container) {
    container.insertAdjacentHTML('beforeend', Elements.createHeader({
      size: 1,
      title: 'Active users',
      subtitle: 'Currently checked in users at your business',
    }));

    const businessInfo = await this.businessInfo();
    await new Business().activeUsers(businessInfo)
      .then((checkins) => {
        const activeUserContainer = document.createElement('div');
        activeUserContainer.id = 'historyContainer';
        activeUserContainer.classList.add('history-container');

        container.appendChild(activeUserContainer);
        // generate history item
        checkins.forEach((checkin) => {
          const userContainer = document.createElement('div');
          userContainer.classList.add('history-item', 'button__action');
          const data = document.createElement('div');
          data.classList.add('history-data');
          const name = document.createElement('p');
          const date = document.createElement('p');
          date.classList.add('date');
          const span = document.createElement('span');

          const masterDate = checkin.data().createdOn.toDate();
          const domDate = masterDate.toString().slice(4, 24);

          activeUserContainer.append(userContainer);
          userContainer.append(data);
          data.append(name);
          name.innerHTML = checkin.data().username;
          data.append(date);
          date.innerHTML = domDate;
          userContainer.append(span);
          span.innerHTML = 'Check out';

          span.addEventListener('click', async () => {
            // make a manipulatable object from checkinData
            const userData = checkin.data();
            // rename uid to user so we can reuse User checkout function
            userData.user = checkin.data().uid;
            delete userData.uid;

            // do the same for businessData
            const businessData = {
              businessCheckout: true,
              data: {
                name: this.model.profileInfo.business,
              },
              id: this.model.profileInfo.docid,
            };
            userContainer.classList.add('hide');
            const thisUser = new User();
            await thisUser.checkout(userData, businessData);
          });
        });
        // if there are no active users append a message
        if (activeUserContainer.innerHTML === '') {
          activeUserContainer.innerHTML = '<p>No active users</p>';
        }
      });
  }

  render() {
    // create a container
    const container = document.createElement('section');
    container.classList.add('pageContainer');

    const main = document.createElement('main');
    main.classList.add('left');

    if (!this.model.profileInfo) {
      const tempUser = new User();
      this.getUserData(tempUser);
    } else {
      this.activeUsersDOM(main);
    }

    container.appendChild(main);
    main.insertAdjacentHTML('beforeend', Elements.navigation({ active: 'home' }));
    return container;
  }
}

export default ActiveUsers;
