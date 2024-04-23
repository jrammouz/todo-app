import { NgFor, CommonModule } from '@angular/common';
import { Component, ElementRef, ViewChild, inject } from '@angular/core';
import { TodosProps, TodosService, View } from '../../services/todos.service';
import { TodoCardComponent } from '../todo-card/todo-card.component';
import { ModelComponent } from '../model/model.component';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-todoslist',
  standalone: true,
  imports: [TodoCardComponent, CommonModule, ModelComponent],
  templateUrl: './todolist.component.html',
})
export class TodoslistComponent {
  private activeRoute = inject(ActivatedRoute);
  private router = inject(Router);
  todos: TodosProps[] = [];
  viewType: View = 'grid';
  showModel = false;
  selectedTodo: TodosProps | null = null;
  searchParams = '';
  filteredTodos: TodosProps[] = [];
  @ViewChild('contentInput', { static: false }) contentInput!: ElementRef;
  @ViewChild('titleInput', { static: false }) titleInput!: ElementRef;

  constructor(private todoservice: TodosService) {
    this.todoservice.todos.subscribe(
      (todos) => (this.todos = (todos || []).reverse())
    );
    this.todoservice.viewType.subscribe((type) => (this.viewType = type));
    this.activeRoute.queryParams.subscribe((params) => {
      this.searchParams = params['search'];
      this.filteredTodos = this.todos.filter(
        (todo) =>
          todo.title
            ?.toLowerCase()
            .includes(this.searchParams?.toLowerCase()) ||
          todo.content?.toLowerCase().includes(this.searchParams?.toLowerCase())
      );
    });
  }

  editTitle() {
    if (this.selectedTodo) {
      const todo = this.selectedTodo;
      todo.title = this.titleInput.nativeElement.value;
      this.todoservice.editTodos(todo);
    }
  }

  editContent() {
    if (this.selectedTodo) {
      const todo = this.selectedTodo;
      todo.content = this.contentInput.nativeElement.innerText;
      this.todoservice.editTodos(todo);
    }
  }

  openModel(todo: TodosProps) {
    this.showModel = true;
    this.selectedTodo = todo;
    this.contentInput.nativeElement.innerText = todo.content;
  }

  removeListItem(todoId?: string) {
    if (!todoId) return;
    this.todoservice.deleteTodo(todoId).subscribe(() => {
      const updatedTodos = [...(this.todos || [])].filter(
        (todo) => todo.id !== todoId
      );
      this.todoservice.setTodos(updatedTodos);
    });
  }

  closeModel() {
    this.showModel = false;
    this.selectedTodo = null;
  }

  resetFilter() {
    this.filteredTodos = [];
    this.router.navigate(['/']);
  }
}
