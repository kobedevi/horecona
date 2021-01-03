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

class UserDashboard extends Component {
  constructor() {
    super({
      name: 'History',
      model: {
        profileInfo: null,
      },
      routerPath: '/history',
    });
    this.userLoaded = false;
  }

  async getUserData(tempUser) {
    if (!this.userLoaded) {
      await tempUser.getThisUser2()
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

  async userHistory(container) {
    container.insertAdjacentHTML('beforeend', Elements.createHeader({
      size: 1,
      title: 'History',
      subtitle: 'History of places you checked in',
    }));
    console.log(this.model.profileInfo);
    await new User().history(this.model.profileInfo)
      .then((checkins) => {
        const historyMainContainer = document.createElement('div');
        historyMainContainer.classList.add('historyMainContainer');
        const historyContainer = document.createElement('div');
        historyContainer.classList.add('history-container');

        container.appendChild(historyContainer);
        checkins.forEach((checkin) => {
          // show new messages
          console.log(checkin.data().createdOn.toDate());
          // eslint-disable-next-line max-len
          const historyItem = Elements.history({ place: checkin.data().name, active: checkin.data().active });
          historyContainer.insertAdjacentHTML('beforeend', historyItem);
        });
      });
  }

  async businessHistory(container) {
    container.insertAdjacentHTML('beforeend', Elements.createHeader({
      size: 1,
      title: 'History',
      subtitle: 'History of users that checked in here',
    }));
    const businessInfo = await this.businessInfo();
    await new Business().history(businessInfo)
      .then((checkins) => {
        const historyMainContainer = document.createElement('div');
        historyMainContainer.classList.add('historyMainContainer');
        const historyContainer = document.createElement('div');
        historyContainer.classList.add('history-container');

        container.appendChild(historyContainer);
        checkins.forEach((checkin) => {
          // show new messages
          console.log(checkin.data().createdOn.toDate());
          // eslint-disable-next-line max-len
          const historyItem = Elements.history({ place: checkin.data().username, active: checkin.data().active });
          historyContainer.insertAdjacentHTML('beforeend', historyItem);
        });
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
    } else if (this.model.profileInfo.type === 'user') {
      this.userHistory(main);
    } else if (this.model.profileInfo.type === 'Business') {
      this.businessHistory(main);
    }
    container.appendChild(main);
    main.insertAdjacentHTML('beforeend', Elements.navigation({ active: 'home' }));
    return container;
  }
}

export default UserDashboard;
