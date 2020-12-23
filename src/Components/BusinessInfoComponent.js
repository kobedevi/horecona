/*
* register component
*/

import 'regenerator-runtime/runtime';

import Elements from '../lib/Elements';
import Component from '../lib/Component';
import Business from '../lib/Business';

class BusinessInfoComponent extends Component {
  constructor() {
    super({
      name: 'businessInfo',
      model: {
        businessinfo: null,
      },
      routerPath: '/businessInfo',
    });
    this.user = null;
  }

  async saveData() {
    const formData = new FormData(document.querySelector('form'));
    const tempUser = new Business();
    await tempUser.getThisUser()
      .then(() => {
        tempUser.aditionalInfo(formData);
      });
  }

  apiGetter() {
    return new Promise((resolve) => {
      const url = 'https://data.stad.gent/api/records/1.0/search/?dataset=koop-lokaal-horeca&q=&rows=500&facet=postcode&facet=gemeente&refine.postcode=9000';

      fetch(url)
        .then((data) => data.json())
        .then((data) => resolve(data));
    });
  }

  async getBusinesses() {
    const demoArray = await this.apiGetter();

    const select = document.createElement('select');
    select.setAttribute('name', 'business');

    demoArray.forEach((element) => {
      const option = document.createElement('option');
      option.setAttribute('value', element.name);
      option.innerHTML = element.name;
      select.appendChild(option);
    });

    return select;
  }

  render() {
    // create a container
    const container = document.createElement('section');
    container.classList.add('pageContainer');

    // header
    container.insertAdjacentHTML('beforeend', Elements.createHeader({
      size: 1,
      title: 'Business info',
      subtitle: 'Tell us a little about your business',
    }));

    const main = document.createElement('main');
    // form
    const form = document.createElement('form');

    const div = document.createElement('div');
    div.classList.add('together');
    const select = this.getBusinesses();
    div.appendChild(select);
    form.appendChild(div);

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

    return container;
  }
}

export default BusinessInfoComponent;
