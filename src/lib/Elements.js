const Handlebars = require("handlebars");

import smallHeader from '../views/templates/smallHeader';
import bigHeader from '../views/templates/bigHeader';

const  Elements = {
    createHeader({size=1, title="Title", subtitle=""}) {
        if(size<1 || size>2) return;
        let header;
        if(size == 1){
            const headerData = {
                title: title,
                subtitle: subtitle,
            }
            const template = Handlebars.compile(smallHeader);
            header = template({headerData});
        } else {
            const template = Handlebars.compile(bigHeader);
            header = template();
        }
        return header;
    },

    title({textContent='This is a title'}){
        return `<h1>${textContent}</h1>`;
    },

    subtitle({textContent='This is a title'}){
        return `<p>${textContent}</p>`;
    },

    buttonLink({textContent='This is your button', href="#", target="_self"}) {
        return `<a href="${href}" target="${target}" class="small_gradient_button">${textContent}</a>`
    },
}

export default Elements;