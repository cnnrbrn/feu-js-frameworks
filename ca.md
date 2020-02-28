# JavaScript 1 Course Assignment

Level 1 is required.

Level 2 is optional.

Choosing appropriate variable and function names will form part of your assessment, as will proper and consistent formatting of your code.

---

## Instructions

All the HTML and CSS needed for the level 1 requirements is provided in the [repo](https://github.com/javascript-assignments/javascript-1-ca). Download or clone this repo and add your code to it.

There are five `.html` files, four of which you will need to attach your JavaScript code too.

You can use the `.js` files provided.

You will use the [Rick and Morty API](https://rickandmortyapi.com/documentation/#rest) for the API calls in the assignment.

The base URL for the calls will be 

```js
https://rickandmortyapi.com/api/character/
```


## Level 1

### `index.html`

Make a call to the base URL, loop through the results and create the following HTML for each result (this HTML is in index.html in the repo too):

```html
<div class="col-sm-6 col-md-4 col-lg-3">                
    <div class="card">    
        <img class="image" src="https://via.placeholder.com/300" alt="Character Name">
        <div class="details">
            <h4 class="name">Character Name</h4>
            <p>Type: Type value here</p>    
            <p>Episode count: Episode count here</p>                                  
            <a class="btn btn-primary" href="details.html?id=">Details</a>
        </div>
    </div>
</div>
```

Replace each placeholder value with an appropriate value from the results.

If the `type` property is empty or doesn't exist display the string `Unknown` instead.

Add an `id` value to the id paramater in the link's href value. 

```js
href="details.html?id=1234"
```

(`1234` in the above example will be replaced by the id of the result)

You will fetch this `id` parameter from the query string in the details page code.

If there is an error in the API call redirect to `error.html`.

There is a (commented out) loader div in the HTML you can display while the API call is in progress.

```html
<div class="loader"></div>
```

---

### `details.html`

(Remember you will need an id parameter in the query string on this page, so either click through to it from the index page or manually add an id parameter to the URL).

Retrieve the `id` parameter from the query string. If the id parameter doesn't exist redirect to index.html.

Add the id to the end of the base URL, so that it looks something like the below (`1234` will be replaced by the id):

```js
https://rickandmortyapi.com/api/character/1234
```

Make an API call using this URL.

From the data object that is returned, replace all the placeholder values in the HTML on the page with the relevant properties.

```html
<div class="detail-container">
    <img class="details-image" src="https://via.placeholder.com/250" alt="Character Name" />
    <div class="detail-details">
        <h1>Character Name</h1>
        <p>Status: <span class="value" id="status">Status goes here</span></p>
        <p>Species: <span class="value" id="species">Species goes here</span></p>
        <p>Origin: <span class="value" id="origin">Origin name goes here</span></p>
        <p>Location: <span class="value" id="location">Location name goes here</span></p>                   
    </div>
</div>
```

Set the title of the page to be the name of the character.

If there is an error in the API call redirect to `error.html`.

---

### `about.html`

Four seconds after this page loads, replace each occurence of the word `the` and `The` with the word `replaced` and `Replaced` respectively - `the` becomes `replaced` and `The` becomes `Replaced`.

Do this for the heading and the rest of the text.

---

### `contact.html`

When the form on this page is submitted, write code to validate the inputs"

- `First name` - must have a value
- `Last name` - must have a value
- `Email` - must have a value and be formatted like an email address
- `Message` - must have a value that is at least 10 characters long

If any of the inputs fail validation display the relevant error message.

---

## Level 2

### `details.html`

Display a loader div and hide the other HTML until the API call has completed. Then hide or remove the loader and show the other HTML.

There is a `hidden` class in the provided CSS which has one property: `display: none;`.

### `contact.html`

Remove the id attributes from the error messages and hide/show them without using their ids.

If all validation passes, add a message above the form indicating the form passed validation. Hide the message if the form fails validation.

## Submission

- Create a repository in your GitHub account called `your-name-js1-ca`, e.g. `mary-smith-js1-ca`, and __make sure it's public__
- If you downloaded the repository you can simply commit and push your code to your repository
- If you cloned the repository you can change the origin url so that pushes will be sent to your repo:

```js
git remote set-url origin NEW_URL
```

where `NEW_URL` is your repo's URL.

- Submit the repo link

