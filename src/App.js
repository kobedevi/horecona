/*
* App wrapper
*/

import Component from "./lib/Component";

class App {
    constructor(parent){
        this.parent = parent;
    }

    showComponent(component){
        this.parent.appendChild(component.render());
    }
}

export default App;
