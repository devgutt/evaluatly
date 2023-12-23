```INI META
includes = index.html.md menu menuTop
title = Items
base = docs.html
slug = items
```

```MD SUBMENU

- [Display](#display)
- [Forms](#forms)
- [Logic](#logic)
- [Payment](#payment)

```

```MD BODY

The items are organized into the following categories:

## [#](#display) {#display} Display {.group}

Items for displaying information.

Item                        | Description
:---                        | :---
[`title`](#title)           | Creates a title item.
[`subtitle`](#subtitle)     | Creates a subtitle item.
[`question`](#question)     | Creates a question item.
[`p`](#p)                   | Creates one or more paragraph items.
[`code`](#code)             | Creates a code item.
[`image`](#image)           | Creates an image item.
[`link`](#link)             | Action link.
[`line`](#line)             | Creates a separator line item.
[`space`](#space)           | Creates a space separator item.
[`section`](#section)       | Creates an section item.
[`embed`](#embed)           | Creates an embedded item.


### [#](#title) {#title} `title` {.group}

Creates a title item.

#### Attributes

**`type`**   

_title_

**`value`**   

Title text.

Accepts [text formatting and variables](/docs/ref/text.html).

**`style`** _optional_

Style to be applied to the item as CSS key-value pairs. 

The values can be a literal value or a single [command](/docs/ref/commands.html) call returning a literal value.

#### Examples

```JSON
{ "type": "title", "value": "This is a title" }
```

----------------------------------------------------------------------

### [#](#subtitle) {#subtitle} `subtitle` {.group}

Creates a subtitle item.

#### Attributes

**`type`**   

_subtitle_

**`value`**   

Subtitle text. 

Accepts [text formatting and variables](/docs/ref/text.html).

**`style`** _optional_

Style to be applied to the item as CSS key-value pairs. 

The values can be a literal value or a single [command](/docs/ref/commands.html) call returning a literal value.

#### Example

```JSON
{ "type": "subtitle", "value": "This is a subtitle" }
```

----------------------------------------------------------------------

### [#](#question) {#question} `question` {.group}

Creates a question item.

#### Attributes

**`type`** 

_question_

**`value`**   

Subtitle text. 

Accepts [text formatting and variables](/docs/ref/text.html).

**`style`** _optional_

Style to be applied to the item as CSS key-value pairs. 

The values can be a literal value or a single [command](/docs/ref/commands.html) call returning a literal value.

#### Examples

```JSON
{ "type": "question", "value": "Is that a question?" }
```

----------------------------------------------------------------------

### [#](#p) {#p} `p` {.group}

Creates one or more paragraph items.

#### Attributes

**`type`** 

_p_

**`value`** 

Paragraph text or list of text. 

Accepts [text formatting and variables](/docs/ref/text.html).

**`style`** _optional_

Style to be applied to the item as CSS key-value pairs. 

The values can be a literal value or a single [command](/docs/ref/commands.html) call returning a literal value.

#### Examples

```JSON
{ "type": "p", "value": "This is a paragraph" }
```

Example with list of texts:
```JSON
{ "type": "p", "value": [
    "This is a paragraph",
    "This is another paragraph"
]}
```

Example with [text formatting and variables](/docs/ref/text.html):

```JSON
{ "type": "p", "value": "Your name is {{name}}" }
```

----------------------------------------------------------------------

### [#](#code) {#code} `code` {.group}

Creates a code item.

#### Attributes

**`type`**   

_code_

**`value`**   

Code text. 

Accepts [text formatting and variables](/docs/ref/text.html).

**`style`** _optional_

Style to be applied to the item as CSS key-value pairs. 

The values can be a literal value or a single [command](/docs/ref/commands.html) call returning a literal value.

#### Example

```JSON
{ "type": "code", "value": "var x = 42;" }
```

----------------------------------------------------------------------

### [#](#image) {#image} `image` {.group}

Creates an image item.

#### Attributes

**`type`**   

_image_

**`src`**  

The URL of the image or a [command](/docs/ref/commands.html) returning a URL.

Images can be of the type JPEG, GIF, PNG, SVG, ICO, and BMP.

**`width`** _optional_

Width of the image.

**`height`** _optional_

Height of the image.

**`alt`**  _optional_

Text description of the image.

**`title`** _optional_

Title of the image presented as a tooltip.

**`style`** _optional_

Style to be applied to the item as CSS key-value pairs. 

The values can be a literal value or a single [command](/docs/ref/commands.html) call returning a literal value.

#### Example

```JSON
{ 
    "type": "image", 
    "src": "https://devgutt.github.io/evaluatly/static/img/luna-avatar.png", 
    "width": 200, 
    "title": "Luna picture" 
}
```

----------------------------------------------------------------------

### [#](#link) {#link} `link` {.group}

Action link.

#### Attributes

**`type`**   

_link_

**`label`**   

Link label.

**`url`** _optional_  

Link to a website (`http:\\` or `https:\\`), phone (`tel:`) or email (`mailto:`). The link will open in another tab or window.

If informed, the attribute `program` is ignored.

**`program`**  _optional_

One or more [commands](/docs/ref/commands.html) to be executed.

**`style`** _optional_

Style to be applied to the item as CSS key-value pairs. 

The values can be a literal value or a single [command](/docs/ref/commands.html) call returning a literal value.

#### Examples

```JSON
{ "type": "link", "label": "Go to evaluatly", "url": "https://devgutt.github.io/evaluatly" }
```

```JSON
{ "type": "link", "label": "Send an email", "url": "mailto:email@domain.com" }
```

Example with program:

```JSON
{ "type": "link", "label": "Next", "program": {"next_page": true} }
```

----------------------------------------------------------------------

### [#](#line) {#line} `line` {.group}

Creates a separator line item.

#### Attributes

**`type`**   

_line_

**`style`** _optional_

Style to be applied to the item as CSS key-value pairs. 

The values can be a literal value or a single [command](/docs/ref/commands.html) call returning a literal value.

#### Example

```JSON
{ "type": "line" }
```

----------------------------------------------------------------------

### [#](#space) {#space} `space` {.group}

Creates a space separator item.

#### Attributes

**`type`**   

_space_

**`style`** _optional_

Style to be applied to the item as CSS key-value pairs. 

The values can be a literal value or a single [command](/docs/ref/commands.html) call returning a literal value.

#### Example

```JSON
{ "type": "space" }
```

----------------------------------------------------------------------

### [#](#section) {#section} `section` {.group}

Creates a section item.

#### Attributes

**`type`**   

_section_

**`items`**   

List of items to be displayed.

**`style`** _optional_

Style to be applied to the item as CSS key-value pairs. 

The values can be a literal value or a single [command](/docs/ref/commands.html) call returning a literal value.

#### Example

```JSON
{ "type": "section", 
    "items": [
        { "type": "title", "value": "The Story" },
        { "type": "p", "value": "Now this is the story all about how..." }
    ],
    "style": {
        "border": "1px solid red",
        "background-color": "yellow"
    }
}
```

----------------------------------------------------------------------

### [#](#embed) {#embed} `embed` {.group}

Creates an embedded item.

#### Attributes

**`type`**   

_embed_

**`src`**   

The URL of the page to embed.

**`width`** _optional_ 

Width of the item. Default: 560 pixels.

**`height`** _optional_ 

Height of the item. Default: 315 pixels.

**`title`** _optional_ 

Describe the embedded content.

**`allow`** _optional_

Specifies a [feature policy](https://developer.mozilla.org/en-US/docs/Web/HTTP/Feature_Policy) for the item.

**`style`** _optional_

Style to be applied to the item as CSS key-value pairs. 

The values can be a literal value or a single [command](/docs/ref/commands.html) call returning a literal value.

#### Example

Example of embedded youtube video:

```JSON
{ 
    "type": "embed", 
    "src": "https://www.youtube.com/embed/ScMzIvxBSi4"
}
```

---------------------------------------------------------------

## [#](#forms) {#forms} Forms {.group}

Items for creating forms.

Item                            | Description
:---                            | :---
[Inputs](#inputs)               | Data input form.
[`radio`](#radio)               | Single choice input form.
[`check`](#check)               | Multiple choice input form.
[`button`](#button)             | Action button.


### [#](#inputs) {#inputs} Inputs {.group}

Data input form.

#### Attributes

**`type`**  

type        | Description
:---        | :---
_text_      | Text input
_name_      | Name input
_email_     | Email address input
_phone_     | Phone number input
_number_    | Number input
_url_       | URL input 
_password_  | Password input
_textlong_  | Multiline text input

**`label`**  _optional_

The label of the input.

**`save_key`**   

Key to save the information in the data table.

**`required`**   

Indicates whether the field is required.

Values: true or false (default).  

**`placeholder`**  _optional_   

Text displayed when the input is empty.

**`autoFocus`**     

Automatically focus the form control when the page is loaded.

Values: true or false (default).  

**`min`**  _optional_   

For inputs of the type _number_ this attribute indicates the minimum number allowed. Otherwise, it indicates the minimum number of characters.

**`max`**  _optional_  

For inputs of the type _number_ this attribute indicates the maximum number allowed. Otherwise, it indicates the maximum number of characters.

**`step`**  _optional_ 

Increment number value. Defaults to 1.  

This attribute is only available for _number_.  

**`pattern`**  _optional_

[Pattern](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_Expressions) the value must match to be valid.  

This attribute is not available for _textlong_.  

**`auto`**    

Hint for form autofill feature.  

Values: off (default), on, current-password, new-password

This attribute is only available for _password_.  

**`multiple`**   

Whether to allow multiple emails.  

Values: true or false (default).  

This attribute is only available for _email_.  

**`style_label`** _optional_

Style to be applied to the label as CSS key-value pairs. 

The values can be a literal value or a single [command](/docs/ref/commands.html) call returning a literal value.

**`style_input`** _optional_

Style to be applied to the input as CSS key-value pairs. 

The values can be a literal value or a single [command](/docs/ref/commands.html) call returning a literal value.

#### Examples

```JSON
{ "type": "name", "save_key": "name", "required": true }
```

Simple contact form:

```JSON
{ "items": [
    { "type": "name", "label": "Your name", "save_key": "name", "required": true },
    { "type": "email", "label": "Your email", "save_key": "email", "required": true },
    { "type": "textlong", "label": "Message", "save_key": "msg", "required": true }
]}
```

----------------------------------------------------------------------

### [#](#radio) {#radio} `radio` {.group}

Single choice input form.

#### Attributes

**`type`**   

_radio_

**`save_key`**   

Key to save the information in the data table.

**`label`**  _optional_  

The label of the input.

**`show_marker`**  _optional_ 

Shows the check marker. This attribute only works with [`input_submit`](/docs/ref/page.html#submit).

Values: true (default) or false.

**`show_ripple`**  _optional_  

Shows the ripple effect when selected.

Values: true or false (default).  

**`required`** _optional_   

Indicates whether the field is required.

Values: true or false (default).  

**`style_label`** _optional_

Style to be applied to the label as CSS key-value pairs. 

The values can be a literal value or a single [command](/docs/ref/commands.html) call returning a literal value.

#### `options`

List of options. Option attributes:

**`id`**  _optional_

Option id. This value is saved in the data table with the property `id` or the index if not informed.

**`value`** _optional_   

Option value. This value is saved in the data table with the property `value`.

**`label`**   

Option label. This value is saved in the data table with the property `label`.

Accepts [text formatting and variables](/docs/ref/text.html).

**`description`**  _optional_ 

Option description.

**`style_container`** _optional_

Style to be applied to the option container as CSS key-value pairs. 

The values can be a literal value or a single [command](/docs/ref/commands.html) call returning a literal value.

**`style`** _optional_

Style to be applied to the option as CSS key-value pairs. 

The values can be a literal value or a single [command](/docs/ref/commands.html) call returning a literal value.

#### Example

```JSON
{ "type": "radio", 
    "save_key": "color", 
    "label": "Choose a color:", 
    "required": true,
    "options": [
        { "id": "R", "label": "Red", "value": 20 },
        { "id": "B", "label": "Blue", "value": 40 },
        { "id": "Y", "label": "Yellow", "value": 60 }
    ] 
}
```


----------------------------------------------------------------------

### [#](#check) {#check} `check` {.group}

Multiple choice input form.

#### Attributes

**`type`**  

_check_

**`label`**  _optional_    

The label of the input.

**`show_marker`** _optional_

Shows the check marker. This attribute only works with [`input_submit`](/docs/ref/page.html#submit).

Values: true (default) or false.  

**`show_ripple`** _optional_ 

Shows the ripple effect when selected.

Values: true or false (default).  

**`min`** _optional_  

The minimum number of check boxes must be checked to submit the form. Defaults to 0.

**`max`** _optional_

The maximum number of checkboxes must be checked to submit the form. Defaults to unlimited.

**`error_range_msg`** _optional_  

The message shown to the user if the `min` and `max` limits are not respected. Defaults to "Out of range".

**`style_label`** _optional_

Style to be applied to the label as CSS key-value pairs. 

The values can be a literal value or a single [command](/docs/ref/commands.html) call returning a literal value.

#### `options`

List of options. Option attributes:

**`save_key`**   

Key to save the information in the data table.

**`id`** _optional_   

Option id. This value is saved in the data table with the property `id` or the index if not informed.

**`value`** _optional_   

Option value. This value is saved in the data table with the property `value`.

**`label`**   

Option label. This value is saved in the data table with the property `label`. 

Accepts [text formatting and variables](/docs/ref/text.html).

**`description`**  _optional_ 

Option description.

**`required`**  _optional_   

Indicates whether the checkbox is required.

Values: true or false (default).  

**`style_container`** _optional_

Style to be applied to the option container as CSS key-value pairs. 

The values can be a literal value or a single [command](/docs/ref/commands.html) call returning a literal value.

**`style`** _optional_

Style to be applied to the option as CSS key-value pairs. 

The values can be a literal value or a single [command](/docs/ref/commands.html) call returning a literal value.

#### Example

```JSON
{ "type": "check", 
    "label": "Choose the colors you like:", 
    "min": 1, "max": 2,
    "error_range_msg": "One or two colors",
    "options": [
        { "save_key": "color-red", "id": "R", "label": "Red", "value": 20 },
        { "save_key": "color-blue", "id": "B", "label": "Blue", "value": 40 },
        { "save_key": "color-yellow", "id": "Y", "label": "Yellow", "value": 60 }
    ] 
}
```

----------------------------------------------------------------------

### [#](#button) {#button} `button` {.group}

Action button.

#### Attributes

**`type`**   

_button_

**`label`**   

Button label.

**`program`**   

One or more [commands](/docs/ref/commands.html) to be executed.

**`style`** _optional_

Style to be applied to the item as CSS key-value pairs. 

The values can be a literal value or a single [command](/docs/ref/commands.html) call returning a literal value.

#### Examples

```JSON
{ "type": "button", "label": "Next", "program": {"next_page": true} }
```

Example with multiple commands:

```JSON
{ "type": "button", "label": "Info", "program": [
        {"save": ["info_read", true]},
        {"alert": {"is": "info", "msg": "Go to the next page!"}},
        {"next_page": true}
    ] 
}
```

----------------------------------------------------------------------

## [#](#logic) {#logic} Logic {.group}

Programming items.

Item                        | Description
:---                        | :---
[`exec`](#exec)             | Run one or more [commands](/docs/ref/commands.html).
[`render-If`](#render-If)   | Conditional item display.
[`fetch`](#fetch)           | Calls an endpoint to fetch items to be displayed.
[`fetch-js`](#fetch-js)     | Calls a Javascript function to fetch items to be displayed.
[`alert`](#alert)           | Shows or hides an alert popup.



### [#](#exec) {#exec} `exec` {.group}

Run one or more [commands](/docs/ref/commands.html).

#### Attributes

**`type`**   

_exec_

**`delay`**  _optional_ 

Delay executing commands in milliseconds (1000 milliseconds = 1 second).

It will execute immediately if not informed (defaults to 0).

**`program`**   

One or more [commands](/docs/ref/commands.html) to be executed.

#### Example

```JSON
{"type": "exec", "delay": 500, 
    "program": [
        {"console": "Executing commands"},
        {"save": ["status", "ATIVE"]},
        {"next_page": true}
    ]
}
```

----------------------------------------------------------------------

### [#](#render-If) {#render-If} `render-If` {.group}

Conditional item display.

#### Attributes

**`type`**   

_render-If_

**`value`**   

List of sequential conditions to be tested.

#### Condition Attributes

**`cond`**   

Function with conditional.

**`render`**   

List of items to be displayed if the condition is met.

#### Example

```JSON
{ "type": "render-If", 
    "value": [
        { 
            "cond": {"==": [{"v": "color"}, "RED"]},
            "render": [
                { "type" : "p", "value": "The color is red"}
            ]
        },
        { 
            "cond": {"==": [{"v": "color"}, "BLUE"]},
            "render": [
                { "type" : "p", "value": "The color is blue"}
            ]
        },
        { 
            "render": [
                { "type" : "p", "value": "Color not informed"}
            ]
        }
    ]
}
```

----------------------------------------------------------------------

### [#](#fetch) {#fetch} `fetch` {.group}

Calls an endpoint to fetch items to be displayed.

#### Attributes

**`type`**   

_fetch_

**`endpoint`**   

The URL to be called to fetch the items. The URL can be an absolute or relative path.

**`data`**  _optional_   

List of parameters to be sent to the endpoint. It could be a variable key or a key-value parameter.

For key-value parameters, the value can be a literal or a command.

If not informed, all variables that do not start with "_" (underscore) will be sent.

By default, the `value` property of the variable is used. If the `value` is empty, the `id` or `label` is used instead.

#### Examples

```JSON
{ "type": "fetch", "endpoint": "https://example.com/endpoint/fetch_1" }
```

Example with variables and relative URL:

```JSON
{ "type": "fetch", 
    "endpoint": "/api/fetch_1", 
    "data": [
        "name",
        "email",
        {"name_label": {"l": "name"}},
        {"status": "OPEN"}
    ]
}
```

#### [](#fetch-server) {#fetch-server} Server processing

The instructions below show how to respond to requests initiated by the `fetch` item.

** Request **

A __`POST`__ request will be called on the URL endpoint, using the `endpoint` attribute.

The following parameters will be sent in the __`BODY`__ of the request:

Parameter       | Description
:---            | :---
`hash`          | the root attribute [`hash`](/docs/ref/root.html).
`origin`        | The protocol, hostname, and port number of the caller's URL.
`data`		    | JSON with the parameters specified in the __`data`__ attribute.

** Response **

The server must respond with a JSON message containing the following parameters:

Parameter       | Description
:---            | :---
`ok`            | `true`
`res`		    | List of [items](/docs/ref/items.html) to be displayed.

if an **error** occurs:

Parameter       | Description
:---            | :---
`ok`            | `false`
`error_msg`		| The error message to be shown to the user. 
`error_code`	| The error code. 

Example of response:

```JSON
{
    "ok": true,
    "res": [
        {"type": "title", "value": "Hello there!"},
        {"type": "button", "label": "next", "program": [ {"next_page": true} ]}
    ]
}
```

An error response:

```JSON
{   
    "ok": false,
    "error_msg": "Invalid request",
    "error_code": "ERROR_INVALID_REQUEST"
}
```

----------------------------------------------------------------------

### [#](#fetch-js) {#fetch-js} `fetch-js` {.group}

UNDER CONSTRUCTION

Calls a Javascript function to fetch items to be displayed.

#### Attributes

**`type`**   

_fetch-js_

**`fn`**   

Name of the Javascript function registered in the `fetch` option on the [config](#). 

#### Examples

```JSON
{ "type": "fetch-js", "fn": "MY_FUNCTION" }
```



----------------------------------------------------------------------

### [#](#alert) {#alert} `alert` {.group}

Shows or hides an alert popup.

#### Attributes

**`type`**   

_alert_

**`is`**   

The alert type.

Values    | Description
:---      | :--- 
`error`   | Shows an error alert popup (default)
`warning` | Shows a warning alert popup
`info`    | Shows an information alert popup
`success` | Shows a success alert popup

**`msg`** 

Message to be displayed. 

Accepts [text formatting and variables](/docs/ref/text.html).

**`interval`**  _optional_

The period in milliseconds that the alert will be displayed. (1000 milliseconds = 1 second). The default is 3000 milliseconds.

Use `-1` to not hide the alert automatically.

**`style`** _optional_

Style to be applied to the alert as CSS key-value pairs. 

The values can be a literal value or a single [command](/docs/ref/commands.html) call returning a literal value.

#### Example

```JSON
{"type": "alert", "is": "info", "interval": 5000, "msg": "Hello there!"}
```

---------------------------------------------------------------

## [#](#payment) {#payment} Payment {.group}

Payment items.

Item                        | Description
:---                        | :---
[`card`](#card)             | Collect card information for payment.


### [#](#card) {#card} `card` {.group}

Collect card information for payment. 

> To use this item you need to setup the [payment on the page](/docs/ref/page.html#payments).

#### Attributes

**`type`**   

_card_

**`label`** _optional_

The label of the input.

**`disabled`** _optional_

Disable the input. Defaults do `false`.

#### Example

```JSON
{ "type": "card", "label": "Inform your credit card" }
```

```