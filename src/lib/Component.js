/* eslint-disable no-param-reassign */

/*
* the component parent
*/

class Component {
  constructor({ name, model, routerPath }) {
    this.name = name;
    this.model = this.proxyModel(model);
    this.reRender = null;
    this.routerPath = routerPath;
  }

  proxyModel(model) {
    return new Proxy(model, {
      set: (obj, prop, value) => {
        obj[prop] = value;
        if (this.reRender) this.reRender();
        return true;
      },
    });
  }
}

export default Component;
