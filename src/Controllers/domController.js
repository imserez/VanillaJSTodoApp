import editTaskCard from "../Components/editTaskCard";
import emptyTasks from "../Components/emptyTasks";
import folderCard from "../Components/folderCard";
import taskCard from "../Components/taskCard";

// Elements to instantiate or take refs (divs, btns...)
let _layoutDomElements = {};
// Elements to check dependencies, "domElement, { click: "..." }
let _layoutDependencies = {};

function storeDOMLayoutElements(options) {
  let domresult = {};
  for (const [key, value] of Object.entries(options)) {
    domresult[key] = document.getElementById(value) || null;
  }
  _layoutDomElements = domresult;
  return domresult;
}

// Fix si entonces van hidden / show como lo pongo, en domElements?
// Se deben crear desde el layout su component pero ya en hidden
// Luego le asignamos su dependencia.
// Me gustaba la idea de generarlo desde aqui pero entonces todo lo recreable debe ser un component que se destruye y se vuelve a crear
export default function createDomController() {
  const mainDiv = document.getElementById("content");

  // En base a un layout file generamos su skeleton con lo que haya.
  function changeLayout(layoutData) {
    let layoutOptions = layoutData.options;
    layoutData.layout.forEach((element) => {
      const { tag, ...options } = element;
      let elCreate = createLayoutElement(tag, options);
      append(mainDiv, elCreate);
    });
    _layoutDomElements = storeDOMLayoutElements(layoutOptions);
  }

  // Asignamos las dependencias necesarias y guardamos las creadas para referirnos a ella si es necesario
  function assignLayoutDependencies(layoutDependencies) {
    let depsResult = {};

    for (const [key, value] of Object.entries(layoutDependencies)) {
      const [eventType, handler] = value;
      let newDep = { [key]: handler };
      Object.assign(depsResult, newDep);

      if (eventType != "none") {
        let element = _layoutDomElements[key];
        if (element) {
          element.addEventListener(eventType, (e) => {
            handler(e);
          });
        }
      }
    }
    _layoutDependencies = depsResult;
  }

  // Renderizamos las folders allí donde deben ir.
  // Usamos la dependencia cargada anteriormente de folderClick
  function renderFolders(folders) {
    let target = _layoutDomElements.renderFoldersContainer;
    target.innerHTML = "";
    folders.forEach((fol) => {
      let obj = folderCard(fol, _layoutDependencies.folderClick, _layoutDependencies.folderDelete);
      let el = createComponent(obj.tag, obj);
      target.appendChild(el);
    });
  }

  function toggleTask(taskId){
    const toggledTask = document.getElementById(taskId);
    const checkbox = toggledTask.querySelector('input[type="checkbox"]');
    const mid = toggledTask.querySelector('.mid-task-div');
    if (checkbox.checked) {
      mid.classList.add('completed');
    } else {
      mid.classList.remove('completed');
    }
  }

  // Renderiamos las tasks donde deben ir
  function renderTasks(tasks) {
    let target = _layoutDomElements.renderTasksContainer;
    if (target != null) target.innerHTML = "";
    if (tasks[0] != null) {
      tasks.forEach((tsk) => {
        let obj = taskCard(
          tsk,
          _layoutDependencies.taskToggle,
          _layoutDependencies.taskDelete,
          _layoutDependencies.taskEdit
        );
        let el = createComponent(obj.tag, obj);
        // Asignar la func de click en checkbox (toggle)
        target.appendChild(el);
      });
    } else {
      let obj = emptyTasks();
      let el = createComponent(obj.tag, obj);
      target.appendChild(el);
    }
  }

  // Establecer la currentFolder (remover y asignar class)
  function setCurrentFolder(folder) {
    let currentFolder = document.getElementsByClassName("selected-folder");
    if (currentFolder.length > 0) {
      currentFolder[0].classList.remove("selected-folder");
    }
    let folEl = document.getElementById(folder.id);
    folEl.classList.add("selected-folder");
  }

  function createElement(tag, options = {}) {
    const el = document.createElement(tag);
    if (!el) return;

    const {
      id = null,
      classes,
      text,
      attrs = {},
      children = [],
      events = {},
      parent,
    } = options;

    if (id) el.id = id;
    if (classes) {
      if (Array.isArray(classes)) el.classList.add(...classes);
      else if (typeof classes === "string")
        el.classList.add(...classes.split(/\s+/));
    }

    if (text != null) el.textContent = text;

    for (const [k, v] of Object.entries(attrs)) {
      el.setAttribute(k, String(v));
    }
    if (children && children.length) {
      const frag = document.createDocumentFragment();
      for (const child of children) {
        if (child instanceof Node) frag.appendChild(child);
        else frag.appendChild(document.createTextNode(String(child)));
      }
      el.appendChild(frag);
    }

    for (const [evt, handler] of Object.entries(events)) {
      el.addEventListener(evt, handler);
    }

    /* EXAMPLE OF USE!
        const card = createEl('div', {
        classes: 'card highlight',
        attrs: { 'data-id': 1 },
        children: [
            createEl('h2', { text: 'Título' }),
            createEl('p', { text: 'Descripción...' }),
            createEl('button', {
            text: 'Ver',
            events: { click: () => console.log('clic') }
            })
        ]
        });
        document.getElementById('content').appendChild(card);

        */
    if (parent) parent.appendChild(el);

    return el;
  }

  function createLayoutElement(
    tag,
    options = {}
  ) {
    const el = document.createElement(tag);
    if (!el) return;

    const {
      id,
      classes,
      text,
      attrs = {},
      children = [],
      events = {},
      parent,
      type,
      method,
      htmlFor,
      name,
      onSubmit,
      disabled,
    } = options;

    if (id) el.id = id;
    if (classes) {
      if (Array.isArray(classes)) el.classList.add(...classes);
      else if (typeof classes === "string")
        el.classList.add(...classes.split(/\s+/));
    }
    if (disabled) el.disabled = disabled;

    if (htmlFor) el.htmlFor = htmlFor;
    if (onSubmit) el.onsubmit = onSubmit;

    if (name) el.name = name;

    if (method) el.method = method;

    if (type) el.type = type;

    if (text != null) el.textContent = text;

    for (const [k, v] of Object.entries(attrs)) {
      el.setAttribute(k, String(v));
    }
    if (children && children.length) {
      const frag = document.createDocumentFragment();
      for (const child of children) {
        if (child instanceof Node) {
          frag.appendChild(child);
        } else if (
          typeof child === "object" &&
          child !== null &&
          "tag" in child
        ) {
          // Si es un objeto que tiene "tag", asumimos que es un descriptor de elemento
          const childEl = createLayoutElement(child.tag, child);
          frag.appendChild(childEl);
        } else {
          frag.appendChild(document.createTextNode(String(child)));
        }
      }
      el.appendChild(frag);
    }

    for (const [evt, handler] of Object.entries(events)) {
      el.addEventListener(evt, handler);
    }

    /* EXAMPLE OF USE!
        const card = createEl('div', {
        classes: 'card highlight',
        attrs: { 'data-id': 1 },
        children: [
            createEl('h2', { text: 'Título' }),
            createEl('p', { text: 'Descripción...' }),
            createEl('button', {
            text: 'Ver',
            events: { click: () => console.log('clic') }
            })
        ]
        });
        document.getElementById('content').appendChild(card);

        */
    if (parent) parent.appendChild(el);

    return el;
  }

  function append(parent, child) {
    parent.appendChild(child);
  }

  function displayCreateNewFolderForm(display) {
    // let createNewTaskFormEl = _components.createNewTaskForm;

    if (display === true) {
      _layoutDomElements.formCreateNewFolder.reset();
      _layoutDomElements.formCreateNewFolder.classList.remove("hidden");
      _layoutDomElements.btnCreateNewFolder.classList.add("hidden");
    } else {
      _layoutDomElements.formCreateNewFolder.classList.add("hidden");
      _layoutDomElements.btnCreateNewFolder.classList.remove("hidden");
    }

    //  createNewTaskFormEl.classList.add('hidden');
  }


  function displayCreateNewTaskForm(display) {
    // let createNewTaskFormEl = _components.createNewTaskForm;

    if (display === true) {
      _layoutDomElements.formCreateNewTask.reset();
      _layoutDomElements.formCreateNewTask.classList.remove("hidden");
      _layoutDomElements.btnCreateNewTask.classList.add("hidden");
    } else {
      _layoutDomElements.formCreateNewTask.classList.add("hidden");
      _layoutDomElements.btnCreateNewTask.classList.remove("hidden");
    }

    //  createNewTaskFormEl.classList.add('hidden');
  }

  function closeEditingMode(parentTaskId) {
    const taskEditorCardEl = document.getElementById("edit" + parentTaskId);
    taskEditorCardEl.remove();

    let taskEditted = document.getElementById(parentTaskId);
    taskEditted.classList.remove("hidden");
  }

  function displayEditTaskMode(task) {
    const taskToEdit = document.getElementById(task.id);
    const taskEditorObj = editTaskCard(
      task,
      _layoutDependencies.taskDiscardChanges,
      _layoutDependencies.taskSaveChanges
    );
    const taskEditorEl = createComponent(taskEditorObj.tag, taskEditorObj);
    taskToEdit.classList.add("hidden");
    let target = _layoutDomElements.renderTasksContainer;
    target.insertBefore(taskEditorEl, taskToEdit);
  }

  function createComponent(tag, options = {}) {
    const el = document.createElement(tag);
    if (!el) return;

    const {
      id = null,
      classes,
      text,
      attrs = {},
      children = [],
      events = {},
      parent,
      type,
      method,
      htmlFor,
      name,
      onSubmit,
      checked,
      defaultValue,
    } = options;

    // ID
    if (id) el.id = id;

    if (checked) el.checked = checked;
    if (htmlFor) el.htmlFor = htmlFor;
    if (onSubmit) el.onsubmit = onSubmit;
    if (defaultValue) el.defaultValue = defaultValue;

    if (name) el.name = name;

    if (method) el.method = method;

    if (type) el.type = type;
    // Clases
    if (classes) {
      if (Array.isArray(classes)) el.classList.add(...classes);
      else if (typeof classes === "string")
        el.classList.add(...classes.split(/\s+/));
    }

    // Texto
    if (text != null) el.textContent = text;

    // Atributos
    for (const [k, v] of Object.entries(attrs)) {
      el.setAttribute(k, String(v));
    }

    // Hijos: ahora soporta objetos de configuración
    if (children && children.length) {
      const frag = document.createDocumentFragment();
      for (const child of children) {
        if (child instanceof Node) {
          frag.appendChild(child);
        } else if (typeof child === "object" && child.tag) {
          frag.appendChild(createComponent(child.tag, child));
        } else {
          frag.appendChild(document.createTextNode(String(child)));
        }
      }
      el.appendChild(frag);
    }

    // Eventos
    for (const [evt, handler] of Object.entries(events)) {
      el.addEventListener(evt, handler);
    }

    // Append al parent si se pasa
    if (parent) parent.appendChild(el);

    return el;
  }

  function removeElement(id) {
    const el = document.getElementById(id);
    if (el) el.remove();
  }

  return {
    createElement,
    renderFolders,
    setCurrentFolder,
    renderTasks,
    changeLayout,
    assignLayoutDependencies,
    displayCreateNewTaskForm,
    removeElement,
    displayEditTaskMode,
    closeEditingMode,
    displayCreateNewFolderForm,
    toggleTask
  };
}
