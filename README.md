### Requirement
Write a react application “User Hobbies” with following requirement: (Time: 1 - 2 hrs)

- There would be 2 columns both resizable and scrollable.
- In User columns, user will be listed and added.
- Right column is blank grey screen until a user is selected.
- Data should be loaded initially from the mock at http service layer. (Keeping other flow untouched as if a production
app) Once a user is selected: In Right column, user can now view, add or delete(with confirmation dialog) the hobbies.
- Hobby consist of three things mentioned below. Passion can be selected out of “Low“, “Medium“, “High“ and “Very-High“. (Pre some validation).

Tech details:
- ReactJS with Typescript (Hint: Make your own nice directory structure of data/http services)
- Use Redux store. (Choose actions nicely   )
- Mock data on Http level only.
- Create test infrastructure in Jest & enzymes and write test for at-least one functionality to demonstrate. Don’t use any Css library like bootstrap.
  Create your own nice little SASS architect
  Add some color variables and write your sass for the layout (Hint: Flexbox and modular sass)
  
Layout will be like this:
http://prntscr.com/om1tim


### `npm start`

Runs the app in the development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br>
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.<br>
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.<br>
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br>
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.


### `npm run build` fails to minify

This section has moved here: https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify
