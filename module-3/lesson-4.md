# React 1 Lesson 4 - Forms

Forms are a big part of most web apps, but they can quickly become difficult to maintain and validate.

We are going to use [React Hook Form](https://react-hook-form.com/) to create a contact form. This is one of the simplest form solutions in React. [Formik](https://jaredpalmer.com/formik/) is another good solution.

```js
npm install react-hook-form
```

Replace the contents of `src/components/contact/Contact.js` with the following:

```js
import React from "react";
import { useForm } from "react-hook-form"
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

function Contact() {
    const { register, handleSubmit, errors } = useForm();

    function onSubmit(data) {
        console.log("data", data);
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <input name="firstName" placeholder="First name" ref={register({ required: true })} />
            {errors.firstName && <p>First name is required</p>}

            <input type="submit" />
        </form>
    );
}

export default Contact;
```

Let's go through each part of that code.

> The short explanation for the code above is that the onSubmit function will run when the form is submitted and all the inputs pass validation. <a href="#adding-bootstrap">Skip the full explanation</a>

First we import React, the `userForm` function from `react-hook-form` and two components from `react-bootstrap` which we will use a bit later.

Inside the `Contact` function, we retrieve the `register` and `handleSubmit` functions from calling `useForm()` as well as an `errors` object that will be used to display validation errors.

The `onSubmit` function will run if the form inputs pass validation. This function receives one argument which will be an object holding the input values from the form.

Inside the `form` element, the `onSubmit` attribute receives the `handleSubmit` function which runs validation and if the validation passes, runs the `onSubmit` function declared above.

Our form only has one input with the name `firstName`. 

To access the values in form inputs, we need to "register" each input by using a [ref](https://reactjs.org/docs/refs-and-the-dom.html) and calling the `register` function. A `ref` is a way to access DOM nodes - the actual HTML element that is created after React is compiled.

```js
<input name="firstName" placeholder="First name" ref={register({ required: true })} />
```

Each input must have a unique `name` value.

Inside the `register` function we are passing a validation objection. The object in this case has one property - the input is required.

If the validation for this input fails, the error message below it will be displayed.

```jsx
 {errors.firstName && <p>First name is required</p>}
 ```

This code means, if there is `firstName` property in the `errors` object it means there is a validation error for the input with the name `firstName`, so display an error message about it.

So the `handleSubmit` function will run validation on the inputs before calling the function passed in to it, in this case `onSubmit`. Our `onSubmit` function is simply logging the input data sent from the form. Check your console to see the submitted data. This is where we could make an API call and send the data to the server.


---

<h3 id="adding-bootstrap">Adding Bootstrap</h3>

Our form is looking very ugly, lets add some `react-bootstrap` components:

```jsx
return (
    <Form onSubmit={handleSubmit(onSubmit)}>
        <Form.Group>
            <Form.Label>Name</Form.Label>
            <Form.Control name="firstName" placeholder="First name" ref={register({ required: true })} />
            {errors.firstName && <p>First name is required</p>}
        </Form.Group>

        <Button type="submit">Submit</Button>
    </Form>
);
```

No functionality has changed here, we are just using the `react-bootstrap` components to style the form. `Form.Control` is just an `input`.

Let's add two more inputs, `email` and `age`:

```jsx
return (
    <Form.Group>
        <Form.Label>Name</Form.Label>
        <Form.Control name="firstName" placeholder="Enter your name" ref={register} />
        {errors.firstName && <p>First name is required</p>}
    </Form.Group>

    <Form.Group>
        <Form.Label>Email</Form.Label>
        <Form.Control name="email" placeholder="Enter your email" ref={register} />
        {errors.email && <p>Email is required</p>}
    </Form.Group>

    <Form.Group>
        <Form.Label>Age</Form.Label>
        <Form.Control type="number" name="age" placeholder="Enter your age" ref={register} />
        {errors.age && <p>Age is required</p>}
    </Form.Group>
);
```

### Using yup for validation

Providing a validation object for an input inside the `register` function is convenient for simple validation like `required`, but becomes clumsy when trying to validate things like email addresses.

We are going to use [Yup](https://github.com/jquense/yup) to create a validation schema to validate the inputs.

```js
npm install yup
```

With Yup we can build a schema object that we want the data submitted from the form to match. If the data matches the schema, validation passes.

This will be our Yup schema:

```js
const schema = yup.object().shape({
	firstName: yup.string().required("First name is required"),
	email: yup
		.string()
		.email("Please enter a valid email")
		.required("Email is required"),
	age: yup
		.number()
		.required()
		.integer()
		.min(10, "Age must be greater or equal to 10")
		.max(30, "Age must be less than or equal to 30")
});
```

In the above schema, we are defining the following rules the values for the inputs must match:

- `firstName` is required
- `email` is required and must be a valid email format
- `age` is a number, is required, must be a minimum of 10 and a maximum of 30

Yup provides default messages for each validation criteria but we can also supply our own like we did above.

Now we have to pass the schema into `useForm`:

```js
const { register, handleSubmit, errors } = useForm({
    validationSchema: schema
});
```

Previously we hard-coded the error messages, e.g. 

```js
 {errors.email && <p>Email is required</p>}
 ```

 But that's not very user-friendly. The same message would be displayed for a missing email address as it would for an invalid one.

Using Yup we can display dynamic error messages depending on which validation criteria failed.

```js
{errors.email && <p>{errors.email.message}</p>}
```
Test the form and you will see the error messages update in real time.

---

Final code for the form:

```jsx
import React from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

const schema = yup.object().shape({
	firstName: yup.string().required("First name is required"),
	email: yup
		.string()
		.email("Please enter a valid email")
		.required("Email is required"),
	age: yup
		.number()
		.required()
		.integer()
		.min(10, "Age must be greater than 10")
		.max(30, "Age must be less than 10")
});

function Contact() {
	const { register, handleSubmit, errors } = useForm({
		validationSchema: schema
	});

	function onSubmit(data) {
		console.log("data", data);
	}

	return (
        <Form onSubmit={handleSubmit(onSubmit)}>
            <Form.Group>
                <Form.Label>Name</Form.Label>
                <Form.Control name="firstName" placeholder="Enter your name" ref={register} />
                {errors.firstName && <p>{errors.firstName.message}</p>}
            </Form.Group>

            <Form.Group>
                <Form.Label>Email</Form.Label>
                <Form.Control name="email" placeholder="Enter your email" ref={register} />
                {errors.email && <p>{errors.email.message}</p>}
            </Form.Group>

            <Form.Group>
                <Form.Label>Age</Form.Label>
                <Form.Control type="number" name="age" defaultValue="10" placeholder="Enter your age" ref={register} />
                {errors.age && <p>{errors.age.message}</p>}
            </Form.Group>

            <Button type="submit">Submit</Button>
        </Form>
	);
}

export default Contact;
```

The code added so far can be found on [this branch](https://github.com/javascript-repositories/react-module-1-code/tree/step-6) of the [repo](https://github.com/javascript-repositories/react-module-1-code).


## Practice

The form's validation error messages are being displayed in `p` tags. 

Create a component called `ErrorMessage` in `src/components/contact/ErrorMessage.js`. Give it a class and style it in `sass/style.scss`.

Import in `Contact.js` and use it instead of the `p` tags.

---

Example code for this can be found on [this branch](https://github.com/javascript-repositories/react-module-1-code/tree/step-7) of the [repo](https://github.com/javascript-repositories/react-module-1-code).

---

## Form builder

Apart from being arguably the easiest to use React form library, requiring the least amount of code, React Hook Form also offers a [form builder](https://react-hook-form.com/form-builder).

Validation is currently only available through the `register` function. 

---

[Go to the module assignment](ma)

---