# TypeScript Tech Demo – Chore Cats

TypeScript is a programming language that extends the capabilities of JavaScript. 

Chore Cats is a gamified to-do list app for chores! Complete chores and collect more cats to cozy up with in your room.

This repository contains the code for Chore Cats, as well as some extra code here and there to demonstrate the benefits of TypeScript vs JavaScript.

## Installation

To install the Chore Cats tech demo:
- Clone the repository into your local environment
- Navigate to the project directory
- Install the dependencies
- Start the development server
```
git clone https://github.com/UOA-CS732-SE750-Students-2024/cs732-assignment-boxy8.git
cd cs732-assignment-boxy8
npm i
npm run dev
```

## Demo
### What is TypeScript?
TypeScript is a programming language that builds on JavaScript, adding something called static typing. JavaScript is a dynamically typed language. This means the data types, like string or number, are checked at runtime i.e. when the application is running. In TypeScript however, type checking occurs at compile time. The data types of variables cannot change during runtime. 

### Benefits
The clearest benefit from type checking at compile time is error detection! TypeScript will notify you of errors when data types don’t match, allowing you to catch bugs in development.


### How does it work?
You may recall that browsers can only run JavaScript, and when you write a React component using JSX, you need a tool such as Babel to transpile this to regular old JavaScript. A similar thing happens with TypeScript. The TypeScript compiler, tsc, transpiles your code into JavaScript so the browser is happy. 


### Typing
In JavaScript, there is no concept of static typing. A variable can hold any type of data, and can be reassigned to other types of data. 

```js
// Line 6 JsApp.jsx
let NUM_CATS;
NUM_CATS = 12;
NUM_CATS = "weee";
NUM_CATS = ["hi", "bye"]
```

Even if we initially declared `NUM_CATS` as a `number`, we wouldn't get an error.

```js
// Line 6 JsApp.jsx
let NUM_CATS = 12;
NUM_CATS = "weee";
NUM_CATS = ["hi", "bye"]
```

But in TypeScript, we would get an error explaining that you cannot assign type `string` to type `number`. 

TypeScript uses type inference to provide type information even when there is no explicit type annotation. We didn't tell TypeScript that `NUM_DOGS` should be a number; it inferred it. We can be more explicit with typing, `NUM_DOGS: number`, which can be helpful for readability and safety.

```ts
// Line 8 App.tsx
let NUM_DOGS: number = 12;
NUM_DOGS = "heyyy"
```

### Interfaces
The Chore Cats app has a list of initial chore data. 

```ts
// JsApp.jsx
const initialChores: Chore[] = [
  { description: "Take out the trash", isComplete: false },
  { description: "Walk the dog", isComplete: true },
  { description: "Do the dishes", isComplete: false },
  { description: "Smile", isComplete: false },
];
```

Each chore has a description and completion status. In JavaScript, there is nothing to enforce that each chore object needs to look like this. If we mispell a property, e.g. "descrption", JavaScript doesn't care, but trying to access the property on that object will now result in undefined. At the very least, this will result in a missing description when that chore is displayed. But, in `ChoreListItem.tsx`, we can see that we are operating on each chore's description.

```ts
// Line 30 ChoreListItem.tsx
...
{chore.description.toLowerCase()}
...
```

When the app is run, there will be an error in the console and nothing will display. TypeScript helps us prevent this, with interfaces. 

Interfaces allow us to define the structure of an object and specify the properties and methods it should have. We can define a `Chore` interface and use it to type our chore data array.

```ts
// App.tsx
// Line 14
interface Chore {
  description: string,
  isComplete: boolean,
}

// Line 35
const initialChores: Chore[] = [
  { description: "Take out the trash", isComplete: false },
  { description: "Walk the dog", isComplete: true },
  { description: "Do the dishes", isComplete: false },
  { description: "Smile", isComplete: false },
];
```

Now, mispelling a property results in an error because the interface requires each property. 

### Functions
Chore cats needs functions to handle adding, removing, and completing chores. TypeScript allows you to type function parameters and return values. 

``` ts
// Line 77 App.tsx
const handleAddChore = (description: string): void => {
    const newChore: Chore = {
      description,
      isComplete: false,
    };
    setChores([...chores, newChore]);
  }
```

Here, the parameters have been typed. The return value of the function has also been specified as `void`, but this is optional as TypeScript can infer this return type. 

We can also type the props to a functional component. 

```tsx
// ChoreList.tsx
interface ChoreListProps {
    chores: Chore[];
    onChoreStatusChanged: (index: number, isComplete: boolean) => void;
    onRemove: (index: number) => void;
}

const ChoreList = ({ chores, onChoreStatusChanged, onRemove }: ChoreListProps) => {    
    return (
            ...
    )
}
```

Here, the prop types have been extracted to an interface to better readability. Typing functions that are passed as props helps ensure we are passing them down correctly. 


### Enums
TypeScript adds a data structure called an enum. Enums allow you to define a set of named constants. If we wanted to add a chore category to our chores, e.g. Household, Kitchen, Outdoor, we could use an enum, to ensure that category should only come from a specified set of values. 

``` tsx
// Line 21 App.tsx
enum ChoreCategory {
  Household = "Household",
  Outdoor = "Outdoor",
  Kitchen = "Kitchen"
}
```

By default, an enum is number based, but here we assign each member as a string (this helps readability). Now we can add the typed property to the `Chore` interface and specify each chore's category. 

``` tsx
// App.tsx
interface Chore {
  description: string,
  isComplete: boolean,
  category?: ChoreCategory
}

...

const initialChores: Chore[] = [
  { description: "Take out the trash", isComplete: false, category: ChoreCategory.Outdoor },
  { description: "Walk the dog", isComplete: true, category: ChoreCategory.Outdoor },
  { description: "Do the dishes", isComplete: false, category: ChoreCategory.Kitchen },
  { description: "Smile", isComplete: false },
];
```

For chores that don't come under a certain category, the property has been omitted. This is allowed as `category` has been made an optional property in the interface, using a `?`. This is equivalent to specifying that it can be `ChoreCategory` or undefined. 

Another benefit of enums is that we can map over the values. This feature is used to create a select dropdown for category in the add chore form. 

``` tsx
// Line 28 AddChoreForm.tsx
...
<select value={category} onChange={(e) => setCategory(e.target.value as ChoreCategory)}>
  {Object.values(ChoreCategory).map((category) => (
    <option key={category} value={category}>
      {category}
    </option>
  ))}
  <option value={""}>None</option>
</select>
...
```

### Union and Literal Types
We saw that making the `category` property optional meant it could take a ChoreCategory enum member or undefined. We can create union types like this as well. This says that the variable can be of this type or this type.

``` tsx
// Line 28 App.tsx
let NumberOrString: number | string;
NumberOrString = 12;
NumberOrString = "twelve";
```

`NumberOrString` can be a number or a string.

There are also literal types. We can create a simplified version of categories by using a string literal type. This says that the variable can be literally this string or literally this string. 

``` tsx
// Line 33 App.tsx
let SimpleChoreCategory: "Household" | "Outdoor" | "Kitchen";
```

### How to create a project with Vite
To get started with your own TypeScript React project, you can use the Vite toolchain. Initialise the project by running the following commands, making sure to select TypeScript in the setup.

```
npm create vite@latest
cd <project-name>
npm i
```
