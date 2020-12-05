import header, { setupNav } from "./header";
import footer from "./footer";

export default function homepage(data) {
    document.body.innerHTML = body(data);
    setupNav();
}

function body(data) {
    return `
    ${header(data.nav)}
    <section id="hero">
        <div class="content">
            <div class="info">
                <div>
                    <h1>${ data.hero.title }</h1>
                    <p>${data.hero.description} <strong>${data.hero.call}</strong></p>
                    <div class="action">
                    <a class="demo" href="${data.hero.actions.demo.url}">${data.hero.actions.demo.label}<span>⚡️</span></a>
                    <a class="start" href="${data.hero.actions.start.url}">${data.hero.actions.start.label}</a>
                    </div>
                </div>
            </div>
        </div>
    </section>
    <section id="features">
        ${data.features.map(item => `
        <div class="feature ${item.key}">
            <div class="content">
                <div class="info">
                <div>
                    <h2>${item.title}</h2>
                    <span class="line"></span>
                    ${item.list.map(info => `<p>${info}</p>`).join("")}
                </div>
                </div>
                <div class="media">
                <video autoplay="" loop="" muted="true" playsinline="">
                    <source src="${item.media}" type="video/mp4">
                </video>
                </div>
            </div>
        </div>
        `).join("")}
    </section>
    <section id="code">
        <div class="content">
            <div class="info">
                <div>
                <h2>${data.code.title}</h2>
                <div class="list">
                    ${data.code.list.map(item => `<p>${item}</p>`).join("")}
                </div>
                <div class="try">
                    <a href="/try.html?d=/data/try.json">Try it!</a>
                </div>
                </div>
            </div>
            <div class="media">
                <div>
                <img src="${data.code.img}" />
                </div>
            </div>
        </div>
    </section>
    <section id="free">
        <h2>${data.free.title}</h2>
        <p>${data.free.description}</p>
        <a href="${data.free.action.url}" class="btn">${data.free.action.title}</a>
    </section>
    ${footer(data.footer)}
    `;
}
