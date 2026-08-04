import { v4 as uuidv4 } from "https://jspm.dev/uuid";
import { initialTodos, validationConfig } from "../utils/constants.js";
import Todo from "../components/Todo.js";
import FormValidator from "../components/FormValidator.js";
import Section from "../components/Section.js";
import popupWithForm from "../components/PopupWithForm.js";
import TodoCounter from "../components/TodoCounter.js";

const addTodoButton = document.querySelector(".button_action_add");
const addTodoPopup = document.querySelector("#add-todo-popup");
const addTodoForm = addTodoPopup.querySelector(".popup__form");

const addTodoPopupInstance = new popupWithForm({
  popupSelector: "#add-todo-popup",
  handleFormSubmit: (formValues) => {
    const name = formValues.name;
    const dateInput = formValues.date;

    const date = new Date(dateInput);
    date.setMinutes(date.getMinutes() + date.getTimezoneOffset());

    const id = uuidv4();
    const values = { name, date, id, completed: false };
    const todo = generateTodo(values);
    section.addItem(todo);
    todoCounter.updateTotal(true);
    addTodoPopupInstance.close();
    formValidator.resetValidation();
  },
});

addTodoPopupInstance.setEventListeners();

const section = new Section({
  items: initialTodos,
  renderer: (items) => {
    const todo = generateTodo(items);
    section.addItem(todo);
  },
  containerSelector: ".todos__list",
});
section.renderItems();

const todoCounter = new TodoCounter(initialTodos, ".counter__text");

function handleCheck(completed) {
  todoCounter.updateCompleted(completed);
}

function handleDelete(completed) {
  todoCounter.updateTotal(false);
  if (completed) {
    todoCounter.updateCompleted(false);
  }
}

function generateTodo(data) {
  const todo = new Todo(data, "#todo-template", handleCheck, handleDelete);
  const todoElement = todo.getView();

  return todoElement;
}

addTodoButton.addEventListener("click", () => {
  addTodoPopupInstance.open();
});

const formValidator = new FormValidator(validationConfig, addTodoForm);
formValidator.enableValidation();
