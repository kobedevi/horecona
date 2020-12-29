/*
* register component
*/

import 'regenerator-runtime/runtime';

import firebase from 'firebase/app';
import 'firebase/firestore';

import Elements from '../lib/Elements';
import Component from '../lib/Component';
import QRCreator from '../lib/CreateQR';
import Business from '../lib/Business';

class Generate extends Component {
  constructor() {
    super({
      name: 'generate',
      model: {
        business: null,
      },
      routerPath: '/generate',
    });
    this.businessLoaded = false;
  }

  async getUserData() {
    if (!this.userLoaded) {
      const tempUser = new Business();
      await tempUser.getThisUser2()
        .then((data) => {
          this.model.business = data;
          this.businessLoaded = true;
        });
    }
  }

  async getCorrectBusiness() {
    const db = firebase.firestore();
    await db.collection('users').where('uid', '==', this.model.business.uid).doc(this.model.business.docid).get()
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
    const main = document.createElement('main');
    const div = document.createElement('div');
    div.id = 'qrcode';

    if (!this.model.business) {
      this.getUserData();
    } else {
      console.log(this.model.business);
      main.appendChild(div);
      console.log(`${window.location.protocol}//${window.location.host}/${this.model.business.name}`);
      QRCreator.qr(div, this.model.business.name);
      const businessName = document.createElement('h1');
      businessName.innerHTML = this.model.business.name;
      main.appendChild(businessName);
    }
    // header
    container.insertAdjacentHTML('beforeend', Elements.createHeader({
      size: 1,
      title: 'QR-code',
      subtitle: 'Generates a QR-code for people to check in with',
    }));
    main.insertAdjacentHTML('beforeend', Elements.navigation({ active: 'home' }));

    container.insertAdjacentHTML('beforeend', '<script src="https://www.gstatic.com/firebasejs/8.2.1/firebase-app.js"></script>');
    container.appendChild(main);

    return container;
  }
}

export default Generate;
