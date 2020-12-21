/*
* Home component
*/

import Component from "../lib/Component";
import Elements from "../lib/Elements";

class HomeComponent extends Component {
    constructor(){
        super({
            name: 'home',
            // model: null
        })
    }

    render(){
        // create a home container
        const homeContainer = document.querySelector('body');
        // header
        homeContainer.insertAdjacentHTML("beforeend", Elements.createHeader({
            size:2,
        }));

        // title
        const main = document.createElement('main');
        main.insertAdjacentHTML("beforeend", Elements.title({textContent: 'Stay safe<br/>with Horecona'}));
        // subtitle
        main.insertAdjacentHTML('beforeend', Elements.subtitle({textContent: 'Find businesses that are corona proof <br>around you!'}))
        // button
        main.insertAdjacentHTML("beforeend", Elements.buttonLink({href:"#", textContent:"Get Started"}));
        homeContainer.appendChild(main);
        return homeContainer;
    }
}

export default HomeComponent;
