# JavaScript Frameworks Course Assignment

## Instructions

You can use either React or Vue for the assignment, and you can use any React or Vue UI library (such as React Boostrap, Material UI or Bootstrap Vue) or write your own styles.

We will be using the [RAWG Video Games Database API](https://rawg.io/apidocs) for the assignment.

The base URL for the calls will be 

```js
https://api.rawg.io/api/games
```

**Only Level 1 is mandatory**

## Level 1

Create a menu with the following paths:

- `/` - home page
- `/contact`

You will need to create routes for these as well as a route for the details page. This route can be `/game/:id`


### Home page

Make a call to the base URL and display the games returned.

Each game should display the following:

- `Title`
- `Image`
- `Rating`
- `Release date`
- A `button/link` that takes the user to the game details page with the game id in the path (URL).

(Always remember to inspect the results of on API calling using console.log or console.dir to see what the API returns and what properties are available).

There should be a search box above the results that filters the games on their titles.

## Game details page

Retrieve the id from the URL, add it to the base URL and make an API call with this new URL.

Display the following with the results of the call:

- `Title`
- `Image`
- `Description`
- `Website link`

## Contact page

This page should contain the following inputs and validation rules:

- `First name` - required, minimum 2 characters
- `Last name` - required, minimum 2 characters
- `Email` - required, must be in a valid email format
- `Message` - required, minimum 10 characters.

Ideally the form should display a message above itself if validation passes.

## Level 2

## Game details page 

Add components that display the game's genres and platforms as lists. You can style them like tags.

## Favourites

Add a `favourite` or `like` button to each game result on the home page. Clicking on a `favourite` button should add the game's required info (id, title, image, rating and release date) as an object to an array in local storage. Clicking it again should remove it.

Add a `/favourites` menu item and path. This page should retrieve the favourites from local storage and display them.

If your game list component is tightly coupled to the API call, this would be a good time to refactor and pass in the array of games as a prop.

## Level 3

Using a state management solution like `Redux`, the `useReducer` hook or `Vuex`, store the results of the API call in global state. On the home and game details page the game(s) should be retrieved from the global state, not API calls.

The favourites should also be added/removed from the state rather than local storage.


## Submission

- Create a repository in your GitHub account called `your-name-js-frameworks-ca`, e.g. `mary-smith-js-frameworks-ca` and make sure it's public.
- Add, commit and push all your code to this repo.
- Submit the repo link.
