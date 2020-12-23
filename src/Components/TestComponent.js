/*
* register component
*/

import 'regenerator-runtime/runtime';
import 'firebase/firestore';
import 'firebase/auth';

import Component from '../lib/Component';
import Elements from '../lib/Elements';

class TestComponent extends Component {
  constructor() {
    super({
      name: 'tester',
      model: {
        tester: null,
      },
      routerPath: '/tester',
    });
  }

  render() {
    // create a home container
    const homeContainer = document.createElement('section');
    homeContainer.classList.add('pageContainer');
    // header
    homeContainer.insertAdjacentHTML('beforeend', Elements.createHeader({
      size: 1,
      title: 'Test page',
      subtitle: 'Remove this',
    }));

    // title
    const main = document.createElement('main');
    main.insertAdjacentHTML('beforeend', Elements.title({ textContent: 'Redirect here to test if things work' }));
    // subtitle
    main.insertAdjacentHTML('beforeend', Elements.subtitle({ textContent: 'Find businesses that are corona proof <br>around you!' }));
    // button
    main.insertAdjacentHTML('beforeend', Elements.buttonLink({ href: '/login', textContent: 'Get Started' }));
    homeContainer.appendChild(main);
    return homeContainer;
  }
}

export default TestComponent;
