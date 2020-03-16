
# Module Assignment 3

You can use a UI library for the assignment but you can also just use unstyled HTML. The focus is on creating components so how it looks is not important.

Arrange your components in folders.

## Level 1

- Create a new React app using Create React App. You can call it `react-ma3`.
- install `react-router-dom`, `react-hook-form` and `yup`
- Create the following components:

**Heading**

This should render its `content` prop in `h1` tags

**HomeContent**

This will render its `children` prop inside `div` tags.

**NewsList**

This should render 3 `li` items with dummy lorem ipsum text inside a `ul`. This component won't receive any props.

**LoginForm**

Use `react-hook-form` and `yup` to create and validate a form with two inputs:

- `username` - required
- `password` - required with a minimum length of 4 characters

**Home**

This will import and render the Heading and HomeContent components, sending appropriate props in to each. You can use lorem ipsum for the HomeContent component.

**News**

This will import and render the Heading and NewsList components.

**Login**

This will import and render the Heading and LoginForm components.


**Layout**

Use React Router to create links to the Home, News and Login components, using the paths `/`, `/news` and `/login`.


Import and return the Layout component in `src/App.js`.

---

## Submission

- Create a repository called `your-name-js-frameworks-ma3.js`, e.g. `mary-smith-js-frameworks-ma3.js` and make sure it's public.
- Add, commit and push all your code to this repo.
- Submit the repo link

