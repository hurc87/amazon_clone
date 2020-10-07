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

## Cloud functions

- firebase init
- Go do to Functions and follow instructions
- cd into newly created functions folder

### Create an express server which will be pushed and hosted by cloud functions

- npm i express
- npm i cors

Create the usual express file you would usually. To then start the server locally:

- firebase emulators:start

This will give you a URL for your express server api.

### To deploy

To deploy the backend only:

- firebase deploy --only functions

To deploy front end only:

- npm run build (to make sure latest code is in the build)
- firebase deploy --only hosting

## Random notes

- Type `rfce` into a blank js file and it will create the component template (when the ES7 snippet extension is added in VS code)
- Components would start with a capital letter.
- Naming of the components have followed BEM convention, so eg the main container would be the same class name as the component, then each child element would be an extension of the higher containers class name.

```
  <div className="orders">
    <h1 className='orders__title'>Your orders</h1>
    <div className="orders__description"><p>Order List</p></div>
  </div>
```

- UseEffect would need to be imported from React and if the bracket is left empty the code will only run once when the component loads, however if like our example a user variable is in the brackets, the code will run each time there is a change to the user.

```
  useEffect(() => {
     // code to run here
    }
  }, [user]);
```

- Optional chaining => user?.email , means if there is an error with the user, it will handle the error instead of throwing it. This can help when we are calling variables which have not fully loaded yet.

- UseStateValue() => this would be imported from the StateProvider.js file which wraps the code for the reducer. We would then use a dispatch, to send things to the reducer to alter state. State is almost like a data layer which allows the whole of the app to access the data.

- If using useState(), this needs to be imported from React, but allows us to create our own hooks. However when we create the hooks, we would need to give it a default.

```
const [email, setEmail] = useState('');
```
