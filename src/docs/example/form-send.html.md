```INI META
title = Example Getting Started
base = raw.html

```


```HTML RAW
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1" />
<title>My Page</title>
</head>
<body>
    <script src="{% root %}/dist/evaluatly-{% evaluatly_version %}.js"></script>
    <script>
        Evaluatly.loadVar({
            "hash": "example/form-send",     
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
                                    {"next_page": true}
                                ]
                            }
                        ]
                    },
                    {
                        "items": [
                            { "type": "image", "src": "{% root %}/static/img/ok.png" },
                            { "type": "title", "value": "Your message was sent, {{name}}" }
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

