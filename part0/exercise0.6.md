sequenceDiagram
participant browser
participant server

    Note right of browser: User inputs a new note and click the Save button.
    browser-->>browser: The input data is pushed to the notes, and the notes DOM is redrawn with the notes
    Note right of browser: Send the input data to the server

    browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/new_note_spa
    activate server
    server-->>browser: {"message":"note crated"}
    deactivate server
