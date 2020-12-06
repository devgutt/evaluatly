```INI META
includes = index.html.md menu menuTop
title = Page
base = docs.html
slug = page
```

```MD SUBMENU

- [Submitting forms](#submit)
- [Payments](#payments)

```

```MD BODY

A story page that contains the [items](/docs/ref/items.html) to be displayed.

### Attributes

**`page_id`**  _optional_   

The unique identifier of the page.

**`style`** _optional_

Style to be applied to the whole page as CSS key-value pairs. 

The values can be a literal value or a single [command](/docs/ref/commands.html) call returning a literal value.

**`style_content`** _optional_

Style to be applied to the page content as CSS key-value pairs. 

The values can be a literal value or a single [command](/docs/ref/commands.html) call returning a literal value.

**`items`**   

List of the [items](/docs/ref/items.html) of the page.

**`submit`**  _optional_   

Options for submitting forms. See more in [Submitting forms](#submit) bellow.

**`history`**  _optional_     

Indicates whether to add the page to the backlist.

Values: `true` (default) or `false`

#### `env`

Environment attributes:

**`show_back`**  _optional_

Indicates whether or not to show the back button on the page.

Values: `true` (default) or `false`

**`show_logo`**  _optional_

Indicates whether or not to show the logo image, if it exists.

Values: `true` (default) or `false`

#### `progress` _optional_

Progress bar attributes:

**`show`** 

Indicates whether or not to show the progress bar on the page. Defaults to the `story.progress.show`.

**`value`** _optional_

Percentage number of progress, from 0 to 100. Defaults to the progress of the page.

**`style`** _optional_

Style to be applied to the progress bar as CSS key-value pairs. 

The values can be a literal value or a single [command](/docs/ref/commands.html) call returning a literal value.

### Example

```JSON
 {
    "page_id": "page_start",
    "style": {
        "background_color": "#DAFFEF",
        "align": "center"
    },
    "progress": {
        "show": true,
        "value": 33
    },
    "items": [
        { "type": "title", "value": "The Story" },
        { "type": "p", "value": "This is the story of a boy..." },
        { "type": "button", "label": "Next", "program": {"next_page": true} }
    ]
}
```

## [#](#submit) {#submit} Submitting forms {.group}

Process and save form information to variables.

> Tip: To send information to the server, use the [`call`](/docs/ref/commands.html#call) command.

#### Attributes

 **`program`**   

One or more [commands](/docs/ref/commands.html) to execute, after processing and saving the variables.

**`label`**   

Submission button label.

**`input_submit`**  _optional_

Transfers the form submission to the input elements. Defaults to `false`.

> For single-input forms, set this option to `true` to highlight the input and transfer the submission to the element. ✨

**`payment`**  _optional_

Information to create a checkout page to receive payments. Check the [Payments](#payments) section below for more details.

#### Examples

Page with multiple input elements:

```JSON
{
    "items": [
        { "type": "title", "value": "Contact Us" },
        { "type": "name", "label": "Name", "save_key": "name", "required": true },
        { "type": "email", "label": "Email", "save_key": "email", "required": true },
        { "type": "textlong", "save_key": "msg", "label": "Message", "required": true }
    ],
    "submit" : {
        "label": "Send Message",
        "program":  [
            {"next_page": true}
        ]
    } 
}
```

Page with a single input element using `input_submit`:

```JSON
{
    "items": [
        { "type": "question", "value": "What's your name?" },
        { "type": "name", "save_key": "name", "required": true}
    ],
    "submit" : { 
        "label": "Next", 
        "input_submit": true,
        "program": [ {"next_page": true} ] 
    }  
}
```

---------------------------------------------------------------

## [#](#payments) {#payments} Payments {.group}

This section explains how to create a checkout page to receive payments with credit and debit cards.

> The payment is processed using <a href="https://stripe.com" target="_blank">Stripe</a>.

#### Attributes

**`pk`**   

The _publishable key_ provided by Stripe to receive payments. 

> If you don't have a Stripe account yet, create one on their <a href="https://stripe.com" target="_blank">website</a>.

**`endpoint`**   

The URL to be called to fetch the payment information. The URL can be an absolute or relative path.

**`save_key`**  _optional_

Key to save the payment information in the data table. Defaults to "`payment_ok`".

**`required`**  _optional_

Indicates whether the payment is required. The default is `true`.

**`data`** 

Keys of the variables containing the buyer's information to be submitted with the payment:

Parameter       | Description
:---            | :---
`name`          | Key of the variable containing the name of the buyer.
`email`		    | Key of the variable containing the email of the buyer.
`receipt_email` | Key of the variable containing the email that will be used by Stripe to send the receipt for the buyer. See more about email receipts at <a href="https://stripe.com/docs/receipts" target="_blank">Stripe</a>.

#### Example

```JSON
{
    "items": [
        { "type": "title", "value": "Payment" },
        { "type": "name", "label": "Name", "save_key": "name_buyer", "autoFocus": true, "required": true},
        { "type": "email", "label": "Email", "save_key": "email_buyer", "required": true},
        { "type": "p", "value": "Your credit card will be charged **$45**" },
        { "type": "card" }
    ],
    "submit": {
        "label": "Buy",
        "program": {"next_page" : true},
        "payment": {
            "pk": "< YOUR PUBLISHABLE KEY >",
            "endpoint": "/api/endpoint/payment",
            "data": {
                "name": "name_buyer",
                "email": "email_buyer",
                "receipt_email": "email_buyer"
            }
        }
    }
}
```

Check the payment [demo](/demo/payment).


#### [](#pay-server) {#pay-server} Server processing

To complete the payment you need to create a `secret` token on the server-side to secure and validate the transaction.

** Request **

A __`POST`__ request will be called on the URL endpoint, using the `endpoint` attribute.

The following parameters will be sent in the __`BODY`__ of the request:

Parameter       | Description
:---            | :---
`origin`        | The protocol, hostname, and port number of the caller's URL.

** Response **

The server must respond with a JSON message containing the following parameters:

Parameter       | Description
:---            | :---
`ok`            | `true`
`res.secret`    | Token used to complete the payment.
`res.title`		| Title of the item.

> The `secret` is created using the _secret key_ associated with the _publishable key_ provided by Stripe.
> For more information on how to create the secret, consult the 
> <a href="https://stripe.com/docs/payments/accept-a-payment#web-create-payment-intent" target="_blank">Stripe documentation</a>.

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
    "res": {"secret": "** secret generated **", "title": "Item 1"}
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

#### Payment successfull

After the payment is accepted, a variable with the key informed on **`save_key`** attribute is created on the data table.

The following properties are saved on the variable:

Property       | Description
:---            | :---
`id`	        | The payment id provided by Stripe. 
`amount`        | The amount of the payment.
`currency`		| The currency of the payment. 
`title`	        | The title of the item. 

These variables can be retrieved using [Data commands](/docs/ref/commands.html#data).

Example:

```JSON
{ "type": "p", "value": "The item {{payment_ok.title}} was purchased. Payment ID: {{payment_ok.id}}" }
```

```

