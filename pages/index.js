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
const addTodoCloseBtn = addTodoPopup.querySelector(".popup__close");
const todosList = document.querySelector(".todos__list");

const PopupWithForm = new popupWithForm({
  popupSelector: "#add-todo-popup",
  handleFormSubmit: (evt) => {
    const name = evt.target.name.value;
    const dateInput = evt.target.date.value;

    const date = new Date(dateInput);
    date.setMinutes(date.getMinutes() + date.getTimezoneOffset());

    const id = uuidv4();
    const values = { name, date, id, completed: false };
    const todo = generateTodo(values);
    section.addItem(todo);
    todoCounter.updateTotal(true);
    PopupWithForm.close();
    formValidator.resetValidation();
  },
});

PopupWithForm.setEventListeners();

const section = new Section({
  items: initialTodos,
  renderer: (items) => {
    const todo = generateTodo(items);
    section.addItem(todo);
  },
  containerSelector: ".todos__list",
});
section.renderItems();

// const openModal = (modal) => {
//   modal.classList.add("popup_visible");
// };

// const closeModal = (modal) => {
//   modal.classList.remove("popup_visible");
// };

const todoCounter = new TodoCounter(initialTodos, ".counter__text");

function handleCheck(completed) {
  todoCounter.updateCompleted(completed);
}

function handleDelete(completed) {
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
  PopupWithForm.open();
});

// addTodoCloseBtn.addEventListener("click", () => {
//   PopupWithform.close();
// });

// addTodoForm.addEventListener("submit", (evt) => {
//   evt.preventDefault();
//   const name = evt.target.name.value;
//   const dateInput = evt.target.date.value;

//   // Create a date object and adjust for timezone
//   const date = new Date(dateInput);
//   date.setMinutes(date.getMinutes() + date.getTimezoneOffset());

//   const id = uuidv4();
//   const values = { name, date, id, completed: false };
//   const todo = generateTodo(values);
//   todosList.append(todo);
//   close(PopupWithform);
//   formValidator.resetValidation();
// });

// initialTodos.forEach((item) => {
//   const todo = generateTodo(item);
//   todosList.append(todo);
// });
const formValidator = new FormValidator(validationConfig, addTodoForm);
formValidator.enableValidation();
