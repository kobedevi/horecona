/*
 * register component
 */

import 'regenerator-runtime/runtime';

import firebase from 'firebase/app';
import 'firebase/firestore';

import Elements from '../lib/Elements';
import Scannerlib from '../lib/Scanner';
import Component from '../lib/Component';
import User from '../lib/User';

class Scanner extends Component {
  constructor() {
    super({
      name: 'Scanner',
      model: {
      },
      routerPath: '/scanner',
    });
    this.userLoaded = false;
  }

  // start up scanner
  async scannerData(main) {
    await Scannerlib.scanner()
      .then(async (message) => {
        // pass data if something is scanned
        await this.getCorrectBusiness(main, message);
      });
  }

  // look for business when code is scanned
  async getCorrectBusiness(main, name) {
    const textContainer = document.createElement('div');
    textContainer.id = 'text';
    const text = document.createElement('h3');
    textContainer.appendChild(text);
    main.appendChild(textContainer);

    // check firebase for business
    const db = firebase.firestore();
    await db.collection('registeredBusinesses').where('name', '==', name).get()
      .then(async (data) => {
        // if no registeredBusiness is found, let the user retry
        if (data.docs[0] === undefined) {
          text.innerHTML = 'Woops, that didn\'t work...';
          textContainer.appendChild(Elements.submitButton({
            textContent: 'Try again',
            onClick: () => {
              window.location.reload();
            },
            classes: ['small_gradient_button'],
          }));
          return null;
        }
        // otherwise show scanned business
        text.innerHTML = `You scanned "${name}",<br> is that correct?`;
        const row = document.createElement('div');
        row.classList.add('row');
        textContainer.appendChild(row);
        // checkin button
        row.appendChild(Elements.submitButton({
          textContent: 'Check-in',
          onClick: async () => {
            if (!this.userLoaded) {
              const tempUser = new User();
              await tempUser.getThisUser()
                .then(async (userData) => {
                  await tempUser.checkin(userData, name);
                });
            }
          },
          classes: ['small_gradient_button', 'col-6'],
        }));
        // cancel button
        row.appendChild(Elements.submitButton({
          textContent: 'cancel',
          onClick: () => {
            window.location.replace('/dashboard');
          },
          classes: ['small_gradient_button', 'outline', 'col-6'],
        }));
        return data.docs[0].id;
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
    this.scannerData(main);

    main.insertAdjacentHTML('beforeend', Elements.navigation({
      active: 'home',
    }));

    container.insertAdjacentHTML('beforeend', '<script src="https://www.gstatic.com/firebasejs/8.2.1/firebase-app.js"></script>');
    container.appendChild(main);

    return container;
  }
}

export default Scanner;
