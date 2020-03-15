# React 2 Lesson 2 - Displaying an array of results from an API call

In this lesson we will use a hook to make an API call, update the component's state with the data it returns and then loop through this data to create the UI for the component.

## The first API call

Create `src/components/characters/CharacterList.js`.

`useState` and `useEffect` are the first hook functions we'll use, so we need to import them from React. We can combine the new imports with the React import on one line.

We'll also import the API URL that we created in the previous lesson.

```js
import React, { useState, useEffect } from "react";
import { BASE_URL } from "../../constants/api";
```

Add the following code:

```js
function CharacterList() {
    useEffect(function() {
        fetch(BASE_URL)
            .then(function(response) {
                return response.json();
            })
            .then(function(json) {
                console.dir(json);
            })
            .catch(function(error) {
                console.log(error);
            });
    }, []);

    return null;
}

export default CharacterList;
```

We're going to rewrite the hook using fat arrow functions but you can use whichever syntax your prefer:

```js
useEffect(() => {
    fetch(BASE_URL)
        .then(response => response.json())
        .then(json => console.dir(json))
        .catch(error => console.log(error));
}, []);
```

The `useEffect` hook allows us to perform "side effects" like API calls in our function component. 

`useEffect` runs every time the component renders, both the first time and after every update. 

Components get re-rendered every time their state changes. We only want the API call to run after the first render, not every time, otherwise we would end up in an endless loop.

The empty array `[]` as the second argument passed to `useEffect` will cause it to run only after the first render.

The full code for `CharacterList` so far:

```jsx
import React, { useState, useEffect } from "react";
import { BASE_URL } from "../../constants/api";

function CharacterList() {
    useEffect(() => {
        fetch(BASE_URL)
            .then(response => response.json())
            .then(json => console.dir(json))
            .catch(error => console.log(error));
    }, []);

    return null;
}

export default CharacterList;
```

We are returning `null` at the moment so wherever this component is imported and used there won't be any visual indication, but the console log in the second `then` will still run.

In `src/components/home/Home.js` component, import `CharacterList` and render it beneath the heading. We will need to add fragments too and we'll change the title prop in `Heading`.

```js
import React from 'react';
import Heading from "../layout/Heading";
import CharacterList from "../characters/CharacterList";

function Home() {
    return (
        <>
            <Heading title="Rick and Morty" />
            <CharacterList />
        </>
    );
}

export default Home;
```

If you look in the console, the call returns a json object with an array of character objects on a property called `results`. We need to store that array in the component's state and then loop through it in our return statement.

#### useState

The `useState` hook (function) allows us to create properties in the component's state object as well as functions to use to update the properties' values.

Add a `useState` hook above the `useEffect`:

```js
const [characters, setCharacters] = useState([]);
```

With this code we are creating a property called `characters` and a function called `setCharacters` that we can use to update that property. The empty array `[]` is the initial value for `characters`.

So we are creating a property called `characters` and a function called `setCharacters` to update the value of `characters`. We give it an initial value of an empty array so that our looping code doesn't break before the `characters` value has been set.

Change the second `then` method to call the `setCharacters` function and pass the results in as an argument:

```js
.then(json => setCharacters(json.results))
```

This will store the value of the `json.results` array in the `characters` state property.

We can use `characters` as a normal variable.

The `map` array method loops over an array and creates another array from it. The code below will loop over the `characters` array and create an array of `li` tags using the `id` and `name` properties of the objects inside the `characters` array.

```js
return (
    <ul>
        {characters.map(character => (
            <li key={character.id}>{character.name}</li>
        ))}
    </ul>
);
```

Full code:

```js
export default function CharacterList() {
    const [characters, setCharacters] = useState([]);

    useEffect(() => {
        fetch(BASE_URL)
            .then(response => response.json())
            .then(json => setCharacters(json.results))
            .catch(error => console.log(error));
    }, []);

    return (
        <ul>
            {characters.map(c => (
                <li key={character.id}>{character.name}</li>
            ))}
        </ul>
    );
}
```

 The `key` attribute is important; you can remove it to see the warning ESLint will display about it being missing.

The home page now displays the first 20 names of the characters returned from the API. Because this call is paginated, we will only ever retrieve the first 20 items. We won't cover paginated calls in the lessons.


### Improving the UI

Let's add a loading spinner while the API call runs. `react-bootstrap` provides one for us:

```js
import Spinner from "react-bootstrap/Spinner";
```

Add a second `useState` hook:

```js
const [loading, setLoading] = useState(true);
```

This gives us a `loading` property and a `setLoading` method to set that property. We're giving `loading` a default property of `true`.

In the `useEffect` hook, add a finally method to set loading to `false`.

```js
.finally(() => setLoading(false));
```

The code in the finally block will run whether the call succeeds or fails - either way, loading is done.

So the `loading` property is initially set to `true` and when the API call is done it will be set to `false`.

Above the first return statement, add a second that checks if the `loading` property is true and if so returns the `Spinner` component.

```js
if (loading) {
    return <Spinner animation="border" className="spinner" />;
}
```

If the loading property is `true` return the `Spinner` component from the function. So before the API call is finished and the code in the finally block is executed, the component will return the `Spinner`.

> You can find the props you can use to change the `Spinner`'s appearance in the [libary's docs](https://react-bootstrap.github.io/components/spinners/).

If `loading` is not true, the `Spinner` won't return and our original return will run.

Full code:

```js
import React, { useState, useEffect } from "react";
import Spinner from "react-bootstrap/Spinner";
import { BASE_URL } from "../../constants/api";

function CharacterList() {
    const [characters, setCharacters] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch(BASE_URL)
            .then(response => response.json())
            .then(json => setCharacters(json.results))
            .catch(error => console.log(error))
            .finally(() => setLoading(false));
    }, []);

    if (loading) {
        return <Spinner animation="border" className="spinner" />;
    }

    return (
        <ul>
            {characters.map(character => (
                <li key={character.id}>{character.name}</li>
            ))}
        </ul>
    );
}

export default CharacterList;
```

[step-10](https://github.com/javascript-repositories/react-module-1-code/tree/step-10) of the repo contains the code added so far.

---

[Go to lesson 3](3) 

---
