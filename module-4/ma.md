
# Module Assignment 4

## Level 1

<h5 class="question">Question 1</h5>
<small>Refer: <a href="https://interactive-content.now.sh/javascript-1/4/1#validating-forms">lesson 1</a></small>

Add the following HTML and CSS to a page called `question1.html`.

```html
<form id="contactForm">
    <div>
        <input type="text" id="firstName" placeholder="First name (minimum 2 characters)" />
        <div id="firstNameError" class="error">Your first name must be at least 2 characters</div>
    </div> 
    <div>
        <button type="submit">Submit</button>
    </div>
</form>
```

```css
.error {
    color: red;
    display: none;
}
```

Write code that checks that the `firstName` input's value is at least 2 characters long
when the form is submitted.

Show/hide the error message every time the validation runs.

---

<h5 class="question">Question 2</h5>
<small>Refer: <a href="https://interactive-content.now.sh/javascript-1/4/2">lesson 2</a></small>

Add the following element to a page called `question2.html`:

```html
<div class="results"></div>
```

Make a call to `https://api.rawg.io/api/games` and pass the JSON object it returns to a function called `createGames`.

For each game object in the results, the `createGames` function should create the following HTML in a loop. Replace the placeholder values with the relevant properties from each object:

```html
<div class="game">
    <h2>Name of game</h2>
    <img src="/path/to/image" alt="Name of game">
</div>
```

After the loop, all the HTML that was created should be assigned as the `innerHTML` value to the element above.

---

<h5 class="question">Question 3</h5>
<small>
    Refer: 
    <ul>
        <li><a href="https://interactive-content.now.sh/javascript-1/4/3">Lesson 3</a>
        </li>
        <li>Setting style properties on elements - <a href="https://interactive-content.now.sh/javascript-1/1/2">Module 1 Lesson 2</a></li>
    </ul>
</small>

Add the following HTML to a page called `question3.html`:

```html
<div class="container">
    <h1>Name of game</h1>
    <div class="image" style="background-image: url('https://via.placeholder.com/1000')"></div>
    <div class="description">Description goes here</div>
</div>
```

```css
.image {
    height: 200px;
    background-position: center center;
    background-repeat: no-repeat;
    background-size: cover;
}
```

Make a call to `https://api.rawg.io/api/games/4200` and pass the JSON object it returns to a function called `createGameDetails`.

Inside `createGameDetails` replace the placeholder values in the HTML above with properties from the object returned from the API call.

Use either the `background_image` or `background_image_additional` property as the background image of the `<div class="image">` element.

## Submission

- Create a repository in your GitHub account called `{your-name}-js1-ma4`, e.g. `mary-smith-js1-ma4`, and __make sure it's public__
- Create an `.html` file and a `.js` file for each question
    - question1.html
    - question2.html
    - question3.html
    - /js/question1.js
    - /js/question2.js
    - /js/question3.js

You can also add `.css` files or add the styles on the page with `<style>` tags.

- Add, commit and push these files to your repo
- Submit the repo link

