import textFormatting from "wdr-render-basic/src/TextFormatting"

export default function footer(foot) {
    return `
    <footer id="footer">
        <div class="lnk">
            <div class="logo">
                <div>
                    <a href="/evaluatly"><img src="${foot.logo}"/></a>
                </div>
            </div>
            ${foot.nav.map(item => `
            <div class="section">
                <h3>${item.title}</h3>
                ${item.links.map(link => `<div><a href="${link.url}">${link.label}</a></div>`).join("")}
            </div>
            `).join("")}
        </div>
        <div class="cop">
            <div>
                <div>© 2020&ndash; Evaluatly</div>
                <div>Created by <strong>${textFormatting(foot.creator)}</strong></div>
            </div>
        </div>
    </footer> 
    `;
}
