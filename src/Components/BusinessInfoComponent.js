/*
* register component
*/

import 'regenerator-runtime/runtime';

import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

import Elements from '../lib/Elements';
import Component from '../lib/Component';
import Business from '../lib/Business';
import Businesses from '../lib/Businesses';

class BusinessInfoComponent extends Component {
  constructor() {
    super({
      name: 'businessInfo',
      model: {
        businesses: null,
        profileInfo: null,
      },
      routerPath: '/businessInfo',
    });
    this.businessLoaded = false;
    this.isAnUpdate = null;
  }

  // get an array of non registered businesses
  async loadBusinesses() {
    if (!this.businessLoaded) {
      await Businesses.getNonRegistered()
        .then((data) => {
          this.model.businesses = data;
        });
      this.businessLoaded = true;
    }
  }

  // save the data
  async saveData() {
    const formData = new FormData(document.querySelector('form'));
    const tempUser = new Business(this.model.profileInfo, 'Business');
    tempUser.additionalInfo(formData);
  }

  // checks if user info already exists
  async isUpdate() {
    const db = firebase.firestore();
    let result;
    const tempBusiness = new Business();
    await tempBusiness.getThisUser()
      .then(async (user) => {
        db.collection('users').where('uid', '==', user.user).get()
          .then(async (docRef) => {
            result = await db.collection('users').doc(docRef.docs[0].id).collection('info').get();
            // only load businesses select option if no info exists
            if (result.docs[0] === undefined) {
              await this.loadBusinesses()
                .then(() => {
                  this.isAnUpdate = false;
                  this.model.profileInfo = user;
                });
            } else {
              this.isAnUpdate = true;
              this.model.profileInfo = user;
            }
          });
      });
  }

  render() {
    // create a container
    const container = document.createElement('section');
    container.classList.add('pageContainer');

    const form = document.createElement('form');

    // check if this is an update or not
    if (!this.model.businesses && this.isAnUpdate === null) {
      this.isUpdate();
      // if known -> render form
    } else if (this.isAnUpdate === true || this.isAnUpdate === false) {
      // if it's not an update create a select menu
      if (this.isAnUpdate === false) {
        // create select menu
        const div = document.createElement('div');
        div.classList.add('together');
        const select = document.createElement('select');
        select.setAttribute('name', 'businessName');
        // for each object in businesses model
        // eslint-disable-next-line no-restricted-syntax
        for (const [, value] of Object.entries(this.model.businesses)) {
          // create an option
          const option = document.createElement('option');
          option.setAttribute('value', value.name);
          option.innerHTML = value.name;
          // append to select
          select.appendChild(option);
        }
        div.appendChild(select);
        const label = document.createElement('label');
        label.setAttribute('for', 'businessName');
        label.innerHTML = 'Business name';
        const required = document.createElement('span');
        required.innerHTML = '*';
        label.appendChild(required);
        div.appendChild(label);
        form.appendChild(div);
      }

      // header
      container.insertAdjacentHTML('beforeend', Elements.createHeader({
        size: 1,
        title: 'Business info',
        subtitle: 'Tell us a little about your business',
      }));

      const main = document.createElement('main');
      // form

      form.insertAdjacentHTML('beforeend', Elements.form({
        type: 'businessInfo',
      }));

      form.addEventListener('submit', (e) => {
        e.preventDefault();
      });

      const saveBtn = Elements.submitButton2({
        textContent: 'Save',
        onClick: this.saveData.bind(this),
        classes: ['small_gradient_button', 'col-12'],
      });

      form.appendChild(saveBtn);
      main.appendChild(form);
      container.insertAdjacentHTML('beforeend', '<script src="https://www.gstatic.com/firebasejs/8.2.1/firebase-app.js"></script>');
      container.appendChild(main);
    }

    if (container.innerHTML === '') {
      container.innerHTML = '<p>Loading...</p>';
    }

    return container;
  }
}

export default BusinessInfoComponent;
