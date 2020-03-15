# React 2 Lesson 1 - PropTypes

This module will continue from the previous one.

If you completed the code in the previous lessons you can continue from there, otherwise pull/download the [step-7 branch](https://github.com/javascript-repositories/react-module-1-code/tree/step-7) from the repo.

To start the app run:

```js
npm install
npm start
```

## PropTypes

When we passed values in to the components in module 1 we didn't do any checks in the components to see what kind of values we were passing in, we simply assumed they were of the correct type and used them.

Using `PropTypes` (property types) we can check that we are passing
in the correct value types so that we don't, for example, try to do arithmetic on strings or print objects.

In this lesson we will look at testing for the following data types:

- `String`
- `Number`
- `Boolean`


The `Heading` component (`src/components/layout/Heading.js`) has one prop called `title` that we assume has a string value and render inside `h1` tags. If we passed in a number it wouldn't be a big deal, the number would be printed just like a string.

Try send the prop values below into the `Heading` component from the `Home` component.

> Remember, the way to pass in values other than strings is between curly braces `{}`

```jsx
<Heading title={7} />
```

If we passed in a boolean value, nothing would display, the value is not converted to a string.

```jsx
<Heading title={true} />
```

If we passed in an object we would get an error:

```jsx
const emptyObject = {};

return (
    <Heading title={emptyObject} />
);
```

<img src="/images/js-frameworks/prop-types-error.png" alt="PropTypes error" style="max-width: 617px" />

We want to make sure the value passed in to the title prop is a `string`. Let's use `PropTypes` to do that.

At the top of the `Heading` component, import `PropTypes` from its package:

> The prop-types package is installed by Create React App, you don't need to install it.

```js
import React from "react";
import PropTypes from "prop-types";
```

Now we can set the `propTypes` (small p) property of our component to be an object whose properties are the props we are checking for:

```jsx
Heading.propTypes = {
	title: PropTypes.string
};
```

The prop we are checking is `title` so that is a property in the object and we check its value is a string using `PropTypes.string`.

Now if we pass a number into the title prop in the Home component the console will display a warning:

<img src="/images/js-frameworks/prop-types-warning.png" alt="PropTypes warning" style="max-width: 617px" />

Change the value back to a string and the warning will disappear.

### Required props

We can add an `isRequired` property after the value type so that we'll receive a warning if we don't supply a value for it:

```jsx
Heading.propTypes = {
	title: PropTypes.string.isRequired
};
```

Now if we didn't supply a `title` prop to `Heading` we'd get a warning.

```jsx
// no title prop supplied
return <Heading />;
```

<img src="/images/js-frameworks/prop-types-missing.png" alt="PropTypes missing" style="max-width: 617px" />

Final code for `src/components/layout/Heading.js`:

```jsx
import React from "react";
import PropTypes from "prop-types";

function Heading({ title }) {
	return <h1>{title}</h1>;
}

Heading.propTypes = {
	title: PropTypes.string
};

export default Heading;
```

The `Double` component has one prop, called `number`. Because we mulitply its value by 2 inside the component we should make sure it is supplied and that it is a number.

We'll import `PropTypes` and then add a `propTypes` object to the component with `number` as a property:

```jsx
import React from "react";
import PropTypes from "prop-types";

function Double(props) {
	let answer = props.number;

	if (props.multiply === true) {
		answer = props.number * 2;
	}

	return <div className="answer">{answer}</div>;
}

Double.propTypes = {
	number: PropTypes.number.isRequired
};

export default Double;
```

The `Paragraph` component renders its `children` property between `p` tags. The children could be anything that can be rendered (strings, numbers, arrays or elements). We can use the `node` property as the prop type.

```jsx
import React from "react";
import PropTypes from "prop-types";

function Paragraph({ children }) {
	return <p>{children}</p>;
}

Paragraph.propTypes = {
	children: PropTypes.node.isRequired
};

export default Paragraph;
```

The types you will commonly check for include:

- `PropTypes.string`
- `PropTypes.number`
- `PropTypes.bool`
- `PropTypes.array`
- `PropTypes.func`
- `PropTypes.object`
- `PropTypes.node`

You can check for an array of types using

- `PropTypes.arrayOf(PropTypes.string)`

Substitute the type you want to check for in the brackets.

---

This kind of type checking is quite basic, but it is a good way to catch potential errors and bugs in your code while you are developing. Libraries like TypeScript provide more sophisticated type-checking.

---

You can read more about PropTypes in the [offical docs](https://reactjs.org/docs/typechecking-with-proptypes.html).

## Constants

It's always a good idea to store values that you will reuse as `constants`. This is not React-specific but good practice regardless of the language or framework you are using.

It means you can avoid mistakes typing or pasting the same value in multiple places and if you want to change it you only need to make the change in one place.

Create `src/constants/api.js` and add the base URL we will use for the API calls in the next lessons.

```js
export const BASE_URL = "https://rickandmortyapi.com/api/character/";
```

We are creating and exporting the variable `BASE_URL` that we will import and use in other components.


## State

In React components have `state` and `lifecycle events`. 

You can think of `state` as variables created in and belonging to a component. This is contrast to `props` which are variables that are passed in to components.

## Lifecycle events

These are events that happen to a component during the time it is added and eventually removed from the browser.

There are three phases of events:

- `mounting`
- `updating`
- `unmounting`

An event called `componentDidMount` occurs at the end of the mounting phase and is a good place to do things like make an API call. 

Once the API call returns with data, this data could be added to the component state and used to create the component's UI.

Previously classes were used to handle lifecycle events, but `hooks` are now the preferred way to deal with them.

> You can read more about lifecycle events in the [official docs](https://reactjs.org/docs/react-component.html#the-component-lifecycle).
>
> <a href="http://projects.wojtekmaj.pl/react-lifecycle-methods-diagram/" target="_blank">Link to a Lifecycle diagram</a>.


## Hooks

Hooks are a relatively new addition to React but are now the recommended way to handle state and lifecyle events.

They are functions that can be exceuted during lifecycle events and used to update state.

In the next lesson we will use a hook to make an API call.

[step-8]((https://github.com/javascript-repositories/react-module-1-code/tree/step-8)) of the repo contains the code added so far.

---

### Practice

- Add PropTypes to the `Button`, `Division` and `Subheading` components. You will need to add two PropType checks in `Division`. Make all the props required.

---

The code for this can be found on [this branch](https://github.com/javascript-repositories/react-module-1-code/tree/step-9).


---

[Go to lesson 2](2) 

--- 