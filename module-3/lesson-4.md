# Lesson 4 - Fetching a specific item from an API

Check out [step-16](https://github.com/javascript-repositories/javascript-1-lesson-code/tree/step-16) branch from the [repo](https://github.com/javascript-repositories/javascript-1-lesson-code) to follow this lesson.

---

The following changes have been made to the projects files in this branch:

- The `makeGenres` and `makePlatforms` functions have been moved from `js/script.js` to a new file called `js/tags.js`.
- `js/details.js` has been added
- `details.html` has been added and loads `js/details.js` and `js/tags.js`

```html
<script src="js/details.js"></script>
<script src="js/tags.js"></script>
```

---

## Fetching details of a particular game

In `js/script.js` a `Details` link styled like a button has been added to each card:

```js
<a class="btn details">Details</a>
```

At the moment the link doesn't do anything. We want to use it to link to a details page with the game's `id` in the query string.

On the details page, we'll retrieve the id and use it in a call to the API to fetch the game's details.

First, let's add the `href` attribute including the id to the link:

```js
<a class="btn details" href="details.html?id=${games[i].id}">Details</a>
```

Now the links will take us to the details page with the game id in the query string.

```js
http://127.0.0.1:5502/details.html?id=5679
```

On `details.html`, there is a `Back to games` link and the loader.

We'll code the following in `js/details.js`.

First we'll get the query string and the params from it:

```js
const queryString = document.location.search;
const params = new URLSearchParams(queryString);
```

We'll declare a variable to hold the `id` if it exists

```js
let id;
```

We want to check if the `id` param exist and if it does, assign it to the `id` variable:

```js
if (params.has("id")) {
    id = params.get("id");
}
```

If the `id` param doesn't exist, there is no point running the rest of the code in the file, let's go back to the home page. We can redirect to the home page using 

```js
document.location.href = "/";
```

Full code so far:

```js
const queryString = document.location.search;
const params = new URLSearchParams(queryString);

let id;

if (params.has("id")) {
    id = params.get("id");
} else {
    document.location.href = "/";
}
```

We're not loading the `js/script.js` file so we'll need to create the `baseUrl` and `gamesUrl` variables here:

```js
const baseUrl = "https://api.rawg.io/api/";
const gamesUrl = `${baseUrl}games/`;
```

The format of the URL to fetch a specific game is 

`
https://api.rawg.io/api/games/id
`

so we'll create `detailsUrl` variable that includes the id:

```js
const baseUrl = "https://api.rawg.io/api/";
const gamesUrl = `${baseUrl}games/`;
const detailsUrl = `${gamesUrl}${id}`;
```

This is the URL we'll use in the `fetch`:

```js
fetch(detailsUrl)
    .then(function(response) {
        return response.json();
    })
    .then(function(json) {
        createDetails(json);
    })
    .catch(function(error) {
        console.dir(error);
    });
```


Next we'll need the `createDetails` function that we're calling from the second `then` method. This time we'll call the argument `details`.

```js
function createDetails(details) {
    console.dir(details);
}
```

If we log the `details` argument we'll see it's an object with a lot of properties about the retrieved game. 

<img src="/images/js1/game-details.png" alt="promise" style="max-width:400px">

We'll use those properties to build the page elements.

### removeChild

We need to remove the loader from the page once the API call has finished.

The container div contains the `Back to games` link as well as the loader. If we set its innerHTML property to an empty string

```js
innerHTML = "";
```

the link would disapper too, not just the loader.

We an use the `removeChild` method to remove only the loader from the DOM.

First we'll select the container and the loader:

```js
const container = document.querySelector(".container");
const loader = document.querySelector(".loader");
```

Now we'll call `removeChild` on `container` and pass in `loader` as the element to remove:

```js
container.removeChild(loader);
```

The loader will now be gone.

Full function code so far:

```js
function createDetails(details) {
    console.dir(details);

    const container = document.querySelector(".container");
    const loader = document.querySelector(".loader");
    container.removeChild(loader);
}
```

### createElement

So far we've created new HTML elements using a string and assigning it to an element's `innerHTML` property.

There is another way to create elements using the `createElement` method.

First let's create a new `h1` tag:

```js
const heading = document.createElement("h1");
console.log(heading);
// <h1></h1>
```

Let's add class to it using the `className` property rather than the `classList` object:

```js
heading.className = "details-title";
```

The `createTextNode` method allows us to create a new `text node`. The argument to the method will be text value that is created.

```js
const headingContent = document.createTextNode("Heading");
```

We can add this text node as child node the `h1` tag using the `appendChild` method:

```js
heading.appendChild(headingContent);
console.log(heading);
// <h1>Heading</h1>
```

To add this `h1` to the DOM and display it on the page, we can use the `appendChild` method again.

We'll appened it to the `container` from above:

```js
container.appendChild(heading);
```

Now the `h1` is visible on the page, but we want to display the game's name in the heading, not a static string. We can use the `details.name` property for this:

```js
const headingContent = document.createTextNode(details.name);
```

Now the game's name is displayed in the `h1`.

Using `createTextNode` and then appending it to the element is quite a verbose way to go about it.

Now that you know that way exists, let's go back to using `innerText`/`innerHTML`:

```js
heading.innerText = details.name;
```

Full function code so far:

```js
function createDetails(details) {
    const container = document.querySelector(".container");
    const loader = document.querySelector(".loader");
    container.removeChild(loader);

    const heading = document.createElement("h1");
    heading.innerText = details.name;

    container.appendChild(heading);
}
```

Let's add a div that will display the game's image as a background image.

First we create the div:

```js
const backgroundImage = document.createElement("div");
```

Then add a class to it:

```js
backgroundImage.className = "details-image";
```

Then set its background-image property as `details.background_image`:

```js
backgroundImage.style.backgroundImage = `url("${details.background_image}")`;
```

And finally append it to the container. The appendChild method adds the element after the existing elements:

```js
container.appendChild(backgroundImage);
```

We'll follow a similar process for the game's description:

```js
const description = document.createElement("div");
description.className = "details-description";
// we'll innerHTML as description contains HTML
description.innerHTML = details.description;

container.appendChild(description);
```

Let's add the release date using a `time` tag

```js
const releaseDate = document.createElement("time");
releaseDate.className = "details-date";
releaseDate.innerText = `Released: ${details.released}`;

container.appendChild(releaseDate);
```

That will place the `releaseDate` element at the bottom of the other elements.

If we wanted to place it before another element, we can use the `before` method. Let's place it before the description:

```js
description.before(releaseDate);
```

> The `after` method will insert an element after another element.

The complete `createDetails` function:

```js
function createDetails(details) {
    const container = document.querySelector(".container");

    // select the loader and then remove it from the DOM
    const loader = document.querySelector(".loader");
    container.removeChild(loader);

    // create the heading
    const heading = document.createElement("h1");
    heading.innerText = details.name;

    container.appendChild(heading);

    // add the div with a background image
    const backgroundImage = document.createElement("div");
    backgroundImage.className = "details-image";
    backgroundImage.style.backgroundImage = `url("${details.background_image}")`;

    container.appendChild(backgroundImage);

    // add the description
    const description = document.createElement("div");
    description.className = "details-description";
    description.innerHTML = details.description;

    container.appendChild(description);

    // add the release date
    const releaseDate = document.createElement("time");
    releaseDate.className = "details-date";
    releaseDate.innerText = `Released: ${details.released}`;

    description.before(releaseDate);
}
```
---

### Adding the genre links to the details page

One of the things that makes functions so useful is that we can reuse their functionality. 

Let's reuse the `makeGenres` function on this page to create the genre links.

We've moved both the `makreGenres` and `makePlatforms` functions from `js/script.js` to `js/tags/js` and are loading it in `details.html`.

This means me can use both functions on this page.

First, let's create a div to hold the genres:

```js
const genres = document.createElement("div");
genres.className = "details-genres";
```

Now we want to assign the return value of the `makeGenres` function to the innerHTML of the `genres` element and append it to the container.

```js
genres.innerHTML = makeGenres(details.genres);

container.appendChild(genres);
```

No genres are being displayed and the console is displaying an error:

```
ReferenceError: genres is not defined
```

If we look inside the `makeGenres` function in `js/tags.js`, we have the `if` statement checking if the `genres` variable is equal to the `slug` of the `genre` being looped through:

```js
if (genres === genre.slug) {
    activeClass = "active";
}
```

Because `genres` is declared in `js/api.js` and we aren't loading that file on this page, the `genres` variable doesn't exist in this context and the error is thrown.

We need to check if `genres` exists before using it in the comparison inside the if. We can do this using the `typeof` operator and checking it's not equal to the string value `"undefined"`:

```js
if (typeof genres !== "undefined" && genres === genre.slug) {
    activeClass = "active";
}
```

Now the `genre` links will be displayed after the description and we can use them to search for games in different genres.

### Updating the page title

We can update the page title using `document.title`.

Let's set the title to the game's name, a pipe symbol `|` plus whatever is currently in the title. We'll add this at the bottom of the `createDetails` function.

```js
document.title = details.name + " | " + document.title;
```

---

Branch [step-17](https://github.com/javascript-repositories/javascript-1-lesson-code/tree/step-17) of the [repo](https://github.com/javascript-repositories/javascript-1-lesson-code) contains the code so far.

---
- [Go to the module assignment](ma) 
---
