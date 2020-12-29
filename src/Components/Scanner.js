/*
* register component
*/

import 'regenerator-runtime/runtime';

import firebase from 'firebase/app';
import 'firebase/firestore';

import Elements from '../lib/Elements';
import Scannerlib from '../lib/Scanner';
import Component from '../lib/Component';

class Scanner extends Component {
  constructor() {
    super({
      name: 'Scanner',
      model: {
        qrmessage: null,
      },
      routerPath: '/scanner',
    });
    this.scannerLoaded = false;
  }

  async scannerData(main) {
    await Scannerlib.scanner()
      .then(async (message) => {
        await this.getCorrectBusiness(main, message);
      });
  }

  async getCorrectBusiness(main, name) {
    const textContainer = document.createElement('div');
    textContainer.id = 'text';
    const text = document.createElement('h3');
    // check firebase for business
    textContainer.appendChild(text);
    main.appendChild(textContainer);
    const db = firebase.firestore();
    await db.collection('registeredBusinesses').where('name', '==', name).get()
      .then(async (data) => {
        if (data.docs[0] === undefined) {
          text.innerHTML = 'Woops, that didn\'t work<br/> Want to try again?';
          // nog opvangen en opnieuw laten scannen
          console.log('bestaat niet');
        } else {
          // return business id
          text.innerHTML = `You scanned ${name},<br> is that correct?`;
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

    const reader = document.createElement('div');
    reader.setAttribute('id', 'reader');

    main.appendChild(reader);
    if (!this.model.qrmessage) {
      this.scannerData(main);
    } else {
      console.log(this.model.qrmessage);
    }

    main.insertAdjacentHTML('beforeend', Elements.navigation({ active: 'home' }));

    container.insertAdjacentHTML('beforeend', '<script src="https://www.gstatic.com/firebasejs/8.2.1/firebase-app.js"></script>');
    container.appendChild(main);

    return container;
  }
}

export default Scanner;
