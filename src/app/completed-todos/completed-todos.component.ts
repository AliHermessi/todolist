import { Component } from '@angular/core';
import { TodoServiceService } from '../services/todo-service.service';
import Swal from 'sweetalert2'; 
@Component({
  selector: 'app-completed-todo',
  templateUrl: './completed-todos.component.html',
  styleUrls: ['./completed-todos.component.css']
})
export class CompletedTodoComponent {
 
  completedTodos: any[] = [];

  constructor(private todoService: TodoServiceService) {
    this.completedTodos = this.todoService.getCompletedTodos();
  }

  restoreTodo(index: number) {
    this.todoService.restoreTodoFromCompleted(index);
    this.completedTodos = this.todoService.getCompletedTodos(); 
  }

  deleteTodoPermanently(index: number) {
    Swal.fire({
      title: 'Are you sure?',
      text: 'Do you want to delete this to-do permanently?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, cancel'
    }).then((result) => {
      if (result.isConfirmed) {
        this.todoService.deleteTodoPermanently(index);
        this.completedTodos = this.todoService.getCompletedTodos(); 
        Swal.fire('Deleted!', 'The to-do has been deleted permanently.', 'success');
      }
    });
  }
}
