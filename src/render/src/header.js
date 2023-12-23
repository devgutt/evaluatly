
export default function header(nav) {
    return `
    <header class="header">
        <div>
            <div><a href="/evaluatly"><img class="logo" src="${nav.logo}"/></a></div>
            <div class="middle"></div>
            <div class="nav">
                <ul class="list">
                    ${nav.links.map(link => `<li><a href="${link.url}">${link.label}</a></li>`).join("")}
                </ul>
                <a href="#" class="hamburger">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#1A202C" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <line x1="21" y1="10" x2="3" y2="10"></line><line x1="21" y1="6" x2="3" y2="6"></line><line x1="21" y1="14" x2="3" y2="14"></line><line x1="21" y1="18" x2="3" y2="18"></line>
                </svg>
                </a>
            </div>
        </div>
    </header>
    `;
}

export function setupNav() {
    const nav = document.getElementsByClassName("nav");
    for (let i = 0; i < nav.length; i++) {
        const n = nav[i];
        const l = n.getElementsByClassName("list")[0];
        const h = n.getElementsByClassName("hamburger")[0];
        h.addEventListener('click', function (e) {
            e.preventDefault();
            const pos = h.offsetHeight + h.offsetTop;
            l.style.top = pos + "px";
            l.style.visibility = !l.style.visibility ? 'visible' : '';
        });
    }
}
