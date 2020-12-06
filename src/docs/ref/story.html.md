```INI META
includes = index.html.md menu menuTop
title = Story
base = docs.html
slug = story
```

```MD BODY

Story element that contains a set of [pages](/docs/ref/page.html).

### Attributes

#### `info`

Information attributes:

**`id`**  _optional_

Story Id.

**`title`**  _optional_ 

Story title.


**`lang`**  _optional_   

Language code of the story.


####  `env`
    
Environment attributes:

**`back_label`**  _optional_   

The label of the back button.

#### `brand` _optional_

Brand attributes:

**`show`**  

Show or hide the brand. The default is `true`.

**`txt`**  

Text of the brand. Defaults to Evaluatly's brand.

Accepts [text formatting and variables](/docs/ref/text.html).

#### `logo` _optional_

Logo attributes:

**`img`**  

The URL of the logo image.

Images can be of the type JPEG, GIF, PNG, SVG, ICO, and BMP.

**`program`**  _optional_

One or more [commands](/docs/ref/commands.html) to be executed when the logo is clicked.

**`width`** _optional_

Width of the logo.

**`height`** _optional_

Height of the image.

**`alt`**  _optional_

Text description of the logo image.

**`style`** _optional_

Style to be applied to the logo as CSS key-value pairs. 

The values can be a literal value or a single [command](/docs/ref/commands.html) call returning a literal value.

> Use the `show_logo` [page attribute](/docs/ref/page.html) to control the display of the logo on a specific page.

#### `progress` _optional_

Progress bar attributes:

**`show`**  

Indicates whether or not to show the progress bar on the pages. Defaults to `false`.

**`qtd`** _optional_ 

The quantity used to evaluate the progress. Defaults to the number of pages.

#### `pages`

List of [pages](/docs/ref/page.html) of the story.

### Example

```JSON
{
    "info": {
        "id": "story_1",
        "title": "The Story",
        "lang": "en"
    },
    "logo": {
        "img" : "/img/logo.png",
        "program": {"jump_page": "page_start"},
        "width": "100px"
    },
    "env": {
        "back_label": "Back"
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
}
```

```