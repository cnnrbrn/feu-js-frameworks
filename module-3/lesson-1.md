# Lesson 1 - Arrow functions, scope, `this` and the ternary operator

## Fat arrow functions

We've worked with a few different types of functions up until now:

**Declared function:**
```js
function doSomething(anArgument) {
    console.log(anArgument);
}
```

**Function expression**
```js
const doSomething = function(anArgument) {
    console.log(anArgument);
}
```

**Anonymous function**
```js
function(anArgument) {
    console.log(anArgument);
}
```

ES6 introduced what are known as `fat arrow` or `arrow` functions, so called because of their use of this token: `=>`.

When using arrow functions, you don't use the word function to define them.

Arrow functions are anonymous, you don't declare them with a name.

Here is the function expression from above written as an arrow function:

```js
const doSomething = (anArgument) => {
    console.log(anArgument);
}
```

We can write this on one line:

```js
const doSomething = (anArgument) => { console.log(anArgument); }
```

Here is the anonymous function re-written using fat arrow syntax:

```js
(anArgument) => { console.log(anArgument); }
```

You can see there is no `function` keyword and there is now a `fat arrow`: `=>`.

If the function has only one argument, you don't need the parenthesis:

```js
const doSomething = anArgument => {  console.log(anArgument); }
```

```js
anArgument => { console.log(anArgument); }
```

If the function has only one statement in it, you can omit the braces:

```js
const doSomething = anArgument => console.log(anArgument);
```

```js
anArgument => console.log(anArgument);
```

If the function has no arguments the parenthesis are required:

```js
const doSomething = () => console.log("hello");
```

```js
() => console.log("hello");
```

If the function has more than one argument the parenthesis are required:

```js
const doSomething = (argument1, argument2) => console.log(argument1, argument2);
```

```js
(argument1, argument2) => console.log(argument1, argument2);
```

A function always returns a value, even if you don't explicitly add a return statement. If there is no return statement, the function returns `undefined`.

> You'll often see `undefined` displayed after entering code directly in the console. This is because Chrome displays the return value of the last statement. If there is no explicit return value, the return value is undefined.

Let's return a value from an arrow function:

```js
const sum = (a, b) => a + b;
```

The `return` keyword is implicit in arrow functions, we can leave it out if body of the function consists of one statement.

Apart from being a concise way to write functions, arrow functions also handle the `this` keyword differently than "regular" functions.

We'll discuss `this` after we have a look at scope.

## Scope

`Scope` refers to where variables are available to be used.

There are three types of scope:

- global scope
- functional scope
- block scope

#### Global scope

Variables in the global scope are available from anywhere in the code. No matter where you are in the code you can access a global variable.

If you enter the following at the top of a script file or in the console

```js
const animal = "giraffe";
```

you have created a global variable. It is accessible from anywhere, including inside functions:

```js
// declare the variable in the global scope
const animal = "giraffe";

// declare the function
function scopeTest() {
    // try to access the animal variable
    // we can access the animal variable here because it was declared in the global scope
    console.log(animal);

}

scopeTest();
// giraffe

 // we can access the animal variable here too
console.log(animal);
// giraffe
```


#### Functional scope

Variables defined inside a function are only available to other code inside that function.

Let's move the `animal` variable declaration inside a function:

```js
function scopeTest() {
    const animal = "giraffe";
    // we can access the animal variable here as the code is inside the same function the variable was declared in
    console.log(animal);
}

scopeTest();
// giraffe

// we can NOT access the animal variable here
console.log(animal);
// Uncaught ReferenceError: animal is not defined
```

When we try to access `animal` from outside the function we get an `Uncaught ReferenceError` as the code outside the function does not have access to any variable declared inside the function.

#### Block scope

`Blocks` are created by curly braces `{}`. The code inside the braces is considered to be inside a block, except when the braces form part of a function. Then the code is inside the function.

We've seen examples of blocks created by braces in `if statements` and `for loops`:

```js
if(true) {
    // this is inside a block
}

for(let i = 0; i < 5; i++) {
    // this is inside a block
}
```

Variables created inside a block  with `const` and `let` have `block scope`, they are only available to code inside the block.

If we try to access a variable declared in a block from outside the block, we will get a `ReferenceError`.

```js
if(true) {
    const number = 4;
}

console.log(number);
// ReferenceError: number is not defined
```

This is not true of variables created with `var` - it's possible to access a variable created inside a function with `var` from outside the function:

```js
if(true) {
    var number = 4;
}

console.log(number);
// 4
```

Before `ES6` introduced `const` and `let`, there was no `block scope` in JavaScript.

Variables created inside `if`s, `loop`s and other blocks were `hoisted` up to the top of the program and available to code everywhere.

This meant that all variables not declared inside a function were global variables.

Global variables are best avoided. Apart from being hoisted and loaded into memory before any code is executed (thereby slowing the loading time of your program) there is also the potential for variable name clashes and accidentally reassigning a value to a variable with the same name.

One way to avoid placing variables in the global scope is to use an IFFE, which we covered in Lesson 1 of Module 2.

Because variables declared inside a function are part of their own scope, developers often use the following pattern to avoid `polluting the global scope`, as it's known.

```js
(function() {

    const number1 = 8;
    var number2 = 10;

})();

console.log(number1);
console.log(number2);
```

Neither of the variables declared inside the function will be available outside its scope, avoiding name clashes and reassignment bugs.

`Block scoped` variables make your code less prone to bugs and you should use `const` and `let` rather than `var` for your variable declarations.


## this

> The `this` keyword is often a source of confusion to new JavaScript developers.
>
> We need to cover it in this lesson, but if you do find it difficult to follow, read through the material and then move on to the next section. You can always return to the section when you have a practical need to use `this`.

The `this` keyword refers to the `execution context` of the code.

`Execution context` is a fancy way of saying `where the code is running` and it refers to the object that is executing the current code.

Enter the following in a script file or directly in the console:

```js
console.log(this);
```

<img src="/images/js1/console-log-this.png" alt="console.log(this)" style="max-width:400px">

The `Window` object is returned. This is the global context or object and this is the object that is executing the code, in this case `console.log(this);`.

Inside a regular function belonging to an object, `this` will point to its parent object, as that is the object where the function is being called from:

```js
const myObject = {
    myFunction: function() {
        console.dir(this);
    }
}

myObject.myFunction();
```

<img src="/images/js1/object-function-this.png" alt="object function this" style="max-width:300px">

Using `this` you can access other properties of the object. If the object above had another property called `number`, we could access its value by using `this.number`.

```js
const myObject = {
    number: 10,
    myFunction: function() {
        console.dir(this.number);
    }
}

myObject.myFunction();
// 10
```

This won't work if the function is an arrow function. The `this` keyword won't point to the object it's a property of, but will inherit the value of `this` from the parent code.

This means that whatever the value of `this` is in `myObject`'s scope will be the value of `this` inside the arrow function.

```js

console.dir(this);
// Window

const myObject = {
    myFunction: () => console.dir(this)
}

myObject.myFunction();
// Window
```

In the first statement - the console log - `this` points to the `Window` object. 

Because that is the value of `this` in `myObject`'s scope (where `myObject` lives), this is the value of `this` inside the arrow function property of the object. 

The regular function `binds` its `this` value to its parent object, but the arrow function does not rebind its `this` value, it inherits it from the parent code.

<a id="ternary"></a>

## A quick introduction to the ternary operator

The ternary operator is shorthand for an `if-else` statement.

Let's convert the following code to a ternary operation to see it in action.

```js
const pet = "rhino";
let isDangerous;

if(pet === "rhino") {
    isDangerous = true;
}
else {
    isDangerous = false;
}
```

This would become:

```js
const pet = "rhino";

const isDangerous = pet === "rhino" ? true : false;
```

The part after the `?` is code that will run if the conditional statement is true.

The part after the `:` is code that will run if the conditional statement is not true.

Ternary operations require fewer lines of code than a normal `if-else` statement, but it's highly debatable whether the code is easier to read.

Readable code is always preferable to succinct code. The ternary operator is introduced here because it is popular among JavaScript developers, but often it's better to use an if/else.

If you ever find yourself trying to write a nested ternary operation, don't do it. Be kind to yourself and other people who may read your work and write easy to follow code.

---

## Practice questions

> The answers can be found [here](https://github.com/javascript-repositories/js1-lesson-answers/blob/module-3-lesson-1/js/script.js).

<h5 class="question">Question 1</h5>

Convert the function below to an arrow function:

```js
function multiply(a, b) {
    return a * b;
}
```

<h5 class="question">Question 2</h5>

Convert the function below to an arrow function:

```js
function() {
    console.log("Hello");
}
```

<h5 class="question">Question 3</h5>

Add a method to the object below that returns its colour property:

```js
const frog = {
    colour: "green"
}
```

<h5 class="question">Question 4</h5>

Create an IIFE that logs the current date and time.


<h5 class="question">Question 5</h5>

Convert the if statement below to use a ternary operator:

```js
const animal = "mongoose";

let difficultToSpell = false;

if(animal === "hippopotamus") {
    difficultToSpell = true;
}
```


<!-- ---

## Acivities

#### Read


#### Watch

[LinkedIn Learning: JavaScript Essential Training](https://www.linkedin.com/learning/javascript-essential-training-3/)

Watch the following videos:

Section 4. Functions and Objects:

- Anonymous functions
- Immediately invoked functional expressions -->


---
- [Go to lesson 2](2) 
---