# Amazon Clone

This is a code along tutorial following the 5 day react course hosted on Facebook by 'Clever Programmer'.

The aim is to build a serverless replica of the Amazon website using React, Stripe and Firebase.

Firebase credentials have been added to the gitignore file.

## Getting started

Run

- npm install
- npm start

Which will start the server and the app will appear on:

http://localhost:3000/

## Firebase Hosting

- npm i -g firebase-tools (only needed to be done once)
- firebase login (will redirect to a browser window to log in to your google account)
- firebase init
- Go down to Hosting and use the space bar to select then enter
- Use an existing project
- Select which project and enter
- 'What do you want to use as your public directory?' -> build
- 'Configure as a single-page app' -> y

That is all the prep work for firebase.

- npm run build (This creates an optimized production build - strips out all the bits which will slow down the app)

If any further changes are made to the app, you would need to re run the npm run build script.

- firebase deploy
  Once deployed look in the console for your deployment link.
