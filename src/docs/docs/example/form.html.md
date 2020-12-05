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
    <script src="{% cdn %}/dist/evaluatly-{% evaluatly_version %}.js"></script>
    <script>
        Evaluatly.loadVar({
            "hash": "example/form",     
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
