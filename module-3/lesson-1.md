# Lesson 1 - React fundamentals

We're going to use Create React App to create a new app. 

> *[From the official docs:](https://create-react-app.dev/docs/getting-started/#quick-start)* If you've previously installed `create-react-app` globally via `npm install -g create-react-app`, we recommend you uninstall the package using `npm uninstall -g create-react-app` to ensure that npx always uses the latest version.

In the folder you keep your other projects, run the following in your terminal or command line:

```js
    npx create-react-app noroff-react
```

In the above command, `create-react-app` is the command that will create the app and `noroff-react` is the name of the project and the folder it will create. You can change this name when you create your own projects.

Change into the `noroff-react` directory and start the app:

```js
    cd noroff-react
    npm start
```

> 

This will start your app at [http://localhost:3000](http://localhost:3000) (or another port if 3000 is already in use).

## App structure

Open the project in your editor and the above link in your browser.

`create-react-app` has installed a whole lot of packages (in the `node_modules` folder) and created our first component called `App` in the `src` directory. All the code we will write will go in the `src` directory.

Open `src/App.js`. This is our first component. It's a function called `App` and it will render on the page whatever we return from it.

Delete everything between and including the `<header>` tags and replace them with an `<h1>` tag with the text `Noroff React`.

```jsx
function App() {
    return (
        <div className="App">
            <h1>Noroff React</h1>
        </div>
    );
}
```

Hit save and check your browser. The page will automatically reload when you make changes to the code.

### How it workss

Inside `src/index.js` the `App` component is imported and rendered to a DOM element with the id of root.

```jsx
ReactDOM.render(<App />, document.getElementById("root"));
```

This DOM element is found in `public/index.html`.

```html
<div id="root"></div>
```

`App` will be our parent component and all our other components will live inside it in a tree structure.

![App Structure](/images/app-structure.png)

### ESlint

`create-react-app` has included [ESlint](https://create-react-app.dev/docs/setting-up-your-editor) for us. This will give us feedback on our code in the browser console, the terminal/command line where we started the app, or directly in our editor if we install a plugin. If you are using VSCode you can install its [ESLint extension](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint).

_Always_ check the ESlint output if you run into any errors.

Because we deleted those lines of code above, you should see a warning in your console about unused code:

```html
'logo' is defined but never used
```

This is a warning and not an error, so it won't break your app, but it's good practice to keep your code warning-free. Delete the line that imports the logo and the warning will go away.

```js
import logo from "./logo.svg";
```

## Styling

Our React app is using **CSS modules** for styling. This is the default way to handle styling in an app created with `Create React App`. In `App.js` we are importing `App.css`. With CSS modules, imported CSS files are only applied to the component in which they are imported. We can set global styles in `index.css`.

We aren't going to do much styling in this course and will rely mostly on Bootstrap for our styles.

## JSX

Above, we edited what was returned from our `App` component. This looked like HTML but is actually something called JSX. Under the hood it's all JavaScript, and is a way to mix variables and markup to build the output of our component.

Let's see how we can mix these together.

In `src/App.js`, let's add a variable and then use it within our JSX in the return statement.

```jsx
function App() {
    const title = "Noroff React";

    return (
        <div className="App">
            <h1>{title}</h1>
        </div>
    );
}
```

We've moved the text "Noroff React" into a variable called `title`. Within our return statement we can output that variable by enclosing it in curly braces: `{}`.

## Function components

There are two kinds of React components: function and class components. As a general rule, use function components unless you have to use a class.

`create-react-app` generated a function component for us, `App`. Let's create our own.

In the `src` directory, create a new folder called `components`. All your components will go in sub-folders in this directory. In `components` create a sub-folder called `layout`, and inside this folder create a file called `Heading.js`.

> As a rule, we'll name our components with a capital letter first, and every other folder and file using camelCase.

![First component](/images/2-first-component.png)

Inside this file create a function called `Heading` which takes one argument called `props`.

```js
function Heading(props) {}
```

`props` is how we pass properties into React components. It is an object called `props`:

```js
const props = {
    title: "Hello",
};
```

In our first component we are going to expect a property called `title` to be passed in, `props.title`.

As this is a Heading component, let's return the title that gets passed in inside an `<h1>` tag:

```jsx
function Heading(props) {
    return <h1>{props.title}</h1>;
}
```

Every time we use `jsx` we need to make sure we have imported React into the file. Add this at the top of the file:

```js
import React from "react";
```

Finally, we need to export this component from this file so that we can import it in other files. We can export it inline with the function declaration or at the end.

```js
import React from "react";

export default function Heading(props) {
    return <h1>{props.title}</h1>;
}
```

or

```js
import React from "react";

function Heading(props) {
    return <h1>{props.title}</h1>;
}

export default Heading;
```

Use whichever method you find most readable.

We can now import this component in any other file and use it within any component.

Back in `src/App.js`, import our `Heading` component:

```js
import Heading from "./components/layout/Heading";
```

We pass in props to components using JSX attributes that look like HTML attributes except we decide what they'll be called. Our `Heading` component is expecting a `title` property, so let's send that in:

```jsx
<Heading title="Title from a prop" />
```

Replace the line

```jsx
<h1>{title}</h1>
```

with our `Heading` component.

```jsx
return (
    <div className="App">
        <Heading title="Title from a prop" />
    </div>
);
```

In the browser there will be an `<h1>` tag with the string we passed in as the prop. Remember to check the console for errors if you see a blank screen.

We still have that title variable we declared before:

```js
const title = "Noroff React";
```

We can pass this in as the value for the title prop by using curly braces:

```jsx
<Heading title={title} />
```

Change the value of the title variable and watch the browser for updates to reinforce how we are passing data into the component we built.

## Fragments

A component can only return one parent tag. If, for example, you wanted to return two `p` tags, this would throw an error:

```jsx
return (
    <p>First paragraph</p>
    <p>First paragraph</p>
)
```

You could place them in a parent `div` if it made styling sense:

```jsx
return (
    <div className="paragraphs">
        <p>First paragraph</p>
        <p>First paragraph</p>
    <div>
)
```

but if you didn't need that extra div for any styling reasons, you could enclose the two `p` elements in `fragments`.

Fragments look like empty tags: `<></>`

```jsx
return (
    <>
        <p>First paragraph</p>
        <p>First paragraph</p>
    <>
)
```

---

## Practice

Practise creating components by building the following (we won't use your code going forward, this is only for practice):

-   A `Subheading` component that receives a `title` prop and renders the prop's value inside an `h2` tag
-   A `Paragraph` component that receives a `text` prop and renders it inside a `p` element
-   A `Button` component that receives a `label` prop and renders it inside a `button` element
-

Create them in separate files inside the layout folder. Import and render them in `App.js`.

```js
import React from "react";
import Heading from "./components/layout/Heading";
import Subheading from "./components/layout/Subheading";
import Paragraph from "./components/layout/Paragraph";
import Button from "./components/layout/Button";
import "./App.css";

function App() {
    const title = "Noroff React";

    return (
        <div className="App">
            <Heading title={title} />
            <Subheading title="This is a sub-heading" />
            <Paragraph text="This is a paragraph" />
            <Button label="This is a button" />
        </div>
    );
}

export default App;
```

---
[Go to lesson 2](lesson-2) 
---