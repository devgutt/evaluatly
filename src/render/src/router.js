import { appendElement, createElement } from "wdr-render-basic";

import homepage from './homepage';
import legal from './legal';
import story from "./story";

export function router(data) {
    load(data.title, () => {

        switch (data.id) {
            case 'home':
                homepage(data);
                break;
            case 'terms':
            case 'privacy':
                legal(data);
                break;
            case 'features':
            case 'code':
            case 'psy':
            case 'contact':
                story(data);
                break;
            default:

            //TODO PAGE NOT FOUND
                break;
        }
        
    });

}

function load(title, fn) {

    appendElement(document.head, [
        createElement('meta', {charset: "utf-8"}),
        createElement('meta', {name: "viewport", content: "width=device-width", 'initial-scale': 1}),
        createElement('title', {}, title)
    ]);

    const e = createElement('link', {rel: "stylesheet", href: '/evaluatly/css/main.css'});
    if (fn) {
        e.onload = fn;
    }
    appendElement(document.head, e);
}


