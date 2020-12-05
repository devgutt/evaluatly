```INI META
includes = docs/index.html.md menu menuTop
title = Commands
base = docs/docs.html
slug = commands


```

```MD SUBMENU

- [Programming](#programming)
- [Data](#data)
- [Display](#display)   
- [Operations](#operations)
- [Logic](#logic)
- [Comparison](#comparison)
- [Navigation](#nav)
- [Embedded](#embedded)   

```

```MD BODY

## [#](#programming) {#programming} Programming {.group}

Command                 | Description
:---                    | :---
[`if`](#if)             | Conditional execution of commands.
[`call`](#call)		    | Calls an endpoint to fetch commands to be executed.
[`call-js`](#call-js)   | Calls a Javascript function to fetch commands to be executed.
[`throw`](#throw)		| Stops the execution of the current list of commands.
[`qs`](#qs)			    | Gets a query string parameter of the current page location.
[`alert`](#alert)		| Shows or hides an alert popup.
[`restart`](#restart)	| Clears all data and resets the story to the beginning.
[`console`](#console)	| Shows a message in the browser console.


### [#](#if) {#if} `if` {.group}

Conditional execution of commands.

#### Argument

List of sequential conditions to be tested.

#### Condition Attributes  

**`cond`**   

Function with conditional.

**`program`**   

One or more commands to be executed if the condition is met.

#### Examples

```JSON
{"if": [
    { 
        "cond": {"==": [{"v": "result"}, "HIGH"]},
        "program": { "jump_page": "page_high" }
    },
    { 
        "cond": {"==": [{"v": "result"}, "LOW"]},
        "program": { "jump_page": "page_low" }
    },
    { 
        "program": { "next_page": true }
    }
]}
```

Example with multiple conditions and a list of commands:

```JSON
{"if": [
    { 
        "cond": {"and": [
            {">=": [{"v": "age"}, 30]},
            {"<=": [{"v": "age"}, 50]},
            {"==": [{"v": "sex"}, "M"]}
        ]},
        "program": [
            { "save": ["profile", "2"] },
            { "jump_page": "page_profile_2" }
        ]
    }
]}
```
        
----------------------------------------------------------------------

### [#](#call) {#call} `call` {.group}

Calls an endpoint to fetch commands to be executed.

#### Arguments

**`endpoint`** 

The URL to be called to fetch the commands. The URL can be an absolute or relative path.

**`data`** _optional_ 

List of parameters to be sent to the endpoint. It could be a variable key or a key-value parameter.

For key-value parameters, the value can be a literal or a single command call returning a literal.

If not informed, all variables that do not start with "_" (underscore) will be sent.

By default, the `value` property of the variable is used. If the `value` is empty, the `id` or `label` is used instead.


#### Examples

```JSON
{"call": { "endpoint": "https://example.com/endpoint/msg" } }
```

Example with variables and relative URL:

```JSON
{"call": { 
    "endpoint": "/api/send_email", 
    "data": [ 
        "name", 
        "email",
        { "result": {"v": "res"} }
    ]
}}
```

#### [](#call-server) {#call-server} Server processing

The instructions below show how to respond to requests initiated by the `call` command.

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
`res`		    | List of [commands](/docs/ref/commands.html) to be executed.

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
        {"save":["token", "123"]},
        {"next_page":true}
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

### [#](#call-js) {#call-js} `call-js` {.group}

Calls a Javascript function to fetch commands to be executed.

UNDER CONSTRUCTION

----------------------------------------------------------------------

### [#](#throw) {#throw} `throw` {.group}

Stops the execution of the current list of commands.

#### Argument

The message shown to the user.

#### Example

```JSON
{"throw": "Error found"}
```

----------------------------------------------------------------------

### [#](#qs) {#qs} `qs` {.group}

Gets a query string parameter of the current page location.

#### Argument

Parameter name in the location query string.

#### Return

The value associated with the parameter.

#### Example

To get the parameter `sid`, considering the current location `https://p.evaluatly.com/acc/tst?sid=234`:

```JSON
{"qs": "sid"}
```

----------------------------------------------------------------------

### [#](#alert) {#alert} `alert` {.group}

Shows or hides an alert popup.

#### Argument

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
{"alert": {"is": "info", "interval": 5000, "msg": "Hello there!"}}
```

----------------------------------------------------------------------

### [#](#restart) {#restart} `restart` {.group}

Clears all data and resets the story to the beginning.

#### Argument

`true`

#### Example

```JSON
{"restart": true}
```

----------------------------------------------------------------------

### [#](#console) {#console} `console` {.group} 

Shows a message in the browser console.

Used for debugging.

#### Argument

Expression or list of expressions.

An expression can be a literal value or a command.

If a list is used, the values are concatenated before the display.

#### Examples

```JSON
{"console": "Checkpoint 1"}
```

Example with a list:

```JSON
{"console": [ "hello ", {"v": "name"} ]}
```

----------------------------------------------------------------------

## [#](#data) {#data} Data {.group}

Commands to manipulate variables.

The variables are saved on a data table for the session, and it is erased when the tab or browser closes.

Optionally, you can store the variables to be available in the future after the session is closed.

Command                 | Description
:---                    | :---
[`v` (_value_)](#v)     | Gets the `value` of a variable.
[`i` (_id_)](#i)	    | Gets the `id` of a variable.
[`l` (_label_)](#l)     | Gets the `label` of a variable.
[`prop`](#prop)         | Gets the property of a variable.
[`save`](#save)		    | Saves a variable in the data table.
[`delete`](#delete)		| Deletes a variable in the data table.
[`store`](#store)		| Stores a list of variables on the local storage.
[`restore`](#restore)   | Restores a list of variables from the local storage.
[`remove`](#remove)		| Removes variables from the local storage.


### [#](#v) {#v} `v` {.group}

Gets the `value` of a variable.

#### Argument

Variable name.

#### Return

Value of the variable.

#### Example

```JSON
{"v": "name"}
```

----------------------------------------------------------------------

### [#](#i) {#i} `i` {.group}

Gets the `id` of a variable.

#### Argument

Variable name.

#### Return

Id of the variable.

#### Example

```JSON
{"i": "check_1"}
```

----------------------------------------------------------------------

### [#](#l) {#l} `l` {.group}

Gets the `label` of a variable.

#### Argument

Variable name.

#### Return

The label of the variable.

#### Example

```JSON
{"l": "radio_1"}
```

----------------------------------------------------------------------

### [#](#prop) {#prop} `prop` {.group}

Gets the property of a variable.

#### Argument

[key, prop]

__key__  

Key of the variable.

__prop__ property

The name of the property.

#### Return

The label of the variable.

#### Example

```JSON
{"prop": ["radio_1", "label"]}
```

----------------------------------------------------------------------

### [#](#save) {#save} `save` {.group}

Saves a variable in the data table.

The variable will be created if it does not exist. If it already exists, the value will be replaced by the new one.

#### Argument

[key, prop, value]

__key__  

Key of the variable.

__prop__ _optional_

The name of the property. Defaults to `value`.

__value__ 

A literal value or single command call returning a literal.

#### Examples

```JSON
{"save": ["score", "value", 60]}
```

Example using conditional:

```JSON
{ "if": [
    { 
        "cond": {"<=": [{"v": "score"}, 20]},
        "program": {"save": ["result", "value", "LOW"]}
    },
    { 
        "cond": {">=": [{"v": "score"}, 80]},
        "program": {"save": ["result", "value", "HIGH"]}
    },
    { 
        "program": {"save": ["result", "value", "NORMAL"]}
    }
] }
```

Example using command call:

```JSON
{"save": ["sum", {"+": [23, 12, 45]}]}
```

----------------------------------------------------------------------

### [#](#delete) {#delete} `delete` {.group}

Deletes a variable in the data table.

#### Argument

__key__  

Key of the variable.

#### Examples

```JSON
{"delete": "score"}
```

----------------------------------------------------------------------

### [#](#store) {#store} `store` {.group}

Stores a list of variables from the data table to the local storage.

#### Argument

List of variables.

#### Examples

```JSON
{"store": ["name", "email"]}
```
----------------------------------------------------------------------

### [#](#restore) {#restore} `restore` {.group}

Restores a list of variables from the local storage to the data table.

#### Argument

List of variables.

#### Examples

```JSON
{"restore": ["name", "email"]}
```
----------------------------------------------------------------------

### [#](#remove) {#remove} `remove` {.group}

Removes variables from the local storage.

#### Argument

List of variables, or __`all`__ to delete all variables of the local storage.

#### Examples

```JSON
{"remove": ["name", "email"]}
```

Delete all variables on the local storage:

```JSON
{"remove": "all"}
```

----------------------------------------------------------------------


## [#](#display) {#display} Display {.group}

Command             | Description
:---                | :---
[`sub`](#sub)         | Applies [text formatting and variables](/docs/ref/text.html) to a text.

### [#](#sub) {#sub} `sub` {.group} 

Applies [text formatting and variables](/docs/ref/text.html) to a text.

#### Argument

Text to process the substitutions.

#### Return

The text processed.

#### Examples

```JSON
{"sub": "The color is {{color|upper}}"}
```

----------------------------------------------------------------------
   
## [#](#operations) {#operations} Operations {.group}

Applies the operator to a list of values.

Operation   | Description
:---        | :---
`+`         | Sums or concatenate the values
`-`         | Subtracts the values
`*`         | Multiply the values
`/`         | Divides the values

#### Argument

List of values to perform the operation desired.

The values can be a literal or a single command call returning a literal.

The operation is executed sequentially from left to right.

#### Return

The result of the operation.

#### Examples

```JSON
{"+": [43, 12, 2]}
```

Example using command call:

```JSON
{"+": [43, 12, {"v": "result"}]}
```

Example concatenating text:

```JSON
{"+": ["Your name is ", {"v": "name"}]}
```

> You can use [text formatting and variables](/docs/ref/text.html) for this type of operation.

Example with multiple operations:

```JSON
{"*": [ {"+": [ {"v": "X"}, {"v": "Y"} ]}, 100 ]}
```

----------------------------------------------------------------------

## [#](#logic) {#logic} Logic {.group}

Boolean operations.

Command | Description
:---    | :---
`and`   | Boolean "and" operation
`or`    | Boolean "or" operation
`not`   | Inverts the boolean value

#### Argument

For `and` and `or` operations: List of values to perform the operation desired.

For `not` operation: Value to be inverted.

The values can be a literal or a single command call returning a literal.

#### Return

Result of the operation: `true` or `false`.

#### Examples

```JSON
{"and": [ {"v": "isFirst"}, true ]}
```

Example with inversion:

```JSON
{"not": {"v": "isFirst"}}
```
Example with complex operations:

```JSON
{"and": [
        {"<": [{"v": "result"}, "100"]},
        {">": [{"v": "result"}, "30"]},
        {"!=": [{"v": "result"}, "70"]}
    ]
}
```

----------------------------------------------------------------------

## [#](#comparison) {#comparison} Comparison {.group}

Compares two values.

Command | Description
:---    | :---
`==`    | Equal
`!=`    | Not equal
`>`     | Greater than
`>=`    | Greater than or equal to
`<`     | Less than
`<=`    | Less than or equal to

#### Argument

A comparison pair: [value1, value2].

The values can be a literal or a single command call returning a literal.

#### Return

Result of the operation: `true` or `false`.

#### Examples

```JSON
{"==": [{"v": "result"}, 70]}
```

```JSON
{">": [{"v": "result"}, 70]}
```

----------------------------------------------------------------------

## [#](#nav) {#nav} Navigation {.group}

Command                                 | Description
:---                                    | :---
[`next_page`](#next_page)               | Navigates to the next page in the story.
[`previous_page`](#previous_page)       | Navigates to the previous page in the story.
[`reload_page`](#reload_page)           | Reloads the current page in the story.
[`jump_page`](#jump_page)               | Jumps to a page with a given id.
[`redirect`](#redirect)                 | Redirects to a URL.


### [#](#next_page) {#next_page} `next_page` {.group}

Navigates to the next page in the story.

#### Argument

`true`

#### Examples

```JSON
{"next_page": true}
```

----------------------------------------------------------------------

### [#](#previous_page) {#previous_page} `previous_page` {.group}

Navigates to the previous page in the story.

#### Argument

`true`

#### Examples

```JSON
{"previous_page": true}
```

----------------------------------------------------------------------

### [#](#reload_page) {#reload_page} `reload_page` {.group}

Reloads the current page in the story.

#### Argument

`true`

#### Examples

```JSON
{"reload_page": true}
```

----------------------------------------------------------------------

### [#](#jump_page) {#jump_page} `jump_page` {.group}

Jumps to a page with a given id.

#### Argument

The id of the destination page.

The values can be a literal or a single command call returning a literal.

> Go to [Story](/docs/ref/story.html) for more information about pages.

The values can be a literal or a single command call returning a literal.

#### Examples

```JSON
{"jump_page": "page_result"}
```

Example using command:

```JSON
{"jump_page": {"v": "savedPageId"}}
```

Example using conditional jumping:

```JSON
{"if": [
    {
        "cond": {">=": [{"v": "result"}, 80]},
        "program": {"jump_page": "page_high"}
    },
    {
        "cond": {"<=": [{"v": "result"}, 20]},
        "program": {"jump_page": "page_low"}
    },
    {
        "program": {"jump_page": "page_normal"}
    }
]}
```

----------------------------------------------------------------------

### [#](#redirect) {#redirect} `redirect` {.group}

Redirects to a URL.

If the story is embedded, the parent will be redirected.

#### Arguments

**`url`**   

The URL for redirection.

The URL can be a literal or a single command call returning a literal.

**`data`**   

List of parameters to be submitted to the URL. It could be the name of a variable or a key-value parameter.

By default, the `value` property of the variable is used. If the value is empty, the `id` is used instead.

For key-value parameters, the value can be a literal or a single command call returning a literal.

**`method`**   

The method for redirection.

Values: `get` (default) or `post`.

#### Examples

Example of `get` redirection:

```JSON
{"redirect": { 
    "data": ["name", "email"], 
    "url": "https://mywebsite.com/show" 
    } 
}
```

Example of `post` redirection:

```JSON
{"redirect": { 
    "method": "post",
    "data": [ 
        "name", "email", 
        {
            "result": {"v": "result"},
            "token": "123"
        } 
    ],
    "url": "https://mywebsite.com/result"
    }
}
```

----------------------------------------------------------------------

## [#](#embedded) {#embedded} Embedded {.group}


Command                       | Description
:---                          | :---
[`parent`](#parent)           | Communicates with the parent window.
[`has_parent`](#has_parent)   | Indicates whether the story is embedded.


### [#](#parent) {#parent} `parent` {.group}

Communicates with the parent window.

This command only works for embedded stories.

#### Close the embedded window

##### Argument

**`action`**

`close`

##### Example

```JSON
{"parent": { "action": "close" }}
```

#### Sends a message to the parent window    

##### Arguments

**`action`**

`message`

**`data`**   

List of parameters to be sent with the message. It could be the name of a variable or a key-value parameter.

By default, the `value` property of the variable is used. If the value is empty, the `id` is used instead.

For key-value parameters, the value can be a literal or a single command call returning a literal.

##### Example

```JSON
{"parent": {
    "action": "message",
    "data": [
        "name", 
        "email", 
        {"extra": "SOURCE"}
        ]
    }
}
```

----------------------------------------------------------------------

### [#](#has_parent) {#has_parent} `has_parent` {.group}

It indicates whether the story is embedded.

#### Argument

Boolean to be matched with the response.

#### Return

`true` if it matches the argument or `false` otherwise.

#### Example

```JSON
{"has_parent": true}
```


```