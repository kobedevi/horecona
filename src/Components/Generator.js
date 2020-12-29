/*
* register component
*/

import 'regenerator-runtime/runtime';

import firebase from 'firebase/app';
import 'firebase/firestore';

import Elements from '../lib/Elements';
import Component from '../lib/Component';

class Generate extends Component {
  constructor() {
    super({
      name: 'generate',
      model: {
        qr: null,
      },
      routerPath: '/generate',
    });
    this.businessLoaded = false;
  }

  async getCorrectBusiness(name) {
    const db = firebase.firestore();
    await db.collection('registeredBusinesses').where('name', '==', name).get()
      .then(async (data) => {
        if (data.docs[0] === undefined) {
          // nog opvangen en opnieuw laten scannen
          console.log('bestaat niet');
        } else {
          // return business id
          return data.docs[0].id;
        }
        console.log(data);
      });
  }

  render() {
    // create a container
    const container = document.createElement('section');
    container.classList.add('pageContainer');

    // header
    container.insertAdjacentHTML('beforeend', Elements.createHeader({
      size: 1,
      title: 'Scan QR-code',
      subtitle: 'Scanning the QR-code will check you in',
    }));

    const main = document.createElement('main');

    container.insertAdjacentHTML('beforeend', '<script src="https://www.gstatic.com/firebasejs/8.2.1/firebase-app.js"></script>');
    container.appendChild(main);

    return container;
  }
}

export default Generate;
