(function init() {

    const state = {
        editor: null,
        preview: null,
        edited: false
    }

    const c = id => document.getElementById(id);

    const
        container = c('container'),
        preview = c('preview'),
        docs = c('docs'),
        msg = c('msg'),
        linkDownload = c('linkDownload'),
        btnBack = c('btnBack'),
        btnDocs = c('btnDocs'),
        ftnCode = c('ftnCode'),
        ftnPreview = c('ftnPreview'),
        ftnDocs = c('ftnDocs'),
        title = c('title'),
        editor = c('editor');

    function App() {

        initElements();

        state.editor = initEditor();
        state.preview = initPreview();

        const q = new URLSearchParams(window.location.search);
        const url = q.get('d');

        fetch(url)
            .then(res => {
                return res.text();
            })
            .then(data => {
                initialLoadEditor(data);
                container.style.visibility = 'visible';
                container.style.opacity = '1';
            }).catch(e => {
                console.error(e);
                showMsg('error', 'Error loading story data');
            });
    }

    function initElements() {

        let downloadUrl;

        linkDownload.addEventListener('click', e => {

            if (!hasErrors()) {

                var data = new Blob([state.editor.getValue()], {type: 'application/json'});

                if (downloadUrl) {
                    window.URL.revokeObjectURL(downloadUrl);
                }
                downloadUrl = window.URL.createObjectURL(data);
        
                e.target.href = downloadUrl;

                state.edited = false;
            } else {
                showMsg('error', "Fix the errors before download", 3000);
                e.preventDefault();
            }

        });

        btnBack.addEventListener('click', e => {
            e.preventDefault();
            history.back();
        });
        
        btnDocs.addEventListener('click', e => {
            e.preventDefault();
            if (docs.style.display === 'none') {
                docs.style.display = 'block';
            } else {
                docs.style.display = 'none';
            }
        });
        btnDocs.addEventListener('mousedown', e => e.preventDefault());

        const ftnShow = s => {
            preview.style.display = s === 'preview' ? 'block' : 'none';
            docs.style.display = s === 'docs' ? 'block' : 'none';
        }

        ftnCode.addEventListener('click', () => ftnShow('main'));
        ftnPreview.addEventListener('click', () => ftnShow('preview'));
        ftnDocs.addEventListener('click', () => ftnShow('docs'));

        ftnCode.addEventListener('mousedown', e => e.preventDefault());
        ftnPreview.addEventListener('mousedown', e => e.preventDefault());
        ftnDocs.addEventListener('mousedown', e => e.preventDefault());

        window.addEventListener("beforeunload", e => {
            if (state.edited) {
                e.preventDefault();
                e.returnValue = '';
            } else {
                delete e['returnValue'];
            }
        });

    }

    function showMsg(type, text, timer) {
        msg.className = type;
        const txt = msg.getElementsByTagName('div')[0];
        txt.textContent = text;

        msg.style.display = 'block';
        if (timer) {
            setTimeout(() => {
                msg.style.display = 'none';
            }, timer);
        }
    }

    function hasErrors() {
        const e = state.editor.session.getAnnotations();
        for (let i = 0; i < e.length; i++) {
            if (e[i].type === 'error') {
                return true;
            }
        }
        return false;
    }

    function updateTitle(text) {
        title.textContent = text;
    }

    function initialLoadEditor(data) {

        state.editor.session.setValue(data);
        updatePreview(data);

        let timer = null;
        state.editor.session.on('change', () => {
            if (timer !== null) {
                clearTimeout(timer);
            }
            timer = setTimeout(() => {
                const d = state.editor.getValue();
                updatePreview(d);
                state.edited = true;
                timer = null;
            }, 300);
        });
    }

    function updatePreview(data) {
        try {
            const j = JSON.parse(data);
            state.preview.load(j);
        } catch (e) {
            //ignore
        }
    }

    function initEditor() {

        const ed = window.ace.edit(editor);
        ed.setTheme("ace/theme/eclipse");
        ed.session.setMode("ace/mode/json");

        ed.setOptions({
            scrollPastEnd: 0.1,
            showPrintMargin: false
        });

        return ed;
    }

    function initPreview() {

        const evaluatly = window.Evaluatly;

        let clean = true;
        return {
            load: data => {
                updateTitle(data.story.title);
                evaluatly.loadVar(data, {
                    containerId: 'preview',
                    cleanData: clean
                });
                clean = false;
            }
        }
    }

    App();

})();
