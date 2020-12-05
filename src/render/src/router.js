import { el } from "wdr-render-basic";

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

    el.append(document.head, [
        el.create('meta', {charset: "utf-8"}),
        el.create('meta', {name: "viewport", content: "width=device-width", 'initial-scale': 1}),
        el.create('title', {}, title)
    ]);

    const e = el.create('link', {rel: "stylesheet", href: '/css/main.css'});
    if (fn) {
        e.onload = fn;
    }
    el.append(document.head, e);
}


