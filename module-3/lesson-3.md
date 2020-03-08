# React 1 Lesson 3 - Bootstrap and routing

The best thing about React components is that they are reusable. Once written, we can simply import them and use them. We can also import components written by other developers.

You used Bootstrap in an earlier course and we are going to use a library with React versions of the components - [React Bootstrap](https://react-bootstrap.github.io/).

From your terminal/command line, run:

```js
npm i react-bootstrap
```

In the `public/index.html` add a link to the latest Boostrap CDN CSS file, just as you would for a non-React site.

```html
<link
    rel="stylesheet"
    href="https://maxcdn.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css"
/>
```

The first component we want to use from React Bootstrap is the [Navbar](https://react-bootstrap.github.io/components/navbar/).

You'll be used to seeing Bootstrap code examples as HTML elements with classes. In this library all the elements will be React components.

First we'll use the `Navbar` and `Nav` components.

In `src/components/layout/Layout.js` import both of these:

```js
import React from "react";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
```

Replace the Layout function with the code below:

```jsx
function Layout() {
    return (
        <Navbar bg="dark" variant="dark" expand="lg">
            <Navbar.Brand href="/">Rick and Morty</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="mr-auto">
                    <Nav.Link href="/">Home</Nav.Link>
                    <Nav.Link href="/about/">About</Nav.Link>
                    <Nav.Link href="/contact/">Contact</Nav.Link>
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    );
}

export default Layout;
```

We're using the `Navbar`'s `bg` and `variant` props to change the style of the nav to a dark one. We've changed the brand name to "Rick and Morty" and added `About` and `Contact` links.

Our site now has a responsive nav bar.

## Routing

We have a link to an About page and a Contact page in our navigation, but no way to display that content.

We will create components to display content on each of those pages, but first let's edit the `Heading` component and remove the `h2` element so that we can use just its `h1` element in the other components.

```js
import React from "react";

function Heading({ title }) {
	return (
		<h1>{title}</h1>
	);
}

export default Heading;

```

Now lets add three new components, `Home`, `About` and `Contact`.
 
Create the following files:

- `src/components/home/Home.js`
- `src/components/about/About.js`
- `src/components/contact/Contact.js`

Import the `Heading` component in each and set a title value for the prop in each.

`src/components/home/Home.js`:

```jsx
import React from 'react';
import Heading from "../layout/Heading";

export function Home() {
    return (
        <Heading title="Home" />
    );
}

export default Home;
```

`src/components/about/About.js`:

```jsx
import React from 'react';
import Heading from "../layout/Heading";

export function About() {
    return (
        <>
            <Heading title="About" />
            <p>This is the about page</p>
        </>
    );
}

export default About;
```

`src/components/contact/Contact.js`:

```jsx
import React from 'react';
import Heading from "../layout/Heading";

export function Contact() {
    return (
        <Heading title="Contact" />
    );
}

export default Contact;
```

Now we need something to navigate around the site. We are going to use [React Router](https://reacttraining.com/react-router/web/guides/quick-start).

```js
npm i react-router-dom
```

Now we can write code to navigate between these components.

In `Layout.js`, we need to add more imports and again edit what is returned:

```jsx
import React from 'react'
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import {
    BrowserRouter as Router,
    Switch,
    Route,
    NavLink,
} from "react-router-dom";
import Container from "react-bootstrap/Container";
import Home from "../home/Home";
import About from "../about/About";
import Contact from "../contact/Contact";

function Layout() {
    return (
        <Router>
            <Navbar bg="dark" variant="dark" expand="lg">
                <NavLink to="/" exact>
                    <Navbar.Brand>Rick and Morty</Navbar.Brand>
                </NavLink>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="mr-auto">
                        <NavLink to="/" exact className="nav-link">
                            Home
                        </NavLink>
                        <NavLink to="/about" className="nav-link">
                            About
                        </NavLink>
                        <NavLink to="/contact" className="nav-link">
                            Contact
                        </NavLink>
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
            <Container>
                <Switch>
                    <Route path="/" exact component={Home} />
                    <Route path="/about" component={About} />
                    <Route path="/contact" component={Contact} />
                </Switch>
            </Container>
        </Router>
    );
}

export default Layout;
```

Apart from the new imports, we swapped out the `Nav.Link` Bootstrap components for `NavLink` components from React Router.

We added a `Switch` to contain our `Routes`. Each `Route` points to a component we created above. The content that the `Routes` point to will be displayed inside the `Container`. We wrapped the `Navbar.Brand` in a `NavLink` that also points to the home page. The `/` path is the home page. Finally, everything we return is contained in a `Router` component.

In the browser you will now be able to navigate between the Home, About and Contact components. Note that navigating between "pages" doesn't cause the browser to reload.


The code added so far can be found on [this branch](https://github.com/javascript-repositories/react-module-1-code/tree/step-4) of the [repo](https://github.com/javascript-repositories/react-module-1-code).


---

## Practice

Create the following files:

- `src/components/slider/SliderContainer.js`
- `src/components/slider/Slider.js`

Create a component called `Slider` in `Slider.js`.

Using the React Bootstrap [carousel component](https://react-bootstrap.github.io/components/carousel/), create a carousel (image slider) with 3 slides. Use images from a free source like <a href="https://unsplash.com/" target="_blank">Unsplash</a>.

The component should receive 3 props that are used as the values inside the `h3` tags in each carousel item's label and image alt attribute.

In `SliderContainer.js` import the `Slider` component and pass in three props for the captions. You can call the props `label1`, `label2` and `label3`.

In `Layout.js`, import `SliderContainer`, create a `NavLink` pointing `to` "/slider" and a `Route` with a path of "/slider" and a component of `SliderContainer`.

--- 

Example code for this can be found on [this branch](https://github.com/javascript-repositories/react-module-1-code/tree/step-5) of the [repo](https://github.com/javascript-repositories/react-module-1-code).

---

[Go to lesson 4](4)

---
