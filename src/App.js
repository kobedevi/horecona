/*
* App wrapper
*/

import Component from "./lib/Component";
import Router from './Router';

class App {
    constructor(parent){
        this.parent = parent;
        this.components = [];
    }

    clearParent(){
        while(this.parent.firstChild){
            this.parent.removeChild(this.parent.lastChild);
        }
    }

    addComponent(component) {
        if(!(component instanceof Component)) return;
        // when a component asks to rerender
        component.reRender = () => this.showComponent(component);
        this.components.push(component);

        // add to router
        Router.getRouter().on(component.routerPath, () => {
            this.showComponent(component.name);
        }).resolve();
    }

    showComponent(name){
        const foundComponent = this.components.find((curComp) => curComp.name === name);
        if(!foundComponent) return;
        this.clearParent();
        this.parent.appendChild(foundComponent.render());
    }
}

export default App;
