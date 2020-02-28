# Lesson 3 - Displaying a specific result after an API call

---

Check out the [step-24](https://github.com/javascript-repositories/javascript-1-lesson-code/tree/step-24) branch of the [repo](https://github.com/javascript-repositories/javascript-1-lesson-code) to follow this lesson.

---

The link on the cards we created in `js/creators.js` link to `creator-details.html` with an `id` parameter in the query string.

```js
href="creator-detail.html?id=25"
```

We've added `creator-detail.html` and inside is HTML with some placeholder values:

```html
<div class="creator-detail-container">
    <img class="creator-image" src="https://via.placeholder.com/250" alt="Game creator" />
    <div class="creator-details">
        <h1 class="creator-name">Name</h1>
        <p>Game count: <span class="game-count">0</span></p>
        <div class="creator-description">
            Lorem ipsum dolor.
        </div>
    </div>
</div>
```

In `js/creator-details.js` we'll get the id from the query string (if it exists) and add it to the URL that we'll use in the `fetch` call.

If the `id` doesn't exist in the query string we'll redirect to `creators.html`. There is no point making the API call if we don't have an `id` and the redirect will stop the rest of the code running.

> Refer to [Module 3 Lesson 4](https://interactive-content.now.sh/javascript-1/3/4) for info on retrieving paramters from a query string and programmatically redirecting.

Add the following in `js/creator-details.js`.

```js
// get the query string
const queryString = document.location.search;
// get the parameters in the query string
const params = new URLSearchParams(queryString);

let id;

// check if the id parameter exists
if (params.has("id")) {
    // assign the id parameter to the id variable
    id = params.get("id");
} else {
    // the id paramter doesn't exist, redirect so the rest of the code doesn't run
    document.location.href = "creators.html";
}

const creatorsUrl = `https://api.rawg.io/api/creators/`;
// add the id variable to the URL we will use in the fetch method
const detailUrl = `${creatorsUrl}${id}`;
```

Now we'll use that URL in a fetch call and pass the JSON that's returned to a function called `createCreator`. We'll redirect to `error.html` if an error occurs.

```js
fetch(detailUrl)
    .then(function(response) {
        return response.json();
    })
    .then(function(json) {
        createCreator(json);
    })
    .catch(function() {
        document.location.href = "error.html";
    });
```

The first thing to do is always to log the JSON returned from the call:

```js
function createCreator(json) {
    console.dir(json);
}

```

The JSON returned from this call is a single object - all the properties we need are directly on the object, we can access `name`, for example using `json.name`.

When we loop through arrays of result objects, we create a lot of HTML within the loop.

This is not necessary when retrieving a single object. We can select elements we want to provide data for and update their properties.

First we'll select the `img` by its class and set its `src` property to `json.image` and its `alt` property to `json.name`:

```js
const image = document.querySelector("img.creator-image");
image.src = json.image;
image.alt = json.name;
```

Next we'll set the `innerHTML` properties of the name, game count and description elements:

```js
const image = document.querySelector(".creator-image");
image.src = json.image;
image.alt = json.name;

const name = document.querySelector(".creator-name");
name.innerHTML = json.name;

const gameCount = document.querySelector(".game-count");
gameCount.innerHTML = json.games_count;

const description = document.querySelector(".creator-description");
description.innerHTML = json.description;
```

Full code in `js/creator-deatils.js`:

```js
const queryString = document.location.search;
const params = new URLSearchParams(queryString);

let id;

if (params.has("id")) {
    id = params.get("id");
} else {
    document.location.href = "creators.html";
}

const creatorsUrl = `https://api.rawg.io/api/creators/`;
const detailUrl = `${creatorsUrl}${id}`;

fetch(detailUrl)
    .then(function(response) {
        return response.json();
    })
    .then(function(json) {
        createCreator(json);
    })
    .catch(function() {
        document.location.href = "error.html";
    });

function createCreator(json) {
    console.dir(json);

    const image = document.querySelector(".creator-image");
    image.src = json.image;
    image.alt = json.name;

    const name = document.querySelector(".creator-name");
    name.innerHTML = json.name;

    const gameCount = document.querySelector(".game-count");
    gameCount.innerHTML = json.games_count;

    const description = document.querySelector(".creator-description");
    description.innerHTML = json.description;
}

```

Branch [step-25](https://github.com/javascript-repositories/javascript-1-lesson-code/tree/step-25) of the [repo](https://github.com/javascript-repositories/javascript-1-lesson-code) contains the code so far.

---

## Code improvement practice

### Part 1 

If the result returned from the API call doesn't have an `image` property, use the `image_background` property as the image `src` instead.

(id 11 has no image property)

You can find example code for this in [step-26](https://github.com/javascript-repositories/javascript-1-lesson-code/tree/step-26).

---

### Part 2

Add a loader div to the HTML in `creator-detail.html` and hide the placeholder HTML.

Once the API call has finished, remove or hide the loader and display the other HTML.

There is a `hidden` class in the CSS you can use to hide elements.

You can find example code for this in [step-27](https://github.com/javascript-repositories/javascript-1-lesson-code/tree/step-27). Look in `creator-detail.html` and `js/creator-details.js`.

---
- [Go to lesson 4](4) 
---