```INI META
includes = index.html.md menu menuTop
title = Theme
base = docs.html
slug = theme
```

```MD BODY

Style to be applied per item type as CSS key-value pairs. 

Item                        | Description
:---                        | :---
`page`                      | Style to be applied on the [`page`](/docs/ref/page.html).
`content`                   | Style to be applied to the content of the page.
`title`                     | Style to be applied on [`title`](/docs/ref/items.html#title) items.
`subtitle`                  | Style to be applied on [`subtitle`](/docs/ref/items.html#subtitle) items.
`question`                  | Style to be applied on [`question`](/docs/ref/items.html#question) items.
`p`                         | Style to be applied on [`p`](/docs/ref/items.html#p) items.
`code`                      | Style to be applied on [`code`](/docs/ref/items.html#code) items.
`image`                     | Style to be applied on [`image`](/docs/ref/items.html#image) items.
`line`                      | Style to be applied on [`line`](/docs/ref/items.html#line) items.
`space`                     | Style to be applied on [`space`](/docs/ref/items.html#space) items.
`embed`                     | Style to be applied on [`embed`](/docs/ref/items.html#embed) items.
`link`                      | Style to be applied on [`link`](/docs/ref/items.html#link) items.<br>You can use pseudo classes like `:hover`.
`button`                    | Style to be applied on [`button`](/docs/ref/items.html#button) items.<br>You can use  pseudo classes like `:hover` and `:disabled`.
`progress`                  | Style to be applied on the progress bar of the page.
`alert`                     | Style to be applied on the alert box of the page.


**`font-family`**   

You can use a system font directly or prefix the font with 'google:' to use a [Google font](https://fonts.google.com/).

#### Forms

Item                        | Description
:---                        | :---
`form.inputs`               | Style to be applied to the **container** of the [`input`](/docs/ref/items.html#inputs) item.
`form .input`               | Style to be applied on [`input`](/docs/ref/items.html#inputs) items.
`form .textarea`            | Style to be applied on [`textlong`](/docs/ref/items.html#inputs) items.
`form .checks`              | Style to be applied on [`check`](/docs/ref/items.html#check) items.
`form .radios`              | Style to be applied on [`radio`](/docs/ref/items.html#radio) items.
`form .option`                  | Style to be applied to the options of `check` and `radio` items.<br>You can use pseudo classes like `:hover`.    
`form .option_container`        | Style to be applied to the **container** of the `option`.

For pages with single elements (`input_submit` = true), you can use `form_submit` instead of `form` to style the items. See more on [Submitting forms](/docs/ref/page.html#submit).

#### Example

```JSON
{
    "page": {
        "font-family": "google:Lato",
        "font-size": "20px",
        "color": "#4b3f32",
        "background-color": "#f5f1ed"
    },
    "content": {
        "align-items": "center",
        "text-align": "center",
        "justify-content": "center"
    },
    "title": {
        "color" : "#000000"
    },
    "subtitle": {
        "color" : "#000000"
    },
    "question": {
        "color" : "#000000"
    },
    "button": {
        "background-color": "#f1574b",
        "color": "#ffffff",
        "border-radius" : "100px",
        "border-width" : "3px"
    },
    "button:hover": {
        "background-color": "#ffffff",
        "color": "#f1574b"
    },
    "link": {
        "color": "#f1574b"
    },
    "form_submit.inputs": {
        "background-color": "#fff"
    },
    "form_submit .input": {
        "color": "#000"
    },
    "form .option:hover": {
        "color": "#3e306e"
    },
    "form_submit .option:hover": {
        "color": "#3e306e"
    }
}
```

```

