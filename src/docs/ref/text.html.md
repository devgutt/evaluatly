```INI META
includes = index.html.md menu menuTop
title = Text manipulation
base = docs.html
slug = text
```

```MD SUBMENU

- [Formatting](#formatting)
- [Variable substitution](#variables)
- [Variable modifiers](#modifiers)

```

```MD BODY

## [#](#formatting) {#formatting} Formatting {.group}

Applies formatting to parts of the text.

Operation       | Format                            | Description
:---            | :---:                             | :---
__Bold__        | `**`*text*`**` or `__`*text*`__`  | Formats the _text_ as boldaface.
__Italic__      | `*`*text*`*` or `_`*text*`_`      | Formats the _text_ as italic type.
__Strike__      | `~~`*text*`~~`                    | Formats the _text_ as strike-through style.
__Line break__  | `\n`                              | Creates a line break in the text (carriage-return).
__Link__        | `[`*text*`](`*url*`)`             | Creates a _link_ with the label _text_ to _url_.<br><br>The URL can be a website (`http:\\` or `https:\\`), phone (`tel:`) or email (`mailto:`). The link will open in another tab or window.

#### Examples

```JSON
{"type": "p", "value": "This **text is in bold** and this *text is in italics*."}
```

```JSON
{"type": "p", "value": "Is this ~~the best~~ a good offer?\\n __yes__"}
```

```JSON
{"type": "p", "value": "Check our [website](https://devgutt.github.io/evaluatly)"}
```

Example with [variable substitution](#variables):

```JSON
{"type": "p", "value": "The color is **{{color}}**"}
```

> The substitution is applied before any formatting.

Example in [`check`](/docs/ref/items.html#check) item option label:

```JSON
{ "type": "check", 
    "options": [
        { "save_key": "accept-terms", "label": "I have **read** and **accept** the [terms](https://devgutt.github.io/evaluatly/terms)" } 
    ] 
}
```


## [#](#variables) {#variables} Variable substitution {.group}

To replace the value of a variable directly in the text, place the variable's name inside the substitution marker `{{ }}`.

For example, for a variable named `color`, you can use the value of the variable in the text using `{{color}}`.

```JSON
{"type": "p", "value": "The color is {{color}}"}
```

By default the property `value` of the variable is used. To get the other properties, like `label` or `id`, use "." followed by the property name:

```JSON
{"type": "p", "value": "The color's label is {{color.label}} and the id is {{color.id}}"}
```

## [#](#modifiers) {#modifiers} Variable modifiers {.group}

To make changes to the text, use the vertical bar `|` after the variable, with the desired function.

```JSON
{"type": "p", "value": "The color is {{color|upper}}"}
```

The `upper` function will modify the value of the variable `color` to uppercase.

Modifiers can be chained and will be applied in sequence.

```JSON
{"type": "p", "value": "My first name is {{name|first|upper}}"}
```

The list of modifiers is below:

Modifier                        | Description
:---                            | :---
[`upper`](#upper)			    | Transforms the variable to uppercase
[`lower`](#lower)			    | Transforms the variable to lowercase
[`sub`](#sub)			        | Returns part of the text
[`equal`](#equal)			    | Returns text if equal
[`notEqual`](#notEqual)			| Returns text if not equal
[`less`](#less)			        | Returns text if the value is less
[`lessEqual`](#lessEqual)       | Returns text if the value is less or equal
[`greater`](#greater)			| Returns text if the value is greater
[`greaterEqual`](#greaterEqual) | Returns text if the value is greater  or equal
[`default`](#default)			| Returns the default value if the variable is empty.
[`first`](#first)			    | Returns the first word of a variable.
[`last`](#last)			        | Returns the last word of a variable.
[`word`](#word)			        | Returns the word of a variable by position


### [#](#upper) {#upper} `upper` {.group}

Transforms the variable to uppercase.

#### Examples

```JSON
{ "type": "p", "value": "The color is {{color|upper}}" }
```

----------------------------------------------------------------------

### [#](#lower) {#lower} `lower` {.group}

Transforms the variable to lowercase.

#### Examples

```JSON
{ "type": "p", "value": "The color is {{color|lower}}" }
```

----------------------------------------------------------------------

### [#](#sub) {#sub} `sub` (`start`, `end`) {.group}

Returns the part of the text between the `start` and `end` indexes, or to the end of the text.

#### Parameters

`start`  

Start index (starting with `0`)

`end`

End index. If not informed, the end of the text.

#### Examples

```JSON
{ "type": "p", "value": "The color is {{color|sub(2,5)}}" }
```

Example end of the text:

```JSON
{ "type": "p", "value": "The color is {{color|sub(2)}}" }
```

----------------------------------------------------------------------

### [#](#equal) {#equal} `equal` (`match`, `txtTrue`, `txtFalse`) {.group}

Returns `txtTrue` if variable is equal to `match`, or `txtFalse` otherwise.

#### Examples

```JSON
{ "type": "p", "value": "The color is red? {{color|equal('red', 'Yes', 'No')}}" }
```

----------------------------------------------------------------------

### [#](#notEqual) {#notEqual} `notEqual` (`match`, `txtTrue`, `txtFalse`) {.group}

Returns `txtTrue` if variable is not equal to `match`, or `txtFalse` otherwise.

#### Examples

```JSON
{ "type": "p", "value": "The color is not red? {{color|notEqual('red', 'Yes', 'No')}}" }
```

----------------------------------------------------------------------

### [#](#less) {#less} `less` (`var`, `txtTrue`, `txtFalse`) {.group}

Returns `txtTrue` if variable is less than `var`, or `txtFalse` otherwise.

#### Examples

```JSON
{ "type": "p", "value": "The result is {{result|less(20, 'Low', 'High')}}" }
```

----------------------------------------------------------------------

### [#](#lessEqual) {#lessEqual} `lessEqual` (`var`, `txtTrue`, `txtFalse`) {.group}

Returns `txtTrue` if variable is less or equal to `var`, or `txtFalse` otherwise.

#### Examples

```JSON
{ "type": "p", "value": "The result is {{result|lessEqual(20, 'Low', 'High')}}" }
```

----------------------------------------------------------------------

### [#](#greater) {#greater} `greater` (`var`, `txtTrue`, `txtFalse`) {.group}

Returns `txtTrue` if variable is greater than `var`, or `txtFalse` otherwise.

#### Examples

```JSON
{ "type": "p", "value": "The result is {{result|greater(20, 'High', 'Low')}}" }
```

----------------------------------------------------------------------

### [#](#greaterEqual) {#greaterEqual} `greaterEqual` (`var`, `txtTrue`, `txtFalse`) {.group}

Returns `txtTrue` if variable is greater or equal to `var`, or `txtFalse` otherwise.

#### Examples

```JSON
{ "type": "p", "value": "The result is {{result|greaterEqual(20, 'High', 'Low')}}" }
```

----------------------------------------------------------------------

### [#](#default) {#default} `default` (`txt`) {.group}

Returns `txt` if the variable is empty.

#### Examples

```JSON
{ "type": "p", "value": "The color is {{color|default('white')}}" }
```

----------------------------------------------------------------------

### [#](#first) {#first} `first` {.group}

Returns the first word of a variable.

#### Examples

```JSON
{ "type": "p", "value": "The first name is {{name|first}}" }
```

----------------------------------------------------------------------

### [#](#last) {#last} `last` {.group}

Returns the last word of a variable.

#### Examples

```JSON
{ "type": "p", "value": "The last name is {{name|last}}" }
```

----------------------------------------------------------------------

### [#](#word) {#word} `word` (`nth`) {.group}

Returns `nth` word of a variable.

#### Examples

```JSON
{ "type": "p", "value": "The name is {{name|word(1)}}" }
```

```

