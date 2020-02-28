# Lesson 4 - Practice questions

<h5 class="question">Question 1</h5>

Looping through arrays of objects is important because that's how lists of results get returned from API calls.

---

<small>
    Refer: 
    <ul>
        <li>
            Loops - <a href="https://interactive-content.now.sh/programming-foundations/1/4">Programming Foundations Module 1 Lesson 4</a>
        </li>
        <li>
            Arrays of objects - <a href="https://interactive-content.now.sh/programming-foundations/2/3">Programming Foundations Module 2 Lesson 4</a>
        </li>
        <li>
            forEach - <a href="https://interactive-content.now.sh/javascript-1/2/4">JavaScript 1 Module 2 Lesson 4</a>
        </li>
    </ul>
</small>

Loop through the array below (with a `for` loop or a `forEach` loop) and log each property's age value. Log `"Unknown"` if it is missing.

```js
const cars = [
    {
        type: "BMW",
        age: 4,
        beenInAccident: false
    },
    {
        type: "Toyota",
        beenInAccident: true
    },
    {
        type: "Ford",
        beenInAccident: true
    }
];
```
> The answer can be found [here](https://github.com/javascript-repositories/js1-lesson-answers/blob/module-4-lesson-4-question-1/script.js).

---

<h5 class="question">Question 2</h5>

Functions allow us to create reusable code. We can return values from functions and assign those return values to variables.

<small>
    Refer: 
    <ul>
        <li>
            Functions - <a href="https://interactive-content.now.sh/programming-foundations/2/4">Programming Foundations Module 2 Lesson 4</a>
        </li>
        <li>
            Creating HTML from arrays of objects - <a href="https://interactive-content.now.sh/javascript-1/1/3">JavaScript 1 Module 1 Lesson 3</a>
        </li>
        <li>
             Creating HTML in functions - <a href="https://interactive-content.now.sh/javascript-1/1/4">JavaScript 1 Module 1 Lesson 4</a>
        </li>
    </ul>
</small>

```js
const elephants = [
    { image: "https://elephant-api.herokuapp.com/pictures/001.jpg", note: "Given to a Carolingian emperor." },
    { image: "https://elephant-api.herokuapp.com/pictures/missing.jpg", note: "From the Mysore Dasara procession." },
    { image: "https://elephant-api.herokuapp.com/pictures/missing.jpg", note: "Known for her tightrope walking act." }
];
```

Create a function that receives one argument. When you call the function pass the `elephants` array above into the function.

Inside the function, loop through the array and create an `img` tag for each object, with `src` and `alt` attributes created from the properties in each object.

Return the created HTML from the function.

Assign the return value of the function to a variable and console log it.

It will look similar to this (though it will be one long string).

```js
<img src="https://elephant-api.herokuapp.com/pictures/001.jpg" alt="Given to a Carolingian emperor.">
<img src="https://elephant-api.herokuapp.com/pictures/missing.jpg" alt="From the Mysore Dasara procession.">
<img src="https://elephant-api.herokuapp.com/pictures/missing.jpg" alt="Known for her tightrope walking act.">
```

> The answer can be found [here](https://github.com/javascript-repositories/js1-lesson-answers/blob/module-4-lesson-4-question-2/script.js).

---

<h5 class="question">Question 3</h5>

We can provide default values for missing object properties.

<small>
    Refer: 
    <ul>
        <li>
            Default values for missing properties - <a href="https://interactive-content.now.sh/javascript-1/1/3#default-values">JavaScript 1 Module 1 Lesson 3</a>
        </li>       
    </ul>
</small>

```js
const elephants = [
    { image: "https://elephant-api.herokuapp.com/pictures/001.jpg", note: null},
    { note: "From the Mysore Dasara procession." },
    { image: null, note: "Known for her tightrope walking act." }
];
```

The array above contains objects missing certain properties or with their values set to null.

Write a function with code similar to question 2 but provide the following default values for missing properties:

 - `src`  - https://via.placeholder.com/250
 - `alt` - "Elephant picture"

Wrap all the `img` tags in a `div` tag.

The function should return an HTML string similar to this (without the indentation):

 ```html
<div><img src="https://elephant-api.herokuapp.com/pictures/001.jpg" alt="Elephant picture"><img src="https://via.placeholder.com/250" alt="From the Mysore Dasara procession."><img src="https://via.placeholder.com/250" alt="Known for her tightrope walking act."></div>
 ```

 Formatted version (yours will probably look like the above version):

 ```html
<div>
    <img src="https://elephant-api.herokuapp.com/pictures/001.jpg" alt="Elephant picture">
    <img src="https://via.placeholder.com/250" alt="From the Mysore Dasara procession.">
    <img src="https://via.placeholder.com/250" alt="Known for her tightrope walking act.">
</div>
 ```

 > The answer can be found [here](https://github.com/javascript-repositories/js1-lesson-answers/blob/module-4-lesson-4-question-3/script.js).

---

<h5 class="question">Question 4</h5>

We can use `fetch` to retrieve a list of results from an API call.

<small>
    Refer: 
    <ul>
        <li>
            Fetch API - <a href="https://interactive-content.now.sh/javascript-1/3/2#fetch">JavaScript 1 Module 3 Lesson 2</a>
        </li>
        <li>
            Displaying an array of results after an API call - <a href="https://interactive-content.now.sh/javascript-1/4/2">JavaScript 1 Module 4 Lesson 2</a>
        </li>
        <li>
            CORS - <a href="https://interactive-content.now.sh/javascript-1/4/1">JavaScript 1 Module 4 Lesson 1</a>
        </li>       
    </ul>
</small>

Create an `.html` file that contains the following element:

```html
<div class="results"></div>
```

Make a call to this URL:

```js
https://elephant-api.herokuapp.com/elephants
```

You will need to add the cors-anywhere link to the beginning of the URL:

```js
https://cors-anywhere.herokuapp.com/
```

In the second then method of the fetch call, pass the returned json to a function called `createElephantNames`.

The function should create a string of `h4` elements with the elephants' names as their text values. It should then set this to be the HTML property of the html element above.

Add a check to see if the object contains a name before creating an `h4` element.

 > The answer can be found [here](https://github.com/javascript-repositories/js1-lesson-answers/tree/module-4-lesson-4-question-4).


---

<h5 class="question">Question 5</h5>

We can use `fetch` to retrieve a specfic item from an API.

<small>
    Refer: 
    <ul>
        <li>
            Fetching a specific item from an API - <a href="https://interactive-content.now.sh/javascript-1/3/4">JavaScript 1 Module 3 Lesson 4</a>
        </li>       
    </ul>
</small>

Create an `.html` file that contains the following HTML and CSS:

```html
<div class="elephant-container hidden">
    <h1>Elephant name</h1>
    <img src="https://via.placeholder.com/250" alt="Elephant name" />
    <div class="note">Note content goes here</div>
</div>

<div class="no-result hidden">
    No elephant details were returned.
</div>
```

```css
img {
    max-width: 300px;
}

.hidden {
    display: none;
}
```

The API endpoint below will return an array containing either one random elephant object, or an array with an object containing only an id.

```
https://elephant-api.herokuapp.com/elephants/random
```

Pass what is returned from the call to a function called `displayElephantDetails`.

Inside this function, do one of two things:

- if the object returned has all the required properties, replace the placeholder values in the div with the class `elephant-container` with these values and display the container div
 - or, display the div with the class `.no-result`.

(Inside the function, you can get the object from the array by its index).

 > The answer can be found [here](https://github.com/javascript-repositories/js1-lesson-answers/tree/module-4-lesson-4-question-5).

---

<h5 class="question">Question 6</h5>

We can use string methods to validate form inputs.

<small>
    Refer: 
    <ul>
        <li>
            Validating forms - <a href="https://interactive-content.now.sh/javascript-1/4/1#validating-forms">JavaScript 1 Module 4 Lesson 1</a>
        </li>       
    </ul>
</small>

Add the following HTML and CSS to a page.

```html
<form>
    <div>
        <input type="text" id="firstName" placeholder="First name" />
        <div id="firstNameError" class="error">Please enter your first name</div>
    </div>
    <div>
        <input type="text" id="email" placeholder="Email address" />
        <div id="emailError" class="error">Please enter your email address</div>
        <div id="invalidEmailError" class="error">Please enter a valid email address</div>
    </div>
    <div>
        <textarea id="message"></textarea>
        <div id="messageError" class="error">Your message must be at least five characters long</div>
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

input,
textarea {
    width: 200px;
    padding: 10px;
    margin-top: 5px;
}
```

Write code that checks the following when the form is submitted:

- that the `firstName` input has a value
- that the `email` input has a value and is an email address
- the the `message` textarea has a value that is at least 5 characters long

Show/hide the appropriate error messages every time the validation runs. Remember to prevent the default behaviour of the form which is to submit the form and refresh the page.

> The answer can be found [here](https://github.com/javascript-repositories/js1-lesson-answers/tree/module-4-lesson-4-question-6).

---
- [Go to the module assignment](ma) 
---
