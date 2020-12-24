/* eslint-disable no-param-reassign */

/*
* the component parent
*/

class Component {
  constructor({ name, model, routerPath }) {
    this.name = name;
    this.props = null;
    this.model = this.proxyModel(model);
    this.routerPath = routerPath;
    this.reRender = null;
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
