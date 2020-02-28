
# Module Assignment 3

## Level 1

<h5 class="question">Question 1</h5>
<small>Refer: lesson 1</small>

Convert the function below to an arrow function:

```js
function(a, b) {
    return a - b;
}
```

<h5 class="question">Question 2</h5>
<small>Refer: lesson 2 / 4</small>
<!-- 
> The URL for this question has been updated due to issues with the previous URL -->

Make a call to the URL below, pass the JSON it returns to a function and inside that function loop through the results and log each game's name.

In the `catch` method of your code, redirect to `error.html` if there is an error.

```js
https://api.rawg.io/api/games?genres=sports
```


<h5 class="question">Question 3</h5>
<small>Refer: lesson 3</small>

Replace the word `cats` with the word `giraffes` in the following sentence:

```
These cats are outrageous.
```

<h5 class="question">Question 4</h5>
<small>Refer: lesson 4</small>

Given the URL below, write code that checks if there is a `userId` parameter in the query string.

If there is no `userID` parameter, redirect the browser to `third.html`. 

If there is a `userID` parameter and its value is less than 10, redirect to `first.html`.

If there is a `userID` parameter and its value is 10 or greater, redirect to `second.html`.

```js
https://my.site.com?userId=7
```


<h5 class="question">Question 5</h5>
<small>Refer: lesson 4</small>

Write code that removes the button, and only the button, from its parent element in the HTML below:

```html
<div class="container">
    <p>Lorem ipsum dolor</p>
    <button class="btn">Click me</button>
</div>
```

<h5 class="question">Question 6</h5>
<small>Refer: lesson 4</small>

Create an `li` element with a text value of `Parrots` and a class of `parrots`.

Add the new item as the second item in the `ul` below (add it after `Cows`).

```html
<ul class="animals">
    <li class="cows">Cows</li>
    <li class="elephants">Elephants</li>
</ul>
```

<h5 class="question">Question 7</h5>
<small>Refer: lesson 4</small>

Make a call to the URL below and pass the JSON it returns to a function.

Inside that function select the div from the HTML below and assign the `rating` property from the JSON object as it's text value.

In the `catch` method, log the error that may be returned.

```js
https://api.rawg.io/api/games/3801
```

```html
<div class="rating"></div>
```


---

## Submission

- Create a repository in your GitHub account called `js1-ma3` and __make sure it's public__
- Create a file called `{your-name}-js1-ma3.js`, e.g. `mary-smith-js1-ma3.js`. This is the only file you need to submit.
- Write your answers inside this file with a comment above each answer indicating the question number:


```js

// question 1

// your answer for question 1 goes here

// question 2

// your answer for question 2 goes here

// etc

```

- Add, commit and push this file to your repo
- Submit the repo link

