import { textFormatting } from 'wdr-render-basic';
import footer from './footer';
import header, { setupNav } from './header';

export default function legal(data) {
    fetch('/')
    .then(res => res.json())
    .then(dataHome => {
        document.body.innerHTML = body(data, dataHome);
        setupNav();
    })
}

function body(data, dataHome) {
    return `
    ${header(dataHome.nav)}
    <hr>
    <div class="read">
        <h1>${data.title}</h1>
        <p>Last Update: <strong>${data.last_update}</strong></p>
        ${data.content.map(item => `<p>${textFormatting(item)}</p>`).join("")}
    </div>
    ${footer(dataHome.footer)}
    `;
}
