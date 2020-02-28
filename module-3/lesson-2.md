# Lesson 2 - Making API calls

## Asynchronous code

So far all the code we've written has been executed or returned a value as soon as it's been encountered in the program.

If you log a message

```js
console.log("I am the first log");
```

the message is displayed as soon as the code is run.

If you declare a function

```js
function logMessage() {
    console.log("Function called");
}
```

the function is run as soon as it's called:

```js
logMessage();
// Function called
```

The following will be executed after the function has been called.

```js
console.log("I am the second log");
```

Running all the statements above will log:

```js
// I am the first log
// Function called
// I am the second log
```

The code is called statement by statement and each statement waits for the previous one to finish before running. This is called `synchronous` code.

<img src="/images/js1/synchronous-code.png" alt="synchronous code" style="max-width:500px">

That seems quite obvious, but sometimes it's not a good idea to wait for the previous statement to finish before executing the next one.

If we made a call to a server and the user's internet connection was slow or the server was busy, waiting for the call to return before running the next code would create a poor user experience as the interface would appear unresponsive.

`Asynchronous` code doesn't wait for the current statement to finish running before executing the next statement.

## Promises

`Promises` are a way to execute code `asynchronously`. When we call a promise our code doesn’t wait for a response, but moves on to the next line of code.

<img src="/images/js1/promise-1.png" alt="promise" style="max-width:500px">

<!-- They are objects we can use to handle the successful completion or failure of code that will finish running some time in the future. -->

Once executed, the promise is `pending`. At some point it will return and will either have been `fulfilled` or `rejected`.

<img src="/images/js1/promise-2.png" alt="promise" style="max-width:550px">

<!-- 
When we execute asynchronous code we can use a `Promise` to run a function when the code is successful and returns a value, or when the code is not successful and returns an error. -->

Form [MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise):

> A Promise is in one of these states::
>
> - `pending`: initial state, neither fulfilled nor rejected.
> - `fulfilled`: meaning that the operation completed successfully.
> - `rejected`: meaning that the operation failed.

### Promise chaining

Sometimes what is executed in our fulfilled function also returns a promise. This is called promise chaining.

<img src="/images/js1/promise-chaining.png" alt="promise chaining" style="max-width:550px">

`Fulfilled` states are handled by a `Promise`'s `then` method and `rejected` states are handled by a `catch` method.

Both these methods take a function as an argument. This is where we can write code to handle the return value of the promise. 

These functions in turn recieve an argument which is the return value of the promise (if successful and the promise has resolved) or the error from a rejected promise.

<img src="/images/js1/promise-3.png" alt="promise" style="max-width:550px">

--- 

Most of the time you won't write your own promises but will rather use libraries and other existing code built on promises.

We aren't going to create any promises, but instead are going to use the promise-based `Fetch API` to make calls to the RAWG API and fetch data. The `Fetch API` is built in to most modern browsers.

<a id="fetch"></a>

## Fetch API

Check out the [step-11](https://github.com/javascript-repositories/javascript-1-lesson-code/tree/step-11) branch from the [repo](https://github.com/javascript-repositories/javascript-1-lesson-code) to follow this lesson.

---

In this branch the files in `js/data` have been removed, we've added some Boostrap JS files and `js/api.js`. The Bootstrap files are there to make the navbar responsive.

```html
<script src="https://code.jquery.com/jquery-3.4.1.slim.min.js"></script>
<script src="https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/js/bootstrap.min.js"></script>
<script src="js/script.js"></script>
<script src="js/buttons.js"></script>
<script src="js/api.js"></script>
```

We are going to add the following in `js/api.js`.

> We will often refer to API URLs as `endpoints`.

The base URL for the API is `https://api.rawg.io/api/`. Let's keep that in a variable:

```js
const baseUrl = "https://api.rawg.io/api/";
```

To get a list of all the games from the API, the endpoint is `https://api.rawg.io/api/games`.

Let's create another variable to store that:


```js
const gamesUrl = `${baseUrl}games`;
```

This could also be written using concatenation:

```js
const gamesUrl = baseUrl + "games";
```

`gamesUrl` is the endpoint we want to call using `fetch`.

To use `fetch`, we pass a URL to the `fetch` method:

```js
fetch(gamesUrl);
```

Because `fetch` is built on promises, a successful call will be handled by a `then` method. The then method takes a function as an argument. This function in turn receives the response from the API call as an argument:

```js
fetch(gamesUrl)
    .then(function(response) {
        console.log(response);
    });
```

Run the code and look at what gets logged as a response:

```js
const baseUrl = "https://api.rawg.io/api/";
const gamesUrl = `${baseUrl}games`;

fetch(gamesUrl)
    .then(function(response) {
        console.dir(response);
    });
```

<img src="/images/js1/fetch-1.png" alt="fetch" style="max-width:400px">

The `body` property holds the return value of the response. Click the three dots and you'll see it is a `ReadableStream`, a data `stream`. We can't work with this type of data directly, so we need to convert it to something we can work with.

To convert the data stream to `JSON` we use the `json()` method. We'll call this method on the response and return the result from the function.

```js
return response.json();
```

The result of the  `json()` call is another promise, so we'll handle that with another `then` method. This is the `promise chaining` mentioned above.

```js
fetch(gamesUrl)
    .then(function(response) {

        return response.json();
    })
    .then(function(json) {

        console.dir(json);
    });
```

The function in the second `then` method receives a JSON object from the `reponse.json()` call. This is a data format we can with, it's a normal JavaScript object.

The JSON objects returned from API calls will have different properties depending on the API. You'll always need to inspect the JSON to see which properties you can use. In our case the data we want are found on the `results` property, but the name of this property can vary according to the API.

This object has several properties including the total number of games available - the `count` property - and a `results` property which is an array of objects.

<img src="/images/js1/fetch-2.png" alt="fetch" style="max-width:500px">

Even though the `count` property indicates there many thousands of games, the array of results has only 20 objects.

This is because the results of the API call are `paginated` - split up into pages of results. Returning all the results at once would cause far too much data to be send to the browser, the JSON object would be huge and the browswer would likely crash. Browsers have a limit to the amount of JSON data they can handle.

You can see the object has a `next` property which is the URL to get the second page of results.

We will work only with the first page of results.

#### catch

Our `fetch` code is missing a `catch` method and we aren't handling errors properly.

If the call returned an error from, for example, using an incorrect URL, we want to `catch` the error and something with it.

In our case we will just log the error, but in a real-world environment you could handle the error by sending an email to a developer or logging it in error-tracking software.

```js
fetch(gamesUrl)
    .then(function(response) {
        return response.json();
    })
    .then(function(json) {
        console.dir(json);
    })
    .catch(function(error) {
        console.dir(error);
    });
```

You can test the `catch` method by using a broken URL in the call:

```js
fetch("this/will/not/work")
    .then(function(response) {
        return response.json();
    })
    .then(function(json) {
        console.dir(json);
    })
    .catch(function(error) {
        console.dir(error);
    });
```

### Processing the results of an API call

The second `then` method receives the results of the API call in JSON format.

How do we display the results on the page?

Back in `js/script.js`, the `switch` statement has been removed from the `loadGames` function and the code is set to loop through a `games` array.

```js
for (let i = 0; i < games.length; i++) 
```

This `games` array doesn't exist yet.

Inside this function we want to loop through the results of the API call. We can do this by calling the `loadGames` function from the second `then` method of the `fetch` call and passing in the JSON object as an argument.

First let's call the `loadGames` function from the second `then` in `js/api.js`:

```js
fetch(gamesUrl)
    .then(function(response) {
        return response.json();
    })
    .then(function(json) {
        // call the loadGames function and pass in the json object
        loadGames(json);
    })
    .catch(function(error) {
        console.dir(error);
    });
```

Now that we're calling the function, an error will be displayed in the console - the code is trying to loop through `games` which doesn't exist.

```js
ReferenceError: games is not defined
```

First let's add an argument to the function that will receive the JSON object from the `then` method. Like all arguments we can call it anything, but `json` makes sense:

```js
function loadGames(json) {
    // function code here
```

If we log `json` here we will get the same object displayed when we logged it in the second `then` method - it's the same object, we've just passed it from the `fetch`'s `then` method into the function:

```js
function loadGames(json) {
    console.dir(json);
    // rest of function code here
```

<img src="/images/js1/fetch-2.png" alt="fetch" style="max-width:500px">

We still don't have the `games` variable.

We know the data we want is on the property of the `json` object called `results`.

Let's declare a variable called `games` and set it equal to `json.results`.

```js
function loadGames(json) {

    console.dir(json);
    const games = json.results;
    // rest of function code here
```

Now, rather than looping through hard-coded arrays of objects, the results of the API call are being displayed.

Let's display a loading indicator until the API call returns and the results are displayed.

To do this we can simply place a `div` with a class of `loader` inside the results div; the CSS has been supplied:

```html
<div class="row results">
    <div class="loader"></div>
</div>
```

This div will be replaced by the HTML that gets created in the `loadGames` function.

If your connection is very fast and the call returns before you see the loader, you can mimic a slow connection from the `network` tab in dev tools. Select a preset from the dropdown menu. `Online` is the default value.

<img src="/images/js1/network-tab.png" alt="fetch" style="max-width:200px">

--- 

The [step-12](https://github.com/javascript-repositories/javascript-1-lesson-code/tree/step-12) branch from the [repo](https://github.com/javascript-repositories/javascript-1-lesson-code) contains all the code so far.

---

The API call is currently fetching games of any genre.

In the [next lesson](3) we'll fetch games by genre.

---

## Practice question

> The answer can be found [here](https://github.com/javascript-repositories/js1-lesson-answers/tree/module-3-lesson-2).
>
> There are two versions of the answer, in `js/script.js` and `js/script2.js`. 

<h5 class="question">Question</h5>

The endpoint below will return an array of screenshots from the game `Rocket League`.

```
https://api.rawg.io/api/games/4003/screenshots
```

Call the endpoint and loop through the results to create a image slider using the HTML below. 

The supplied code will create the slider for you, you just need to create the HTML that is commented out in a loop.

The first item needs to have a class of `active` added to it otherwise the slider will not display.

```html
<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta http-equiv="X-UA-Compatible" content="ie=edge" />
        <title>Lesson 2 | Module 3 | JavaScript 1</title>
        <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css" />
    </head>
    <body>
        <div class="carousel slide" data-ride="carousel" data-interval="3000" data-pause="false">
            <div class="carousel-inner">
                <!-- <div class="carousel-item active">
                    <img class="d-block w-100" src="..." />
				</div>
				<div class="carousel-item">
                    <img class="d-block w-100" src="..." />
                </div>
				-->
            </div>
        </div>
        <script src="https://code.jquery.com/jquery-3.2.1.slim.min.js"></script>
        <script src="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/js/bootstrap.min.js"></script>
        <script src="js/script.js"></script>
    </body>
</html>
```

---
- [Go to lesson 3](3) 
---
