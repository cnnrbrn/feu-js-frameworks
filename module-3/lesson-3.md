# Lesson 3 - Query string parameters and string manipulation

--- 

Make sure you are on the [step-12](https://github.com/javascript-repositories/javascript-1-lesson-code/tree/step-12) branch of the [repo](https://github.com/javascript-repositories/javascript-1-lesson-code).

---

Currently our app is fetching the first 20 games of any genre from the API.

We can use the query string to send parameters to the API and retrieve games of a specific genre. These paramters come after the `?` in a URL and have the format `parameter=value`.

If we look at the [docs](https://api.rawg.io/docs/#operation/games_list) we can see there is a `genres` parameter we can use. If we wanted to select `action` games the parameter would be `genres=action`.

If we added that to our `gamesUrl` variable the full URL for the call would be:

`
https://api.rawg.io/api/games?genres=action
`

`Action` is the first item in our genre menu, so let's make that call the default one.

In `js/api.js`, create variabe to hold the genre. We'll call it `genres` and it's possible to fetch more than one genre at a time. This value is updateable, so we'll use `let` to declare it.

```js
let genres = "action";
```

We also want to add an empty genres parameter to the `gamesUrl` variable:

```js
const gamesUrl = `${baseUrl}games?genres=`;
```

We'll create a new variable called `genreUrl` composed of these two variables:

```js
const genreUrl = `${gamesUrl}${genre}`
```

Or using concatenation:

```js
const genreUrl = gamesUrl + genre;
```

This will give us the URL from above `https://api.rawg.io/api/games?genres=action`

`genreUrl` is the variable we now need to use in the fetch method:

```js
fetch(gamesUrl)
```

Full code so far:

```js
const baseUrl = "https://api.rawg.io/api/";
const gamesUrl = `${baseUrl}games?genres=`;
let genres = "action";
const genreUrl = gamesUrl + genres;

fetch(genreUrl)
    .then(function(response) {
        return response.json();
    })
    .then(function(json) {
        loadGames(json);
    })
    .catch(function(error) {
        console.dir(error);
    });
```

Run this code and you'll see games in the `action` genre are returned - the games' genre tags all include `action`.

To view API calls made this way, we can look at the `Network` tab in dev tools:

<img src="/images/js1/network-tab-xhr.png" alt="fetch" style="max-width:499px">

`XHR` stands for `XMLHttpRequest`. Click on the `XHR` filter to only display network calls and hide all other network requests.

Click on the URL in the left pane to view details of the call:

<img src="/images/js1/network-tab-xhr-details.png" alt="fetch" style="max-width:697px">

--- 

When we click on a genre in the menu, we want to fetch games in that genre.

There are several ways to got about it. We are going to do the following:

- add a `genres` parameter to the current query string and reload the page
- when the page loads, retrieve the `genres` parameter and update the `genres` variable

This isn't the most elegant way to achieve the desired result, but allows us to showcase a couple new techniques.

### Using href programmatically

Our genre menu is made up of an unordered list with links inside:

```html
<ul class="nav nav-pills">
    <li class="nav-item">
        <a class="nav-link active" href="#" data-genre="action">Action</a>
    </li>
    <li class="nav-item">
        <a class="nav-link" href="#" data-genre="shooter">Shooter</a>
    </li>
    <li class="nav-item">
        <a class="nav-link" href="#" data-genre="role-playing-games-rpg">RPG</a>
    </li>
</ul>
```

The easiest way to reload the page and add a query string parameter would be to simply add it to the `href` attribute of the links:

```js
href="index.html?genres=action"
```

But we're here to learn JavaScript so let's do that programmatically instead. We're going to add the code in `js/menu.js`.

We need to add an event listener to each link in the menu, so let's select them all first. 

There are multiple links so we need to use `querySelectorAll` and the selection string is written like you would write it in CSS:

```js
const genreLinks = document.querySelectorAll(".genres a");
```

We'll create a function called `loadPage`. Inside the function we'll log the genre data attribute value.

```js
function loadPage(event) {
    console.log(event.target.dataset.genre);
}
```

We saw in Lesson 1 that the value of `this` inside a regular function will be the object that is executing the code.

In this case the object executing the code will be the `<a>` tag the click event is happening on:

```js
function loadPage() {
    console.log(this);
}
```

<img src="/images/js1/click-event-this.png" alt="click event this" style="max-width:400px">

`this` and the `event` argument will have the same properties, so we can access the genre data attribute like so:

```js
function loadPage() {
    console.log(this.dataset.genre);
}
```

We'll add a click event listener to each link using a `forEach` loop:

```js
genreLinks.forEach(function(link) {
    link.addEventListener("click", loadPage);
});
```

We can also use the arrow syntax for the function:

```js
genreLinks.forEach(link => {
    link.addEventListener("click", loadPage);
});
```

The value of the genre data attribute is what we want to add to the query string when we reload the page. Let's store it in a variable and add it to query string of the page we want to reload, namely `index.html`. Remember, the query string is the part after the question mark in a URL.

```js
function loadPage() {
    const genre = this.dataset.genre;
    const pageToReload = "index.html?genres=" + genre;
}
```

The value of the `href` attribute in HTML `<a>` tags specifies a path or URL to navigate to. We can use this same property on the `document.location` object to progammactically navige to a path/URL:

```js
document.location.href = "path/to/go/to";
```

In our function we want to go to the `pageToReload` path that we've created:

```js
function loadPage() {
    const genre = this.dataset.genre;
    const pageToReload = "index.html?genres=" + genre;

    document.location.href = pageToReload;
}
```

Now, every time you click a genre menu item, the page will reload and the genre will be included as the value of a `genres` parameter in the query string:


```js
http://127.0.0.1:5502/index.html?genres=shooter
```

Full code in `js/menu.js`:

```js
const genreLinks = document.querySelectorAll(".genres a");

function loadPage() {
    const genre = this.dataset.genre;
    const pageToReload = "index.html?genres=" + genre;

    document.location.href = pageToReload;
}

genreLinks.forEach(link => {
    link.addEventListener("click", loadPage);
});
```

### Retrieving query string parameters

Back in `js/api.js`, we want to get the `genres` parameter from query string and add it to the API call so that we fetch the appropriate games.

We can access the entire query string using the `document.location.search` property:

```js
const queryString = document.location.search;
console.log(queryString);
```

We can then parse the paramters using URLSearchParams:

```js
const params = new URLSearchParams(queryString);
console.dir(params);
```
        
<img src="/images/js1/urlSearchParams.png" alt="URLSearchParams" style="max-width:400px">

URLSearchParams has a number of methods (functions) we can use with the query string. We'll use the `has` method to check if the parameter exists and if it does, the `get` method to fetch it and assign it to the `genres` variable:

```js
let genres = "action";

if(params.has("genres")) {
    genres = params.get("genres");
}
```

We're still assigning `action` to the `genres` variable and this will remain the value if there is no `genres` parameter in the query string. If the `genres` paramater exists this will be become the new value of the `genres` variable and will form part of the API call's URL.

Full code in `js/api.js`:

```js
const queryString = document.location.search;
const params = new URLSearchParams(queryString);

let genres = "action";

if (params.has("genres")) {
    genres = params.get("genres");
}

const baseUrl = "https://api.rawg.io/api/";
const gamesUrl = `${baseUrl}games?genres=`;
const genreUrl = gamesUrl + genres;

fetch(genreUrl)
    .then(function(response) {
        return response.json();
    })
    .then(function(json) {
        loadGames(json);
    })
    .catch(function(error) {
        console.dir(error);
    });
```

Now every time we click on a genre menu item, the page will reload, the `genres` parameter will be fetched from the query string, it will be used in the API call and the call will return the first 20 games in that genre.

### Setting the active menu class from a query string parameter

At the moment the `Action` menu item always appears active because there is a hard-coded `active` class on the link:

```html
<a class="nav-link active" href="#" data-genre="action">Action</a>
```

We'll remove the class and set it programmatically.

```html
<a class="nav-link" href="#" data-genre="action">Action</a>
````

In `js/api.js` we are declaring and initialising the `genres` variable. Becuase it is not declared inside a function or a block, it is global and available to other code.

We'd like to use it in the `forEach` loop in `js/menu.js` to add an active class to the appropriate link.

To make it available in that file we'll need to change the order we are loading the files in `index.html`.

Load `js/api.js` before `js/menu.js` so that `genres` becomes available in the latter:

```html
<script src="js/api.js"></script>
<script src="js/menu.js"></script>
```

Remember that every time a `forEach` loop iterates over an array, the function inside the loop receives the current item in the array as the argument.

We've called the argument `link`. Each `link` will be a `a.nav-link` element.

```js
genreLinks.forEach(link => {
    console.dir(link);
});
```

<img src="/images/js1/a-nav-link.png" alt="a.nav-link" style="max-width:400px">

Inside the `forEach` loop we can check if the `genres` variable value is the same as the link's genre data attribute.

```js
 if(genres === link.dataset.genres) {
        
}
```

If it is, we'll add the `active` class.

```js
if(genres === link.dataset.genres) {
    link.classList.add("hover");
}
```

Now the menu link with the `genre` attribute that matches the `genres` parameter in the query string will had the `active` class added to it.

Full code in `js/menu.js`:

```js
const genreLinks = document.querySelectorAll(".genres a");

function loadPage() {
    const genre = this.dataset.genre;
    const pageToReload = "index.html?genres=" + genre;

    document.location.href = pageToReload;
}

genreLinks.forEach(link => {

    if (genres === link.dataset.genre) {
        link.classList.add("active");
    }
    link.addEventListener("click", loadPage);
});
```

---

[step-13](https://github.com/javascript-repositories/javascript-1-lesson-code/tree/step-13) branch from the [repo](https://github.com/javascript-repositories/javascript-1-lesson-code) contains all the code so far.

---

### Making the genre tags working links

It would be good if could load games by genre from the genre tags on each card.

We'll do this the simple way this time and add a `href` property to the tag that includes the genre.

The `makeGenres` function in `js/script.js` is where the genre tags are created. There you can see we are using the `name` property of each `genre` to display the genre name.

If you inspect the results of one of these API calls by logging it in the console or using PostMan, you will see that each genre has a `slug` property too:

<img src="/images/js1/postman-genres.png" alt="genres" style="max-width:390px">

This is the property we want to use when creating the genre param in the URL because any spaces have been replaced by hyphens.

Inside the `forEach` loop we'll add the `href` property:

```js
genreArray.forEach(function(genre) {
    genreHTML += `<a class="genre" href="index.html?genres=${genre.slug}">${genre.name}</a>`;
});
```

Now clicking a genre tag will load games from that genre. If the genre clicked is not part of the genres in the menu, none of the the menu items will receive the active class.

<img src="/images/js1/no-active-genre-menu.png" alt="genres" style="max-width:400px">

Let's add an active class to the genre tag if it matches the current genre.

Inside the `makeGenres` function's `forEach` loop, let's first create a variable called `activeClass` with an empty string as a value:

```js
let activeClass = "";
```

We'll then check if the `genres` variable matches the slug of the current genre inside the loop:

```js
let activeClass = "";

if (genres === genre.slug) {
    activeClass = "active";
}   
```

We'll then add the `activeClass` to the `class` atttribute when we are creating the HTML string:

```js
genreHTML += `<a class="genre ${activeClass}" href="index.html?genres=${genre.slug}">${genre.name}</a>`;
```

If the `genres` variable does not match the `slug` property, an empty string will be added to the class.

The full function code:

```js
function makeGenres(genreArray) {
    let genreHTML = "";

    genreArray.forEach(function(genre) {
        let activeClass = "";

        if (genres === genre.slug) {
            activeClass = "active";
        }
        genreHTML += `<a class="genre ${activeClass}" href="index.html?genres=${genre.slug}">${genre.name}</a>`;
    });

    return genreHTML;
}
```

---

The [step-14](https://github.com/javascript-repositories/javascript-1-lesson-code/tree/step-14) branch from the [repo](https://github.com/javascript-repositories/javascript-1-lesson-code) contains the code so far.

---

### String manipulation

In branch `step-14`, we've added a `h1 tag to the HTML.

Let's display the current genre inside this element. We'll do this at the bottom of `js/api.js`.

First let's select the element:

```js
const genreHeading = document.querySelector("h1");
```

We can assing the `genres` variable value to the `innerText` property of the element:

```js
genreHeading.innerText = genres;
```

We are using a CSS property to capitalise the genre (`text-transform: capitalize;`) but if we click on the `RPG` genre, what's displayed isn't very user-friendly.

```html
Role-Playing-Games-Rpg
```

#### replace()

JavaScript has several built-in methods we can use to manipulate strings.

The `replace` method takes to arguments:

- the first is what we want to replace
- the second is what we want to replace the first with

Let's replace any hyphens `-` in the genre with blank spaces `" "`:

```js
const formattedGenres = genres.replace("-", " ");

genreHeading.innerText = formattedGenres;
```

```html
Role Playing-Games-Rpg
```

Looks like the `replace` method has only replaced the first instance of what we were looking to replace. 

We'll need to use a regular expression to replace all the instances.

`Regular expressions` are used to match patterns. We place the pattern we are looking in between two forward slashes `/ /`.

In this case we are looking for a very simple pattern, just a hyphen. Our regular expression would look like this:

```js
/-/
```

To find all the matches for the pattern we can use the `g` modifier which will perform a `global` search in the string we are searching:

```js
/-/g
```

We can use that regular expression in the `replace` method to replace all hyphens:

```js
const formattedGenres = genres.replace(/-/g, " ");
```

The full code we've added at the bottom of `js/api.js` so far:

```js
const genreHeading = document.querySelector("h1");

const formattedGenres = genres.replace(/-/g, " ");

genreHeading.innerText = formattedGenres;

```

We also don't want the ` Rpg` part of `Role Playing Games Rpg`.

Let's use another `replace` method to replace it with nothing: `""`. It's the CSS property that's responsible for the capitalisation, so the string we're searching for to replace is ` rpg`. 

We'll chain the two replace methods:

```js
const formattedGenres = genres.replace(/-/g, " ").replace(" rpg", "");
```

The full code we've added at the bottom of `js/api.js`:

```js
const genreHeading = document.querySelector("h1");

const formattedGenres = genres.replace(/-/g, " ").replace(" rpg", "");

genreHeading.innerText = formattedGenres;
```

--- 

The [step-15](https://github.com/javascript-repositories/javascript-1-lesson-code/tree/step-15) branch from the [repo](https://github.com/javascript-repositories/javascript-1-lesson-code) contains all the code so far.

---

<!-- We'll follow the same pattern we used in Lesson 3 of Module 2 to toggle on active class on the links, namely remove the active class from all the links, and add it to the one that was just clicked.

 -->


---
- [Go to lesson 4](4) 
---