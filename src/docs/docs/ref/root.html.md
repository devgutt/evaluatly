```INI META
includes = docs/index.html.md menu menuTop
title = Root
base = docs.html
slug = root
```

```MD SUBMENU

- [Initializing variables](#variables)
- [Example](#example)

```

```MD BODY

The root element of a story.

### Attributes

**`hash`**  

Unique story identifier.

**`story`**   

The elements of the [story](/docs/ref/story.html).

**`theme`**    

The [style](/docs/ref/theme.html) of the story.

**`data`** _optional_

Initial filling of variables. See more in [Initializing variables](#init-var) bellow.

### Example

```JSON
{
    "hash": "story_hash",
    "story": {
        "info": {
            "id": "story_1",
            "title": "The Story"
        },
        "pages": [
            {
                "page_id": "page_start",
                "items": [
                    { "type": "title", "value": "The Story" },
                    { "type": "p", "value": "Now this is the story all about how..." },
                    { "type": "button", "label": "Next", "program": {"next_page": true} }
                ]
            },
            {
                "page_id": "page_end",
                "items": [
                    { "type": "title", "value": "The end" }
                ]
            }
        ]
    },
     "theme": {
        "page": {
            "font-family": "google:Roboto",
            "font-size": "20px",
            "background-color": "#f5f1ed"
        },
        "content": {
            "align-items": "center",
            "text-align": "center",
            "justify-content": "center"
        },
            "button": {
            "background-color": "#ff5555",
            "color": "#ffffff"
        },
        "button:hover": {
            "background-color": "#ffeeee",
            "color": "#ff5555"
        }
    }  
}
```

## [](#variables) {#variables} Initializing variables

Initial filling of variables, in key-value format. 

If the value entered is a literal, a variable will be created and the `value` property will be filled with the value.

If the value entered is a key-value object, the key is the name of the property where the value will be filled.

### Example

```JSON
{
    ...
    "data": {
        "name": "Initial name", 
        "score": {
            "label": "Score",
            "value": 42
        }
    }
    ...
}

```

```
