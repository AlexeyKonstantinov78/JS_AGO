'use strict';

class Todo {
    constructor(form, input, todoList, todoCompleted) {
        this.form = document.querySelector(form);
        this.input = document.querySelector(input);
        this.todoList = document.querySelector(todoList);
        this.todoCompleted = document.querySelector(todoCompleted);
        this.todoData = new Map(JSON.parse(localStorage.getItem('toDoList')));
    }

    addToStorage() {
        localStorage.setItem('toDoList', JSON.stringify([...this.todoData]));
    }

    render() {
        document.querySelector('.header-input').value = '';
        this.todoList.textContent = ''; 
        this.todoCompleted.textContent = ''; 
        this.todoData.forEach(this.createItem, this);
        this.addToStorage();
    }

    createItem(todo) {
        const li = document.createElement('li');
        li.classList.add('todo-item');
        li.key = todo.key;
        li.insertAdjacentHTML('beforeend', `
            <span class="text-todo">${todo.value}</span>
            <div class="todo-buttons" id='${li.key}'>
                <button class="todo-remove"></button>
                <button class="todo-complete"></button>
            </div>`);
        if (todo.completed) {
            this.todoCompleted.append(li);
        } else {
            this.todoList.append(li);
        }
    }

    addTodo(e) {
        e.preventDefault();
        if (this.input.value.trim()) {
            const newTodo = {
                value: this.input.value,
                completed: false,
                key: this.generateKey(),
            };
            this.todoData.set(newTodo.key, newTodo);
            this.render();
        } else {
            alert('пустое дело добавить нельзя!');
        }
    }

    generateKey() {
        return Math.random().toString(8).substring(2, 7) + Math.random().toString(8).substring(2, 7);
    }

    deleteItem(key) {
        this.todoData.forEach((value, i) => {
            if (key === i) this.todoData.delete(i);
        });
        this.addToStorage();
        this.render();
    }

    completedItem(key) {
        this.todoData.forEach((val, keyMap) => {
            if (key === keyMap) val.completed = true;
        })
        this.addToStorage();
        this.render();
    }

    // оброботчик события
    handler() {
        document.querySelector('.todo-container').addEventListener('click', (event) => {
            let target = event.target;
            if (target.matches('.todo-remove')) this.deleteItem(target.parentNode.id);
            if (target.matches('.todo-complete')) this.completedItem(target.parentNode.id);
        });
    }

    init() {
        this.form.addEventListener('submit', this.addTodo.bind(this));
        this.render();
        this.handler();
    }
}

const todo = new Todo('.todo-control', '.header-input', '.todo-list', '.todo-completed');

todo.init();

