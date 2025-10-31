# To-Do App in Vanilla JS

## See this project live in: https://imserez.github.io/VanillaJSTodoApp/ 


## Screenshots

<img width="1383" height="614" alt="Screenshot from 2025-10-31 15-05-58" src="https://github.com/user-attachments/assets/884dcf4b-cdb0-43cc-99c4-058367f3c341" />

<img width="1383" height="614" alt="Screenshot from 2025-10-31 15-06-23" src="https://github.com/user-attachments/assets/1775ef21-cc0a-4787-8759-a7b2064f7e17" />

<img width="1383" height="614" alt="Screenshot from 2025-10-31 15-07-11" src="https://github.com/user-attachments/assets/84e61908-fdbe-4d1f-87b2-e1d23e9c85bf" />

## Instructions

- RUN `npm install` to install the packages.

- RUN `npm run dev` to start dev server with webpack.

- RUN `npm build` to build with webpack.

The github pages is in the `gh-branch` branch and can be deployed using `npm run deploy`, which will copy the contents of the `dist/` folder in the `gh-branch`. Remember to use `npm run build` to generate the `dist` folder.

## Project Description
This is a simple VanillaJS, HTML & CSS To-Do App that allows you to save your to-do's in your web browser's local storage. Allows you to:
- Create new folders
- Create new tasks
- Edit tasks
- Delete tasks
- Delete folders
- Mark tasks as completed
- Save your progress in your web browser's local storage.

The aim of this project is to play with Vanilla JS, focusing on objects and modules, and also generating all the content dynamically with JS. It allowed me to discover new ways to efficiently use OOP in JS.

## Stack used

- Frontend: HTML, CSS, JavaScript (Vanilla)

- Bundler: Webpack

- Storage: LocalStorage

### Interesting observations

To make this project more interesting, I developed a way to generate the DOM with templates that allows you to generate the DOM with JSON objects, creating components and layouts to render in your page.

With the `toDoConfigLayout` file, you can adjust the dependencies of your project. First save the `id` of the components you'll need to reference later. The `domController` will iterate through that list and save the DOM object with that id.

With the `dependencies` in `toDoConfigLayout` you assign actions to the previously stored DOM items. For example, if you want to add an action to the button btnCreateNewTask, then you assign to that button the task btnCreateNewTaskAction.

You can see the actions directly or save them in the `domController` `_layoutDomDependencies` to use them later, for example when creating a new task or folder. This way you ensure to assign the actions to the elements generated with the first layout, and then you also have the references to the actions for future elements.

To create the `toDoLayoutDependencies`, generate a new instance in your `index.js`. Then assign the `event` and `action`. There are two types of events, specific and none. See the examples below:

- None : `taskDelete`Action: ["none", deleteTask]. It means just save this action inside `taskDelete`, to use it later.

- Specific->click :  `btnCreateNewTask`Action: ["click", () => createNewTask(true)]. It means go to the `btnNewCreateTask` object already created and apply this action callback.

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

`Components` return the object that will be created. They can accept callbacks as parameters and be settled in `events`. In this example, the defaultLayout is first generated, then the action dependencies are assigned. We could also let the defaultLayout accept function parameters. That way all the layout could be instantiated with the same syntax that components use: 

```

export default function taskCard(task, taskToggle, taskDelete, taskEdit) {

  return {

    tag: "div",

    id: task.id,

    classes: "task-card",

    children: [

      {

        tag: "div",

        classes: "left-task-div",

        children: [

          {

...

            tag: "button",

            text: "Edit",

            events: { click: () => taskEdit(task.id) },

          },

          {

            tag: "button",

            text: "X",

            events: { click: () => taskDelete(task.id) },

          },

        ],

      },

    ],

  };

}

```

As we can see, the component is accepting (task, taskToggle, taskDelete and TaskEdit) that are assigned as `events`. `            events: { click: () => taskEdit(task.id) },`


## Use of AI in this project

The main objective of this project was to use vanilla JS. AI was not present during the development of this app. However, AI assisted in upgrading the quality of the CSS Code in a way that helped refactor the CSS rules and perfect the CSS animations. That was outside the main objectives of this development project.

