Here is the diagram when the user creates a new note on [the page](https://studies.cs.helsinki.fi/exampleapp/notes):

```mermaid
sequenceDiagram
participant browser
participant server

    Note right of browser: User inputs a new note and click the Save button. The browser will send the input to server as a payload
    browser->>server: POST https://studies.cs.helsinki.fi/exampleapp/new_note, payload: note:xxx
    activate server

    server-->>browser: Status code: 302, (Location: https://studies.cs.helsinki.fi/exampleapp/notes)
    deactivate server

    Note right of browser: The browser redirects to the Location which server asked the browser to do

    browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/notes
    activate server
    server-->>browser: HTML document
    deactivate server

    browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/main.css
    activate server
    server-->>browser: the css file
    deactivate server

    browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/main.js
    activate server
    server-->>browser: the JavaScript file
    deactivate server

    Note right of browser: The browser starts executing the JavaScript code that fetches the JSON from the server

    browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/data.json
    activate server
    server-->>browser: [{ "content": "HTML is easy", "date": "2023-12-15" }, ... ]
    deactivate server

    Note right of browser: The browser executes the callback function that renders the notes
```
