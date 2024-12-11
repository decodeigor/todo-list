const addButton = document.getElementById("add-btn");
const todoInput = document.getElementById("todo-input");
const todoList = document.getElementById("todo-list");
const clearButton = document.getElementById("clear-btn");

// Завантаження списку справ при завантаженні сторінки
document.addEventListener("DOMContentLoaded", loadTodos);

// Додавання нового завдання
addButton.addEventListener("click", () => {
    const todoText = todoInput.value.trim();
    if (todoText) {
        addTodoToList(todoText);
        todoInput.value = ''; // Очистити поле вводу
        saveTodos(); // Зберегти список
    }
});

// Додавання нового завдання до списку
function addTodoToList(text) {
    const li = document.createElement("li");
    li.innerHTML = `
        <span>${text}</span>
        <button class="done-btn">✓</button>
        <button class="delete-btn">×</button>
    `;
    todoList.appendChild(li);

    // Відмітка завдання як виконаного
    li.querySelector(".done-btn").addEventListener("click", () => {
        li.classList.toggle("done");
        saveTodos(); // Зберегти після зміни
    });

    // Видалення завдання
    li.querySelector(".delete-btn").addEventListener("click", () => {
        li.remove();
        saveTodos(); // Зберегти після видалення
    });
}

// Очистити весь список
clearButton.addEventListener("click", () => {
    todoList.innerHTML = '';
    saveTodos(); // Зберегти (порожній список)
});

// Зберігання списку справ у localStorage
function saveTodos() {
    const todos = [];
    const listItems = document.querySelectorAll("li");
    listItems.forEach(item => {
        todos.push({
            text: item.querySelector("span").textContent,
            done: item.classList.contains("done")
        });
    });
    localStorage.setItem("todos", JSON.stringify(todos));
}

// Завантажити список справ з localStorage
function loadTodos() {
    const savedTodos = JSON.parse(localStorage.getItem("todos")) || [];
    savedTodos.forEach(todo => {
        addTodoToList(todo.text);
        if (todo.done) {
            const lastItem = todoList.lastChild;
            lastItem.classList.add("done");
        }
    });
}
