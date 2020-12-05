```INI META
title = Getting Started
base = docs/docs.html
slug = start
build = false

```

```MD SUBMENU

- [Creating a story](#setup)
- [Adding a simple form](#form)
- [Sending a message](#msg)
- [Try it](#try)
- [Downloads](#downloads)

```

```MD BODY

Evaluatly is a tool to create multipage stories. You can use it to show information, collect data with forms, personalize iterations, and much more.

## [#](#setup) {#setup} Creating a story {.group}

Stories are created using [JSON](https://www.json.org), a text-based simple data format, and placed directly on a website's page.

Below is a simple example of a story on a regular web page:

```HTML
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1" />
<title>My Page</title>
</head>
<body>
    <script src="{% cdn %}/dist/evaluatly-{% evaluatly_version %}.js"></script>
    <script>
        Evaluatly.loadVar({
            "hash": "example/setup",     
            "story": {
                "pages": [
                    {
                        "items": [
                            { "type": "title", "value": "My first story" },
                            { "type": "p", "value": "This is an example." },
                            { "type": "button", "label": "Next", "program": {"next_page": true} }
                        ]
                    },
                    {
                        "items": [
                            { "type": "title", "value": "Hello 👋" }
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
        });
    </script>
</body>
</html>
```
⚡️ [Run this example](/docs/example/setup.html)

As you can see, the installation is very simple. [Get the Evaluatly script](#downloads) and create a `SCRIPT` tag on the page. Call `Evaluatly.loadVar` with your JSON story.

#### Load the story from a JSON file

You can also load your story from a JSON file, using `Evaluatly.loadUrl`. First, create the file with the JSON only:

`story.json`
```JSON
{
    "hash": "example/setup-url",     
    "story": {
        "pages": [
            {
                "items": [
                    { "type": "title", "value": "My first story" },
                    { "type": "p", "value": "This is an example." },
                    { "type": "button", "label": "Next", "program": {"next_page": true} }
                ]
            },
            {
                "items": [
                    { "type": "title", "value": "Hello 👋" }
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

And then, call `Evaluatly.loadUrl`, informing the URL of the JSON file you have just created:

```HTML
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1" />
<title>My Page</title>
</head>
<body>
    <script src="{% cdn %}/dist/evaluatly-{% evaluatly_version %}.js"></script>
    <script>
        Evaluatly.loadUrl('/docs/example/story.json');
    </script>
</body>
</html>
```
⚡️ [Run this example](/docs/example/setup-url.html)

#### Load the story inside a container on the page

By default, the story will be shown full screen on the page. If you want to place the story on a container inside the page, you can use the `containerId` parameter:

```HTML
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1" />
<title>My Page</title>
<style>
    #container {
        margin: 32px auto;
        border: 1px solid #d0d0d0;
        max-width: 600px;
        box-shadow: 0 18px 30px -15px rgba(0,0,0,.4);
    }
</style>
</head>
<body>
    <div id="container"></div>
    <script src="{% cdn %}/dist/evaluatly-{% evaluatly_version %}.js"></script>
    <script>
        Evaluatly.loadUrl('/docs/example/story.json', {
            "containerId": "container"
        });
    </script>
</body>
</html>
```
⚡️ [Run this example](/docs/example/setup-container.html)

#### Elements of a story

Item              | Description
:---              | :---
**`hash`**        | An unique id for the story.
**`story`**       | Contains all the pages and elements of the story.
**`theme`**       | Contains information about styling.

For more information, check the [reference](/docs/ref/root.html) for a complete list of elements that can be used in the story.

## [#](#form) {#form} Adding a simple form {.group}

You can include inputs and forms to collect information.

Let's create a simple form to collect the name of the person. Update the **`story`** element with the code below:

```JSON
{   
    "...",  
    "story": {
        "pages": [
            {
                "items": [
                    { "type": "title", "value": "My first story" },
                    { "type": "p", "value": "This is an example." },
                    { "type": "button", "label": "Next", "program": {"next_page": true} }
                ]
            },
            {
                "items": [
                    { "type": "question", "value": "What's your name?" },
                    { "type": "name", "save_key": "name", "required": true, "autofocus": true }  
                ],
                "submit" : { 
                    "label": "Next", 
                    "input_submit": true,
                    "program": [ {"next_page": true} ] 
                } 
            },
            {
                "items": [
                    { "type": "title", "value": "Hello, {{name}} 👋" }
                ]
            }
        ]
    },    
    "..."
}     
```
⚡️ [Run this example](/docs/example/form.html)

Observe that the multipage makes the story conversational and pleasant. You can create as many pages as you want and use single or multiple inputs on the page to collect information.

> The **`{{name}}`** element on the last page will be substituted for the variable **`name`** (*save_key*) saved on the previous page. 
> Learn more about [text formatting and variable substitution](/docs/ref/text.html).

## [#](#msg) {#msg} Sending a message {.group}

To send the information collected to your server, you need to make a **`call`** explicitly.

Let's create a page to send the information to the server:

```JSON
{   
    "...",  
    "story": {
        "pages": [
            {
                "items": [
                    { "type": "title", "value": "My first story" },
                    { "type": "p", "value": "This is an example." },
                    { "type": "button", "label": "Next", "program": {"next_page": true} }
                ]
            },
            {
                "items": [
                    { "type": "question", "value": "What's your name?" },
                    { "type": "name", "save_key": "name", "required": true, "autofocus": true }  
                ],
                "submit" : { 
                    "label": "Next", 
                    "input_submit": true,
                    "program": [ {"next_page": true} ] 
                } 
            },
            {
                "items": [
                    { "type": "question", "value": "Hello, {{name}} 👋, write a message:" },
                    { "type": "textlong", "save_key": "msg", "autofocus": true,
                        "submit" : { "program": [ {"next_page": true} ] }  
                    }
                ],
                "submit" : { 
                    "label": "Send Message", 
                    "input_submit": true,
                    "program": [ {"next_page": true} ] 
                } 
            },
            {
                "history": false,
                "items": [
                    { "type": "title", "value": "Sending message..."},
                    { "type": "exec", "delay": 800, 
                        "program": [
                            {"call": { 
                                "endpoint": "https://e.evaluatly.com/api/e/void"
                                }
                            },
                            {"next_page": true}
                        ]
                    }
                ]
            },
            {
                "items": [
                    { "type": "image", "src": "{% cdn %}/img/ok.png" },
                    { "type": "title", "value": "Your message was sent, {{name}}" }
                ]
            }
        ]
    },    
    "..."
}     
```
⚡️ [Run this example](/docs/example/form-send.html)

You need to prepare your server to receive and process the message. Learn more in the [`call`](/docs/ref/commands.html#call) documentation.

## [#](#try) {#try} Try it ✨{.group}

Use the online editor to edit and download the story directly on your browser:

**[TRY IT →](/try.html?d=/docs/example/try.json)**


## [#](#downloads) {#downloads} Downloads {.group}

<a href="/docs/example/form-send.html" download="full-example.html">Download the full page example ↘︎</a>.

#### Evaluatly script 

If you prefer, you can download the Evaluatly script file, instead of using the CDN. Right-click the link below and select "Save Link as...":

[Download Script ↘︎]({% cdn %}/dist/evaluatly-{% evaluatly_version %}.js)

```


