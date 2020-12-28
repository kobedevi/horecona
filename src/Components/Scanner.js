/*
* register component
*/

import 'regenerator-runtime/runtime';

import Elements from '../lib/Elements';
import Scannerlib from '../lib/Scanner';
import Component from '../lib/Component';

class Scanner extends Component {
  constructor() {
    super({
      name: 'Scanner',
      model: {
        camera: null,
      },
      routerPath: '/scanner',
    });
    this.scannerLoaded = false;
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
    reader.addEventListener('load', Scannerlib.scanner());
    const text = document.createElement('p');
    text.id = 'text';
    main.appendChild(text);

    main.insertAdjacentHTML('beforeend', Elements.navigation({ active: 'home' }));

    container.insertAdjacentHTML('beforeend', '<script src="https://www.gstatic.com/firebasejs/8.2.1/firebase-app.js"></script>');
    container.appendChild(main);

    return container;
  }
}

export default Scanner;
