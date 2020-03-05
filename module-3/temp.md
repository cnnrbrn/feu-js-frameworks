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

There are two kinds of React components: function and class components. As a general rule, use function components.

`create-react-app` generated a function component for us, `App`. Let's create our own one.

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

We pass in props to components using JSX attributes that look like HTML attributes except we decide what they'll be called, unlike HTML attributes. Our `Heading` component is expecting a `title` property, so let's send that in:

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

In the browser there will be an `<h1>` tag with the value we passed in as the prop. Remember to check the console for errors if you see a blank screen.

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
