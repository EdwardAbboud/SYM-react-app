# SYM-State Your Mind

Every user is able to create a post. This post will have two inputs the beginning and then the statement finishing the sentence. The statements will be sorted by most up-voted. If any other user should like that statement they can create another tag-line to it and it will be added to the thread. A statement (thread) should have an expiration date if not updated (commented on) for about 24h, it should be deleted. Each user is able to create their own new thread or comment on an existing one. The comments will also be sorted by most liked (by default). the user might want to have the option to post anonymously.

Check out a deployed version below.
[Deployed version](https://sym-react-app-w9vk.onrender.com/)

# Screenshots

<div>
    <p>Screenshot 1/4</p>
    <img src="https://github.com/EdwardAbboud/SYM-react-app/blob/main/client/src/assets/Screenshots/SS1.png"/>
    <p>Screenshot 2/4</p>
    <img src="https://github.com/EdwardAbboud/SYM-react-app/blob/main/client/src/assets/Screenshots/SS2.png"/>
    <p>Screenshot 3/4</p>
    <img src="https://github.com/EdwardAbboud/SYM-react-app/blob/main/client/src/assets/Screenshots/SS3.png"/>
    <p>Screenshot 4/4</p>
    <img src="https://github.com/EdwardAbboud/SYM-react-app/blob/main/client/src/assets/Screenshots/SS4.png" />
</div>

## 1. Setup

First, to setup all the directories run the following in the main directory:

`npm install`
`npm run setup`

Copy the .env files and make sure the credentials are correct

To run the app in dev mode you can run the following command in the main directory:

`npm run dev`

## 2. Code structure

```
client
├── public
└── src
|   └── __tests__
|   └── __testUtils__
|   └── components
|   └── hooks
|   └── pages
|       └── __tests__
|       └── components
|   └── util
|   index.jsx
cypress
|   └── fixtures
|   └── integration
|   └── plugins
|   └── support
server
└── src
    └── __tests__
    └── __testUtils__
    └── controllers
    └── db
    └── models
    └── routes
    └── util
    index.js
```

