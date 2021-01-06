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
    await new User().history(this.model.profileInfo)
      .then((checkins) => {
        const historyContainer = document.createElement('div');
        historyContainer.classList.add('history-container');

        container.appendChild(historyContainer);
        checkins.forEach((checkin) => {
          // convert server timestamp to something usable
          let masterDate = checkin.data().createdOn.toDate();
          // slice the bit we actually need
          masterDate = masterDate.toString().slice(0, 21);
          const historyItem = Elements.history({
            place: checkin.data().name,
            date: masterDate,
            active: checkin.data().active,
          });
          historyContainer.insertAdjacentHTML('beforeend', historyItem);
        });
        if (historyContainer.innerHTML === '') {
          historyContainer.innerHTML = '<p>No history</p>';
        }
      });
  }

  async businessHistory(container) {
    container.insertAdjacentHTML('beforeend', Elements.createHeader({
      size: 1,
      title: 'History',
      subtitle: 'History of users that checked in here',
    }));
    // --- history date selector
    const form = document.createElement('form');
    form.setAttribute('method', 'POST');
    form.classList.add('textMargin');

    const btn = document.createElement('input');
    btn.classList.add('small_gradient_button');
    btn.type = 'submit';
    btn.value = 'see visitors';
    const div = document.createElement('div');
    div.classList.add('together');
    const input = document.createElement('input');
    input.type = 'date';
    input.name = 'filter';
    input.required = true;
    const label = document.createElement('label');
    label.setAttribute('for', 'filter');
    label.innerHTML = 'Date to filter on<span>*</span>';

    div.append(input);
    div.append(label);
    form.append(div);
    form.append(btn);
    container.append(form);
    // --- end history date selector

    btn.addEventListener('click', async (e) => {
      e.preventDefault();
      const businessInfo = await this.businessInfo();
      await new Business().history(businessInfo)
        .then((checkins) => {
          const historyContainer = document.createElement('div');
          historyContainer.id = 'historyContainer';
          historyContainer.classList.add('history-container');

          container.appendChild(historyContainer);
          // generate history item
          checkins.forEach((checkin) => {
            // convert server timestamp to something usable
            const masterDate = checkin.data().createdOn.toDate();
            // slice the bit we actually need
            const checkDate = masterDate.toString().slice(0, 15);

            // convert user input to usable date
            let userDate = new Date(input.value);
            userDate = userDate.toDateString();

            // filter by date, server side is over complicated with server timestamp
            if (checkDate === userDate) {
              const showDate = masterDate.toString().slice(4, 24);
              const historyItem = Elements.history({
                place: checkin.data().username,
                date: showDate,
                active: checkin.data().active,
              });
              historyContainer.insertAdjacentHTML('beforeend', historyItem);
            }
          });
          if (historyContainer.innerHTML === '') {
            historyContainer.innerHTML = '<p>No history</p>';
          }
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
