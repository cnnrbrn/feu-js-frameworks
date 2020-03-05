# React 1 Lesson 1 - Introduction

In this lesson we'll cover the basics of how a React app is structured and then add Sass to the project.

---

We're going to use [Create React App](https://create-react-app.dev/docs/getting-started/) to create a new app. 

<!-- > *[From the official docs:](https://create-react-app.dev/docs/getting-started/#quick-start)* If you've previously installed `create-react-app` globally via `npm install -g create-react-app`, we recommend you uninstall the package using `npm uninstall -g create-react-app` to ensure that npx always uses the latest version. -->

In the folder you keep your other projects, run the following in your terminal or command line:

```js
npx create-react-app noroff-react
```

In the above command, `create-react-app` is the command that will create the app and `noroff-react` is the name of the project and the folder it will create. You will change this name when you create your own projects.

Change into the `noroff-react` directory and start the app:

```js
cd noroff-react
npm start
```


This will start your app at [http://localhost:3000](http://localhost:3000) (or another port if 3000 is already in use).

## App structure

Open the project in your editor and the above link in your browser.

`create-react-app` has installed a whole lot of packages (in the `node_modules` folder) and created our first component called `App` in the `src` directory. All the code we will write will go in the `src` directory.

Open `src/App.js`. This is our first component. It's a function called `App` and it will render on the page whatever we return from it.



## JSX

In React, `components` are functions that return what looks like HTML but is actually something called [JSX](https://reactjs.org/docs/introducing-jsx.html). Under the hood it's all JavaScript, and is a way to mix variables and markup to build the output of our component.

When React is done compiling and building the JSX, what will be rendered in the browser will be normal HTML, CSS and JavaScript.

If you edit and save the file the browser will automatically reload and display the changes.

> Under the hood, Create React App is using `Webpack` to configure, build and watch the project for changes. It's not something you have to worry about unless you want to add functionality that isn't covered by the default configuration.


`App` will be our parent component and all our other components will live inside it.

### The contents of App.js

Let's analyse the contents of `src/App.js`. Open the file in your editor.

There are three `import` statements at the top of the file. 

> All imports must take place before any other code.

```js
import React from "react";
import logo from "./logo.svg";
import "./App.css";
```

First we import `React` from the package `react`. We need to import `React` any time we use JSX.

Then the `logo` `.svg` file is imported, and finally a `.css` file. Importing a `.css` file like this has the same effect as linking to a CSS file in the head of an HTML page.

Next is the `App` function.

```js
function App() {
	return (
		<div className="App">
			<header className="App-header">
				<img src={logo} className="App-logo" alt="logo" />
				<p>
					Edit <code>src/App.js</code> and save to reload.
				</p>
				<a className="App-link" href="https://reactjs.org" target="_blank" rel="noopener noreferrer">
					Learn React
				</a>
			</header>
		</div>
	);
}
```

There are two notable things there.

Firstly, when adding a CSS class to an element we need to use `className` instead of `class`. `class` is a reserved word in JavaScript, and because what is being returned is JSX and therefore JavaScript, we need to use `className`.

Secondly, the variable `logo` is being embedded in the JSX using curly braces `{}`. This is how variables are inserted into JSX. More on that in the next lesson.

Finally in the file is an export statement. 

```js
export default App;
```

This statement exports the `App` function component from the file and will allow us to import it in other files using the `import` statement.

If we didn't include this statement the only place we could use the `App` component would be inside this file.


### The contents of index.js

This file is the entry point for the React application.

It imports the `App` component 

```js
import App from "./App";
```

and then renders it inside an element with an id of `root`:

```js
ReactDOM.render(<App />, document.getElementById('root'));
```

This element is found in `public/index.html`.

```html
<div id="root"></div>
```

This is how the entire React application gets inserted into an HTML page.


## Styling

Like `src/App.js`, `src/index.js` also imports a `.css` file:

```js
import "./index.css";
```

These files are importing normal, global CSS properties that will apply to the entire React app.

There are multiple other ways to apply styles to a React app.

Because you have used it previously, let's look at adding `Sass`.

### Adding Sass

To add Sass support to the project, we need to add `node-sass`.

Run the following command:

```js
npm install node-sass
```

Once that's installed, change `src/App.css` to `scr/App.scss`, and change the import statement in `src/App.js` from

```js
import "./App.css";
```

to 

```js
import "./App.scss";
```

> If an error is displayed after changing the file extension, try stopping the app and then starting it again.
>
> In the terminal: 
> `ctrl-c` or `cmd-c` to stop, 
> `npm start` to start it gain 


Change a property in the `.scss` file to see it working and the browser automatically reloading.

For example, change the `background-color` properrty value to `red` in the `.App-header` class:

```scss
.App-header {
    background-color: red;
    // other properties
}
```

With Sass added to the project, you could arrange your Sass files in partials like you have previously

<img src="/images/js-frameworks/react-sass.png" alt="Sass file arrangement" style="max-width: 656px" />


and import the main sass file in the component:

In `src/App.js`, instead of

```js
import "./App.scss";
```

you could import the Sass like this:

```js
import "./sass/style.scss";
```

The code added so far can be found on [this branch](https://github.com/javascript-repositories/react-module-1-code/tree/step-1) of the [repo](https://github.com/javascript-repositories/react-module-1-code).


You can delete `App.scss` now as it's no longer being used.

<!-- ![React Sass](/images/js-frameworks.png) -->

<!-- ![App Structure](/images/app-structure.png) -->

### A note on ESlint

`create-react-app` includes [ESlint](https://create-react-app.dev/docs/setting-up-your-editor). This will give us feedback on our code in the browser console, the terminal/command line where we started the app, or directly in our editor if we install a plugin. If you are using VSCode you can install its [ESLint extension](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint).

_Always_ check the ESlint output if you run into any problems. Most problems can be solved by reading ESlint or normal JavaScript error messages in the console.

---

In the next lesson, we will start writing our own components.

---

[Go to lesson 2](2)

---

