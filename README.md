# To-Do App in Vanilla JS
## **See this project live in: https://imserez.github.io/VanillaJSTodoApp/ **
## Project Description
The aim of this project is play with Vanilla JS, focusing on objects and modules, also generating all the content dynamically with JS.
### Interesting observations
To make this project more interesting I developed a way to generate the DOM with templates that allows you to generate the DOM with JSON objects, creating components and layouts to render in your page.
With the `toDoConfigLayout` file you can adjust the dependencies of your project. First save the `id` of the components you'll need to reference later. The `domController` will iterate through that list and save the DOM object with that id.

With the `dependencies` in `toDoConfigLayout` you assign actions to the previous stored DOM items. For example, if you want to add an action to the button **btnCreateNewTask**, then you assign to that button the task **btnCreateNewTaskAction**.

You can se the actions directly or save them in the `domController` `_layoutDomDependencies` to use them later, for example when creating a new task or folder. This way you ensure to assign the actions to the elements generated with the first layout and then you also have the references to the actions for future elements.

To create the `toDoLayoutDependencies`, generate a new instance in your `index.js`. Then assign the `event` and `action`. There're two types of events, **specific** and **none**. See the examples below:
- **None** : `taskDelete`Action: ["none", deleteTask]. Means just save this action inside `taskDelete`, to use it later.
- **Specific->click** :  `btnCreateNewTask`Action: ["click", () => createNewTask(true)]. Means go to the `btnNewCreateTask` object already created and apply this action callback.

You can also use Models and Factories to create instances of your classes. For example:
```
export function createInboxFolder() {
  return new Folder({
    title: "Inbox",
    description: "This is the inbox folder.",
    position: 1,
    id: "inbox-folder",
    defaultTask: createDemoTask(),
  });
}
```
createDemoTask is indeed another factory: 
```
export function createDemoTask() {
  return new Task("Visit imserez github!", "", 0, "", false);
}
```

## Screenshots
## Stack used
- **Frontend:** HTML, CSS, JavaScript (Vanilla)
- **Bundler:** Webpack
- **Storage:** LocalStorage
## Use of AI in this project
## Instructions
- RUN `npm install` to install the packages.
- RUN `npm run dev` to start dev server with webpack.
- RUN `npm build` to build with webpack.



