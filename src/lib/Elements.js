const Handlebars = require("handlebars");

import smallHeader from '../views/templates/smallHeader';
import bigHeader from '../views/templates/bigHeader';
import loginForm from '../views/templates/loginForm';
import registerForm from '../views/templates/registerForm';

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

    form({type="login"}) {
        let form;
        if(type==="login") {
            const template = Handlebars.compile(loginForm);
            form = template();
        } else {
            console.log('register');
            const template = Handlebars.compile(registerForm);
            form = template();
        }
        return form;
    },

    submitButton({textContent= 'sample text', onClick= null, classes=[]}) {
        const button = document.createElement('input');
        button.type = "submit";
        button.value = textContent;
        classes.forEach(curClass => {
            button.classList.add(curClass);
        });

        if(onClick) button.addEventListener('click', (e) => { 
            e.preventDefault();
            onClick(); 
        });
        return button;
    }
}

export default Elements;