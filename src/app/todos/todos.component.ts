import { Component } from '@angular/core';
import { TodoServiceService } from '../services/todo-service.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-todo',
  templateUrl: './todos.component.html',
  styleUrls: ['./todos.component.css']
})
export class TodosComponent {
  newTodoTitle: string = '';
  newTodoDate: string = '';
  todos: any[] = [];

  constructor(private todoService: TodoServiceService) {
    this.todos = this.todoService.getTodos();
  }

  addTodo() {
    if (!this.newTodoTitle.trim() || !this.newTodoDate) {
      Swal.fire({
        title: 'Error!',
        text: 'Both title and date fields are required.',
        icon: 'error',
        confirmButtonText: 'OK'
      });
      return;
    }

    this.todoService.addTodo(this.newTodoTitle, this.newTodoDate);
    this.newTodoTitle = '';
    this.newTodoDate = '';
  }

  deleteTodo(index: number) {
    Swal.fire({
      title: 'Are you sure?',
      text: 'Do you want to delete this task?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, keep it'
    }).then((result) => {
      if (result.isConfirmed) {
        this.todoService.deleteTodo(index);
        Swal.fire('Deleted!', 'Your task has been deleted.', 'success');
      }
    });
  }

  completeTodo(index: number) {
    this.todoService.completeTodo(index);
  }

  resetForm() {
    this.newTodoTitle = '';
    this.newTodoDate = '';
  }

  isDatePast(date: string): boolean {
    const todoDate = new Date(date);
    const now = new Date();
    return todoDate < now;
  }
  

}
