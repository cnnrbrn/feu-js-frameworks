# React 1 Lesson 2 - Components

React is concerned with building user interfaces - that is its primary function. Other functionality such as forms and data management is added to projects through 3rd party libraries.

React creates user interfaces through components.

There are two kinds of React components: function components and class components. 

Using function components is currently the preferred way of building components and this is the way we will use components in the lessons.

---

## Creating a component

`create-react-app` generated a function component for us, `App`. Let's create our own one.

Arranging components sensibly is very important.

We will only keep one component in a file and we'll try to keep each component small. Building and maintaining big components quickly becomes difficult.

One of the main reasons that frameworks like React, Angular and Vue have become so popular is that they allow developers to organise code in small, easy-to-maintain files.

In the `src` directory, create a new folder called `components`. All our components will go in sub-folders in this directory. In the `components` folder, create a sub-folder called `layout`, and inside this folder create a file called `Heading.js`.


<img src="/images/js-frameworks/react-first-component.png" alt="Heading component" style="max-width: 315px" />

> Note: All React components must start with a capital letter.
> 
> As a rule, we'll name our components with a capital letter first, and every other folder and file using <a href="https://techterms.com/definition/camelcase" target="_blank">camelCase<a/>.


Inside `src/components/layout/Heading.js`, enter the following code:

```js
import React from "react";

function Heading() {
	return <h1>Noroff React</h1>;
}

export default Heading;
```

In the code above, we

- import React from the `react` package
- create a function called `Heading` - the name must begin with a capital letter
- return an `h1` tag with the value of `Noroff React` from the function
- and finally export the `Heading` function so that we can import it in other files

Wel'll now import and use it in the `App` component.

In `src/App.js`, import the Heading component from it's folder:

```js
import React from "react";
import logo from "./logo.svg";
import Heading from "./components/layout/Heading";
import "./sass/style.scss";
```

To render a component inside another component, we use its name inside angle brackets:

```html
<Heading></Heading>
```

Because there is nothing between the two component tags, we can use the shorthand version:

```html
<Heading />
```

In the return statement of the App component, remove everything between `<div className="App">` and its closing tag and insert the `<Heading />` component.

```js
function App() {
	return (
		<div className="App">
			<Heading />
		</div>
	);
}
```

If you check your browser, the `<h1>` tag with the value `Noroff React` will be displayed on the page.

<img src="/images/js-frameworks/react-h1.png" alt="Heading" style="max-width: 333px" />

> #### Another ESlint note
>
> Because we deleted those lines of code above, you should see a warning in your console about unused code:
>
> ```html
> 'logo' is defined but never used
> ```
>
> This is a warning and not an error, so it won't break your app, but it's good practice to keep your code warning-free. Delete the line that imports the logo and the warning will go away.
>
> ```js
> import logo from "./logo.svg";
> ```

Back in `src/components/layout/Heading.js`, let's move the value between the `h1` tags to a variable:

```js
import React from "react";

function Heading() {

    const title = "Noroff React heading as a variable";

	return <h1>{title}</h1>;
}

export default Heading;
```

Above, we've created the varible `title` and assigned it a value.

Then we've rendered the contents of the variable inside the JSX by placing it between curly braces `{}`.

Any time you want to output variables or loop through variables inside JSX, you place the code inside curly braces.

> Remember to watch the browser for changes as you save your code.



Let's add another variable and output it:

```js
import React from "react";

function Heading() {
    const title = "Noroff React heading as a variable";
	const subtitle = "This is the subtitle";

	return (
		<div>
			<h1>{title}</h1>
			<h2>{subtitle}</h2>
		</div>
	);
}

export default Heading;

```

Above we've added a second variable called `subtitle` and are outputting it between `h2` tags.

Because a component can only return one parent element, we have wrapped both the `h1` and the `h2` elements in a `div`.

This means there will be an extra `div` in the HTML output on the page. To avoid this extra element we can use `fragments`.

Fragments look like empty tags: <></>

```js
return (
    <>
        <h1>{title}</h1>
        <h2>{subtitle}</h2>
    </>
);
```

More on fragments <a href="https://interactive-content.now.sh/react/components/fragments">here</a>.


## props

There isn't a lot of point assiging the values to variables and then rendering them inside curly braces like we are currently doing in the `Heading` component, and the component will always return the same value inside its JSX.

Most of the time you want to pass in variables to components and have them render what you pass in.

This is where `props` come in.

In `src/App.js`, change 

```jsx
<Heading />
```

to 

```jsx
<Heading title="Title from prop"/>
```

We've added a prop(erty) called `title` with a value of `Title from prop`.

The `title` prop will now be available in the `Heading` component.

`props` is an objected called `props` that is available to each component.

In `src/components/layout/Heading.js`, update the code to this:

```js
import React from "react";

function Heading(props) {
	const subtitle = "This is the subtitle";

	console.log(props);

	return (
		<>
			<h1>{props.title}</h1>
			<h2>{subtitle}</h2>
		</>
	);
}

export default Heading;
```

We added `props` inside the function brackets so that we can use the `props` object inside the function.

When you console log `props` you can see it is an object and has one property called `title`:

```js
{title: "Title from prop"}
```

This is what we are passing in when call the component from `src/App.js`.

We can then use `props.title` inside the `h1` tags instead of the local variable we had before.

Let's do this for `subtitle` too. 

We'll add the prop in `App.js`

```jsx
<Heading title="Title from prop" subtitle="Subtitle from prop" />
```

And use it in `Heading.js`:

```js
function Heading(props) {
	return (
		<>
			<h1>{props.title}</h1>
			<h2>{props.subtitle}</h2>
		</>
	);
}
```

Change the values of the of the values you pass in as the props in `App.js` and you will see the browser update the new values displayed.

### destructuring props

We can use object destructuring to access the prop values and avoid having to repeatedly use the `props` keyword.

The `Heading` component updated to use destructuring would look like this:

```js
import React from "react";

function Heading({ title, subtitle }) {
	return (
		<>
			<h1>{title}</h1>
			<h2>{subtitle}</h2>
		</>
	);
}

export default Heading;

```

We place the variables we are looking to use inside curly braces and then we can use them directly without needing to use `props`.



## props.children

If you pass a value inside the opening and closing tags of a component, the value will be available as a proprty called `children`.

To demonstrate this, we'll create another component called `Paragraph`. 

Create the following file: `src/components/layout/Paragraph.js`.

Inside place the following:

```js
import React from "react";

function Paragraph(props) {
	return (
        <p>{props.children}</p>
    );
}

export default Paragraph;
```

Or using destructurin:

```js
import React from "react";

function Paragraph({ children }) {
	return (
        <p>{children}</p>
    );
}

export default Paragraph;
```

This component will render whatever we pass in between its opening and closing tags.

In `src/App.js`, import the component and then use it inside the return statement:


```js
import React from "react";
import Heading from "./components/layout/Heading";
import Paragraph from "./components/layout/Paragraph";
import "./sass/style.scss";

function App() {
	return (
		<div className="App">
			<Heading title="Title from prop" subtitle="Subtitle from prop" />

			<Paragraph>
				This will be the children prop inside the component.
			</Paragraph>
		</div>
	);
}

export default App;
```

The value `This will be the children prop inside the component.` will be rendered wherever `props.children` is placed inside the component.

### Components as children

Let's add a `Layout` component and pass in the other components as its children.

Create the following file: `src/components/layout/Layout.js`.

Add the following inside:

```js
import React from "react";

function Layout({ children }) {
	return (
        <div className="layout">
            {children}
        </div>
    );
}

export default Layout;
```

We'll also add some styles for the `.layout` class in `src/sass/partials/style.scss`:

```scss
@import "partials/_variables";

.layout {
	width: 100%;
	max-width: 800px;
	padding: 30px;
	background: #ebebeb;
	margin: 0 auto;
}
```

Finally, in `src/App.js` import the `Layout` component and wrap the other components in this component:

```js
import React from "react";
import Heading from "./components/layout/Heading";
import Paragraph from "./components/layout/Paragraph";
import Layout from "./components/layout/Layout";
import "./sass/style.scss";

function App() {
	return (
		<Layout>
			<Heading title="Title from prop" subtitle="Subtitle from prop" />

			<Paragraph>This will be the children prop inside the component.</Paragraph>
		</Layout>
	);
}

export default App;
```


<!-- ---

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
``` -->
