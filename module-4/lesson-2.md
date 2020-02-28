# Lesson 2 - Display an array of results after an API call

There are no new concepts introduced in this lesson.

Instead, we are going to practise fetching an array of results from an API and creating HTML from the returned data.

---

Check out the [step-21](https://github.com/javascript-repositories/javascript-1-lesson-code/tree/step-21) branch of the [repo](https://github.com/javascript-repositories/javascript-1-lesson-code) to follow this lesson.

---

If you look at the [RAWG API docs](https://api.rawg.io/docs/), there is an endpoint called `creators` that will return a list of game creators.

The full URL is `https://api.rawg.io/api/creators`.

We'll call that URL using `fetch` and loop through the array of objects that it returns and create HTML elements inside the loop.

> Refer to [Lesson 2 of Module 3](../3/2) for the discussion on `fetch`.

First we'll assign the URL to a variable:

```js
const creatorsUrl = "https://api.rawg.io/api/creators";
```

Then we'll use that variable in the `fetch` call:

```js
fetch(creatorsUrl)
```

> We will use regular functions inside the `then` methods. Example code using arrow functions in the `then` and `catch` methods will be provided at the end of the lesson.

We need to provide a function to the `then` method to handle the response from the fetch call.

Previously we sent an anonymous function directly in to the then:

```js
fetch(creatorsUrl)
    .then(function(response) {
        return response.json();
    })
```

We could create a named function and use that in the then instead:

```js
function handleResponse(response) {
    return response.json();
}

fetch(creatorsUrl)
    .then(handleResponse)
```

This will achieve exactly the same result: 

- the function will receive an argument (we've called it `response` because that makes sense, but because it's a normal argument we could call it anything)
- the `json()` method is called on the response argument. This method turns the response into a `json` object that we can use in our code
- this `json` object is returned from the function
- it is this return value that gets sent to the function in the next `then` method

We need to send a function in to the second then.

We can do this with an anonymous function:

```js
.then(function(json) {
    console.log(json);
})
```

Or we can create a named function and send that in:

```js
function handleJson(json) {
    console.log(json);
}

.then(handleJson)
```

So far our code would look one of two ways:

Using anonymous functions:

```js
fetch(creatorsUrl)
    .then(function(response) {
        return response.json();
    })
    .then(function(json) {
        console.log(json);
    })
```

Or using named functions

```js
function handleResponse(response) {
    return response.json();
}

function handleJson(json) {
    console.dir(json);
}

fetch(creatorsUrl)
    .then(handleResponse)
    .then(handleJson)
```

Any errors that happen during the API call or in the functions we provide to the then methods can be handled in a `catch` block.

For now we'll simply log whatever error gets returned. Again, we can call the argument anything we want - as we can call any argument or any other variable anything we like. Calling it `error` or `errorMessage` is sensible.

Once again we can use an anonymous function:

```js
.catch(function(error) {
    console.log(error);
});
```

Or a named function:

```js
function handleError(error) {
    console.log(error);
}

.catch(handleError);
```

Now the code would look one of these two ways:

```js
fetch(creatorsUrl)
    .then(function(response) {
        return response.json();
    })
    .then(function(json) {
        console.log(json);
    })
    .catch(function(error) {
        console.log(error);
    });
```

Or

```js
function handleResponse(response) {
    return response.json();
}

function handleJson(json) {
    console.dir(json);
}

function handleError(error) {
    console.log(error);
}

fetch(creatorsUrl)
    .then(handleResponse)
    .then(handleJson)
    .catch(handleError);
```

The json object that is received by the function in the second then will contain the data we need to loop through.

It will be neater to handle the loop code oustide of the `then` method. If we are using the named function approach above we can simply add the loop code in to the `handleJson` function.

If we are using the anonymous function approach we can simply call the `handleJson` function and pass in the json.

```js
fetch(creatorsUrl)
    .then(function(response) {
        return response.json();
    })
    .then(function(json) {
        handleJson(json);
    })
    .catch(function(error) {
        console.log(error);
    });
```

Either way, the `handleJson` is where we'll now write the code to loop through the data and create the HTML.

### Looping through the data

The first thing we'll need to do inside `handleJson` is inspect the json to see what is inside:

```js
function handleJson(json) {
    console.dir(json);
}
```

<img src="/images/js1/api-results.png" alt="API results" style="max-width:550px">

There is a property called `results` whose value is an array of objects. This is the array we need to loop through.

> You need to inspect the data from an API call to see what you need to retrieve from it. All REST APIs will return JSON, but they will return it differently - you can't assume other APIs will return their data on a property called `results`.


We'll assign `json.results` to a variable and then loop through it and log each `name` property in the objects.

> Refer to [Programing Foundations Module 2 Lesson 3](https://interactive-content.now.sh/programming-foundations/2/3) for info on looping through arrays of objects using `for loops`

```js
function handleJson(json) {

    const results = json.results;

    for (let i = 0; i < results.length; i++) {
        console.log(results[i].name);
    }
}
```

Let's change the `for loop` to a `forEach` which arguably has a cleaner syntax.

> Refer to [Module 2 Lesson 4](https://interactive-content.now.sh/javascript-1/2/4) for info on forEach

```js
function handleJson(json) {

    const results = json.results;

    results.forEach(function(result) {
        console.log(result.name);
    });

}
```

In `creators.html` there is placeholder HTML for one card. The background image is a placeholder image.

```html
<div class="col-sm-6 col-md-4 col-lg-3">
    <div class="card">
        <div class="image creator" style="background-image: url('https://via.placeholder.com/250');"></div>
        <div class="details">
            <h4 class="name">Name</h4>
            <p>Game count: 0</p>
            <a class="btn details" href="creator-detail.html?id=">Details</a>
        </div>
    </div>
</div>
```

This is the HTML we want to create in a loop for each creator object in the results returned by the API call.

First let's select the element we want to add the HTML to:

```js
const resultsContainer = document.querySelector(".row.results");
```

We'll then declare a variable to hold the HTML we create, and then keeping adding HTML to this variable inside the loop:

```js
let html = "";

results.forEach(function(result) {
    html += `<div class="col-sm-6 col-md-4 col-lg-3">
                    <div class="card">
                        <div class="image creator" style="background-image: url('https://via.placeholder.com/250');"></div>
                        <div class="details">
                            <h4 class="name">Name</h4>
                            <p>Game count: 0</p>
                            <a class="btn details" href="creator-detail.html?id=">Details</a>
                        </div>
                    </div>
                </div>`;
});
```

After the loop finishes we'll assign the newly created HTML string to be the `innerHTML` property of `resultsContainer`:

```js
resultsContainer.innerHTML = html;
```

Full code for the `handleJson` function so far:

```js
function handleJson(json) {

    const results = json.results;
    console.dir(results);    

    const resultsContainer = document.querySelector(".row.results");

    let html = "";

    results.forEach(function(result) {
        html += `<div class="col-sm-6 col-md-4 col-lg-3">
                    <div class="card">
                        <div class="image creator" style="background-image: url('https://via.placeholder.com/250');"></div>
                        <div class="details">
                            <h4 class="name">Name</h4>
                            <p>Game count: 0</p>
                            <a class="btn details" href="creator-detail.html?id=">Details</a>
                        </div>
                    </div>
                </div>`;
    });

    resultsContainer.innerHTML = html;
}
```

Because there 10 objects in the `results` array, 10 cards are now displayed on the page.

<img src="/images/js1/api-results-placeholders.png" alt="API results" style="max-width:700px">

Let's populate the HTML with variables from the `results` objects:

- `result.image` for the background image
- `result.name` for the name
- `result.games_count` for the games count
- `result.id` for the id in the query string of the `Details` link

We'll embed the variables in the string using `${}`.

```js
results.forEach(function(result) {
        html += `<div class="col-sm-6 col-md-4 col-lg-3">
                    <div class="card">
                        <div class="image creator" style="background-image: url('${result.image}');"></div>
                        <div class="details">
                            <h4 class="name">${result.name}</h4>
                            <p>Game count: ${result.games_count}</p>
                            <a class="btn details" href="creator-detail.html?id=${result.id}">Details</a>
                        </div>
                    </div>
                </div>`;
    });
```

Now the cards are populated by real data and images and the Details tag links to a `creator-detail.html` page with an `id` in the query string. We'll create this page in [Lesson 3](3).

The function code so far:

```js
function handleJson(json) {
    const results = json.results;
    console.dir(results);

    const resultsContainer = document.querySelector(".row.results");

    let html = "";

    results.forEach(function(result) {
        html += `<div class="col-sm-6 col-md-4 col-lg-3">
                    <div class="card">
                        <div class="image creator" style="background-image: url('${result.image}');"></div>
                        <div class="details">
                            <h4 class="name">${result.name}</h4>
                            <p>Game count: ${result.games_count}</p>
                            <a class="btn details" href="creator-detail.html?id=${result.id}">Details</a>
                        </div>
                    </div>
                </div>`;
    });

    resultsContainer.innerHTML = html;
}
```

### Providing default values for missing properties

To test providing a default value for a missing property, let's fetch the second page of results from the API call. We can do this by adding a `page` parameter to the query string of the URL and setting its value to `2`.

```js
const creatorsUrl = "https://api.rawg.io/api/creators?page=2";
```

If you inspect the JSON returned from this call, you'll see the first object has a missing `image` property, it's set to `null`

```js
image: null
```

The card therefore has a missing image.

<img src="/images/js1/api-results-missing-property.png" alt="Missing property" style="max-width:700px">

Inside the loop, we'll create a variable with a placeholder value for the image

```js
let imageUrl = "https://via.placeholder.com/250";
```

Then we'll write an `if` statement to check if the `result.image` property is `truthy`. If it is, we'll assign it to the `imageUrl` variable:

```js
if (result.image) {
    imageUrl = result.image;
}
```

Then inside the HTML we are creating, we will use `imageUrl` for the background image property, not `result.image`:

```js
<div class="image creator" style="background-image: url('${imageUrl}');"></div>
```

Now any object that is missing an image property will display the placeholder image instead.

Full code in `js/creators.js`:

```js
const creatorsUrl = "https://api.rawg.io/api/creators?page=2";

fetch(creatorsUrl)
    .then(function(response) {
        return response.json();
    })
    .then(function(json) {
        handleJson(json);
    })
    .catch(function(error) {
        console.log(error);
    });

function handleJson(json) {
    const results = json.results;
    console.dir(results);

    const resultsContainer = document.querySelector(".row.results");

    let html = "";

    results.forEach(function(result) {
        let imageUrl = "https://via.placeholder.com/250";

        if (result.image) {
            imageUrl = result.image;
        }

        html += `<div class="col-sm-6 col-md-4 col-lg-3">
                    <div class="card">
                        <div class="image creator" style="background-image: url('${imageUrl}');"></div>
                        <div class="details">
                            <h4 class="name">${result.name}</h4>
                            <p>Game count: ${result.games_count}</p>
                            <a class="btn details" href="creator-detail.html?id=${result.id}">Details</a>
                        </div>
                    </div>
                </div>`;
    });

    resultsContainer.innerHTML = html;
}
```

In `creators.html` we'll replace the example card HTML with the loader div.

```html
<main class="container content">
    <div class="row results">
        <div class="loader"></div>
    </div>
</main>
```

Branch [step-22](https://github.com/javascript-repositories/javascript-1-lesson-code/tree/step-22) of the [repo](https://github.com/javascript-repositories/javascript-1-lesson-code) contains the code so far.

--- 

The fetch call using arrow functions would look like this:

```js
fetch(creatorsUrl)
    .then(response => return response.json())
    .then(json => handleJson(json))
    .catch(error => console.log(error));
```

> Refer to [Module 3 Lesson 1](https://interactive-content.now.sh/javascript-1/3/1) for a discussion of arrow functions.

---

## Code improvement practice

Instead of displaying a placeholder image if the `image` property is missing, check if the `result` object has an `image_background` property and display that instead. If both are missing the placeholder image will be displayed. 

You can find the example code for this in [step-23](https://github.com/javascript-repositories/javascript-1-lesson-code/tree/step-23).

---
- [Go to lesson 3](3) 
---
