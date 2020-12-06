```INI META
title = Getting Started
base = docs.html
slug = start

includes = start.html.md BODY SUBMENU

```

```JSON menuTop
[
    { "label": "Getting Started", "url": "/docs" },
    { "label": "Reference", "url": "/docs/ref" }
]
```

```JSON menu
[
    { "label": "Getting Started", "url": "/docs", "slug": "start" },
    { "label": "Reference", "url": "/docs/ref", "slug": "ref", 
        "submenu": [
            { "label": "Root", "url": "/docs/ref/root.html", "slug": "root" },
            { "label": "Story", "url": "/docs/ref/story.html", "slug": "story" },
            { "label": "Page", "url": "/docs/ref/page.html", "slug": "page" },
            { "label": "Items", "url": "/docs/ref/items.html", "slug": "items" },
            { "label": "Commands", "url": "/docs/ref/commands.html", "slug": "commands" },
            { "label": "Text", "url": "/docs/ref/text.html", "slug": "text" },
            { "label": "Theme", "url": "/docs/ref/theme.html", "slug": "theme" }
    ] },
    { "label": "GitHub", "url": "https://github.com/evaluatly/evaluatly-js" }

]
```
