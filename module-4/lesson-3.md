# Lesson 3 - Displaying the results of an API call to a specific resource

In this lesson we'll style each character result using React Bootstrap components and link from each result to a page that will display details of the character.

--- 

First we are going to add a card for each item.

We need to add some styles so create a file called `_character.scss` in `src/sass/partials` and add the following

```scss
.card {
    margin-bottom: 30px;
    box-shadow: 0px 3px 16px #ccc;
    transition: all 0.4s;

    &::hover {
        box-shadow: 0 0 0 #ccc;
    }
}

.card-title.h5 {
    font-size: 1em;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
}

.search {
    margin: 2em 0;
}

.clear-search {
    margin-bottom: 30px;
}

.clear-search__button {
    margin-left: 10px;
}
```

Import it in `src/sass/style.scss`:

```scss
@import "partials/_characters";
```

We are going to create a new component for our card code. Add the following file and code to it: `src/components/characters/CharacterItem.js`

```jsx
import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";

function CharacterItem({ id, name, image }) {
	return (
		<Card>
			<Card.Img variant="top" src={image} />
			<Card.Body>
				<Card.Title>{name}</Card.Title>
				<Link to={"character/" + id}>
					<Button variant="secondary" block>
						View
					</Button>
				</Link>
			</Card.Body>
		</Card>
	);
}

CharacterItem.propTypes = {
	id: PropTypes.number.isRequired,
	name: PropTypes.string.isRequired,
	image: PropTypes.string.isRequired
};

export default CharacterItem;
```

We have several imports here and provide PropType checks for the props.

The component receives three props: `id`, `name` and `image`. 

The `image` props is used as the src for the `Card.Img` component, `name` is used inside the `Card.Title` component tags and `id` is used to build a URL for the `Link` component imported from `react-router-dom`.

You can read more about on the `Card` component [in the docs](https://react-bootstrap.github.io/components/cards/).

Clicking on the `Button` component will take the user to a URL such as `character/2`.

<!-- We need to add `character` to our collection of paths. -->


We will import this component in the `CharacterList` component and pass in the props as the results are looped through.

Back in the `CharacterList` component, add the following imports:

```js
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import CharacterItem from "./CharacterItem";
```

And change the return code to:

```js
return (
    <Row>
        {characters.map(character => {
            const { id, name, image } = character;

            return (
                <Col sm={6} md={3} key={id}>
                    <CharacterItem id={id} name={name} image={image} />
                </Col>
            );
        })}
    </Row>
);
```

> The `CharacterList` component will now look like [this](https://github.com/javascript-repositories/react-module-1-code/blob/step-11/src/components/characters/CharacterList.js).

We're destructuring the properties from each `character` object, then sending them as props in to the `CharacterItem` component.

We've wrapped all the components in a `Row` and each `CharacterItem` in a `Col`. These components have similar styles to the `row` and `col` classes in plain Bootstrap, so are used for grid layouts.

## The character detail component

We need a component to display the info for a particular character, but first we need to add a route for the `character/:id` path. The `:id` part is the part of the path that will contain the character id, e.g. the `4` in `character/4`.

In the `Layout` component add the following import.

```js
import CharacterDetail from "../characters/CharacterDetail";
```

and add the `Route` to `character/:id` in the `Switch`:

```jsx
<Switch>
    <Route path="/" exact component={Home} />
    <Route path="/about" component={About} />
    <Route path="/contact" component={Contact} />
    <Route path="/slider" component={SliderContainer} />
    <Route path="/character/:id" component={CharacterDetail} />
</Switch>
```

> The `Layout` component will now look like [this](https://github.com/javascript-repositories/react-module-1-code/blob/step-11/src/components/layout/Layout.js).

Now we need to create the `CharacterDetail` component that we imported.

Create `src/components/characters/CharacterDetail` and add the following:

```js
import React, { useState, useEffect } from "react";
import Spinner from "react-bootstrap/Spinner";
import { useParams } from "react-router-dom";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Image from "react-bootstrap/Image";
import { BASE_URL } from "../../constants/api";

function CharacterDetail() {
	const [detail, setDetail] = useState(null);
	const [loading, setLoading] = useState(true);

	let { id } = useParams();

	const url = BASE_URL + id;

	useEffect(() => {
		fetch(url)
			.then(response => response.json())
			.then(json => console.log(json))
			.catch(error => console.log(error))
			.finally(() => setLoading(false));
	}, []);

	if (loading) {
		return <Spinner animation="border" className="spinner" />;
	}

	return null;
}

export default CharacterDetail;

```

We're importing several Bootstrap componnents, the `useState` and `useEffect` hooks again as well as `useParams` from `react-router-dom`.

We again create the `loading` property and the `setLoading` function. 

We create a `detail` property that will store the data from the API call and a `setDetail` function to update it. `detail` has an initial value of `null`.

In this line

```js
let { id } = useParams();
```

we call the `useParams` function to get the parameters from the URL and retrieve the `id` param, e.g the `4` in `character/4`.

In the following line

```js
const url = BASE_URL + id;
```

we add the `id` to the `BASE_URL` and store it in a `url` variable which we use in the `fetch` method.

In the second `then` method the result of the call is logged. The result is an object containing character properties.

We again return the `Spinner` if the `loading` property is true and use `setLoading` to set it to false in the `finally` block.

Now we need to assign the return result of the call to  `detail` and change what the component returns.

Update `CharacterDetail` to contain this:

```jsx
import React, { useState, useEffect } from "react";
import Spinner from "react-bootstrap/Spinner";
import { useParams } from "react-router-dom";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Image from "react-bootstrap/Image";
import { BASE_URL } from "../../constants/api";

function CharacterDetail() {
	const [detail, setDetail] = useState(null);
	const [loading, setLoading] = useState(true);

	let { id } = useParams();

	const url = BASE_URL + id;

	useEffect(() => {
		fetch(url)
			.then(response => response.json())
			.then(json => setDetail(json))
			.catch(error => console.log(error))
			.finally(() => setLoading(false));
	}, []);

	if (loading) {
		return <Spinner animation="border" className="spinner" />;
	}

	return (
		<Row>
			<Col md={6} className="detail-image">
				<Image src={detail.image} roundedCircle />
			</Col>
			<Col>
				<h1>{detail.name}</h1>
                <p>
					<b>Gender:</b> {detail.gender}
				</p>
				<p>
					<b>Species:</b> {detail.species}
				</p>
				<p>
					<b>Status:</b> {detail.status}
				</p>
			</Col>
		</Row>
	);
}

export default CharacterDetail;
```

The `setDetail` function is now being called in the second `then` method and the results of the call are being assigned to the `detail` property.

`Row`, `Col` and `Image` Bootstrap components are being used in the return and several properties from the `detail` object are being displayed.



<!-- 


Now if we click on a card's button we will see the loading spinner return from the `CharacterDetailContainer`.

Back in `CharacterDetailContainer` let's make the API call. We'll use the `params` object on the `match` prop to get the `id` from the url.

First we add the propType checks (this is where we can add them on a class) and then do the API call in componentDidMount. When the call is complete we set the `state.details` property to the return value and set `state.loading` to false:

```js
static propTypes = {
    match: PropTypes.object.isRequired,
}

state = {
    details: null,
    loading: true,
}

componentDidMount() {
    // get the id from the URL
    const { id } = this.props.match.params
    //create the URL string
    const url = `${BASE_URL}/${id}`

    fetch(url)
        .then(response => response.json())
        .then(json => {
            this.setState({
                details: json,
                loading: false
            })
        })
        .catch(error => {
            console.log(error)

            this.setState({
                loading: false
            })
        });
}
```

We could also use an `async-await` call here:

```js
async componentDidMount() {
    const { id } = this.props.match.params
    const url = `${BASE_URL}/${id}`

    try{
        const response = await fetch(url);
        const json = await response.json();

        this.setState({
            details: json,
            loading: false
        })
    }
    catch(error) {
        console.log(error)
        this.setState({
            loading: false
        })
    }
}
```

Now we can display the character's details:

```js
return <div>{details.name}</div>;
```

Full code so far:

```js
import React, { Component } from "react";
import PropTypes from "prop-types";
import Spinner from "react-bootstrap/Spinner";
import { BASE_URL } from "../../../constants/API";
import "./CharacterDetail.css";

export default class CharacterDetail extends Component {
    static propTypes = {
        match: PropTypes.object.isRequired,
    };

    state = {
        details: null,
        loading: true,
    };

    async componentDidMount() {
        const { id } = this.props.match.params;
        const url = `${BASE_URL}/${id}`;

        try {
            const response = await fetch(url);
            const json = await response.json();

            this.setState({
                details: json,
                loading: false,
            });
        } catch (error) {
            this.setState({
                loading: false,
            });
        }
    }

    render() {
        const { loading, details } = this.state;

        if (loading || !details) {
            return <Spinner animation="border" className="spinner" />;
        }

        return <div>{details.name}</div>;
    }
}
```

We'll add a new component to display the image and details.

Add the following file and CSS to it: `src/components/characters/detail/CharacterDetail.css`

```css
.detail-image {
    display: flex;
    justify-content: center;
    margin-bottom: 40px;
}

.character-breadcrumb .breadcrumb {
    background-color: transparent;
    margin-bottom: 40px;
    border-bottom: 1px solid #ddd;
    border-radius: 0;
}

.character-breadcrumb a {
    color: #333333;
    font-weight: bold;
}

.character-breadcrumb a::before {
    content: "<<";
    margin-right: 7px;
}
```

Then create `src/components/characters/detail/CharacterDetail.js` with the following code:

```js
import PropTypes from "prop-types";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Image from "react-bootstrap/Image";
import "./CharacterDetail.css";

export default function CharacterDetail({ details }) {
    const { name, image, gender, species, status, episode, location } = details;

    return (
        <Row>
            <Col md={6} className="detail-image">
                <Image src={image} roundedCircle />
            </Col>
            <Col>
                <h1>{name}</h1>
            </Col>
        </Row>
    );
}

CharacterDetail.propTypes = {
    details: PropTypes.object.isRequired,
};
```

We're receiving one object prop called `details` from the calling component and using more `react-bootstrap` components.

Now we can import and call this from `CharacterDetailContainer`:

```js
import CharacterDetail from "./CharacterDetail";
```

```js
return <CharacterDetail details={details} />;
```

Finally in this section we are going add one more component that will render a list of character details.

Create the following: file `src/characters/detail/DetailList.js` and the code:

```js
import PropTypes from "prop-types";
import ListGroup from "react-bootstrap/ListGroup";

export default function DetailList({
    gender,
    species,
    status,
    episodes,
    location,
}) {
    const numberOfEpisodes = episodes.length;

    const { name: locationName } = location;

    return (
        <ListGroup>
            <ListGroup.Item>
                <b>Gender</b>: {gender}
            </ListGroup.Item>
            <ListGroup.Item>
                <b>Species</b>: {species}
            </ListGroup.Item>
            <ListGroup.Item>
                <b>Status</b>: {status}
            </ListGroup.Item>
            <ListGroup.Item>
                <b>Episodes</b>: {numberOfEpisodes}
            </ListGroup.Item>
            <ListGroup.Item>
                <b>Location</b>: {locationName}
            </ListGroup.Item>
        </ListGroup>
    );
}

DetailList.propTypes = {
    gender: PropTypes.string.isRequired,
    species: PropTypes.string.isRequired,
    status: PropTypes.string.isRequired,
    episodes: PropTypes.array.isRequired,
    location: PropTypes.object.isRequired,
};
```

Two things to note here are that `episodes` is an array and we want to only display the number of episodes; and we are destructuring the `name` property from the `location` object and giving it an alias of `locationName`.

We can now import the `DetailList` component in `CharacterDetail` and pass the props in. Final code for `CharacterDetail`:

```js
import React from "react";
import PropTypes from "prop-types";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Image from "react-bootstrap/Image";
import DetailList from "./DetailList";
import "./CharacterDetail.css";

export default function CharacterDetail({ details }) {
    const { name, image, gender, species, status, episode, location } = details;

    return (
        <Row>
            <Col md={6} className="detail-image">
                <Image src={image} roundedCircle />
            </Col>
            <Col>
                <h1>{name}</h1>
                <DetailList
                    gender={gender}
                    species={species}
                    status={status}
                    episodes={episode}
                    location={location}
                />
            </Col>
        </Row>
    );
}

CharacterDetail.propTypes = {
    details: PropTypes.object.isRequired,
};
```

---

## Practice

-   Add more details from the API call to the `DetailList` component.
-   Create an `ErrorAlert` component which takes a single `message` prop. In `CharacterDetailContainer` check for the presence of an `error` property on the json result. If it exists display the `ErrorAlert` rather than the `CharacterDetail`. A missing or badly formed `id` in the URL will return an error.

--- -->

[step-11](https://github.com/javascript-repositories/react-module-1-code/tree/step-11) of the repo contains the code added so far.


---
[Go to lesson 4](4) 
---
