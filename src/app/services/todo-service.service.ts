import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TodoServiceService {
  private todos: any[] = [];
  private completedTodos: any[] = [];

  constructor() {
    this.loadTodos();
  }

  private loadTodos() {
    const savedTodos = localStorage.getItem('todos');
    const savedCompleted = localStorage.getItem('completedTodos');
    if (savedTodos) {
      this.todos = JSON.parse(savedTodos);
    }
    if (savedCompleted) {
      this.completedTodos = JSON.parse(savedCompleted);
    }
  }

  private saveTodos() {
    localStorage.setItem('todos', JSON.stringify(this.todos));
    localStorage.setItem('completedTodos', JSON.stringify(this.completedTodos));
  }

  getTodos() {
    return this.todos;
  }

  getCompletedTodos() {
    return this.completedTodos;
  }

  addTodo(title: string, date: string) {
    this.todos.push({ title, date, completed: false });
    this.saveTodos();
  }

  deleteTodo(index: number) {
    this.todos.splice(index, 1);
    this.saveTodos();
  }

  completeTodo(index: number) {
    const [completed] = this.todos.splice(index, 1);
    completed.completed = true;
    this.completedTodos.push(completed);
    this.saveTodos();
  }

  updateTodo(index: number, title: string, date: string) {
    if (index >= 0 && index < this.todos.length) {
      this.todos[index] = { title, date, completed: false };
      this.saveTodos();
    }
  }

  restoreTodoFromCompleted(index: number) {
    const [restored] = this.completedTodos.splice(index, 1);
    restored.completed = false;
    this.todos.push(restored);
    this.saveTodos();
  }

  deleteTodoPermanently(index: number) {
    this.completedTodos.splice(index, 1);
    this.saveTodos();
  }

}