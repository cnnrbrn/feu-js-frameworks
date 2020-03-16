# Module Assignment 4

This assignment will use the same API URL the Vue assignment did:

```js
http://www.recipepuppy.com/api/
```

It requires a CORS workaround so use: 

```js
https://cors-anywhere.herokuapp.com/http://www.recipepuppy.com/api/
```

You can use a UI library like React Bootstrap or [Material UI](https://material-ui.com/) for the assignment but you can also just use unstyled HTML.

## Level 1

- Create a new React app using Create React App. You can call it `react-ma4`.
- Add appropriate PropType checks to the components.
- Create the following components:


**RecipeList**

This component will connect to the API and display a list of recipe items using the `RecipeItem` component below.

As always, inspect the return value of the API call to determine the appropriate properties to use as props for the `RecipeItem` component.

This component will pass a function that filters the list on the relevant property into the `SearchRecipe` component.

**RecipeItem**

This component will display the name and image of the recipe.

**SearchRecipe**

This component will recieve a filtering function as a prop. Include the component in the `RecipeList` component above the list.

## Level 2

Create an `IngredientList` component that receives a list of ingredients as a string. Convert the string into an array and return a list of ingredients using the `map` method.

Include this component in the `RecipeItem` component.

## Submission

- Create a repository called `your-name-js-frameworks-ma4.js`, e.g. `mary-smith-js-frameworks-ma4.js` and make sure it's public.
- Add, commit and push all your code to this repo.
- Submit the repo link.

