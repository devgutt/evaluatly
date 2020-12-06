
export default function story(data) {

    if (data.base) {
        fetch(data.base)
        .then(res => res.json())
        .then(d => {
            loadEvaluatly({ ...d, theme: data.theme });
        })
    } else {
        loadEvaluatly(data);
    }

}

function loadEvaluatly(data) {
    loadScript("https://evaluatly.com/dist/evaluatly-1.0.1.js", () => Evaluatly.loadVar(data));
}

function loadScript(url, onload) {
    const script = document.createElement('script');
    script.type = 'text/javascript';
    script.async = true;
    document.head.appendChild(script);
    script.onload = onload;
    script.src = url;
}
