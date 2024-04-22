import { Component, Input, Output, inject, EventEmitter } from '@angular/core';
import { TodosProps, TodosService } from '../../services/todos.service';
import { NgIf } from '@angular/common';

@Component({
  selector: 'todo-card',
  standalone: true,
  imports: [NgIf],
  templateUrl: './todo-card.component.html',
})
export class TodoCardComponent {
  @Input() todo: TodosProps | undefined;
  @Input() isSelcted: boolean = false;
  @Output() click = new EventEmitter<void>();
  @Output() removeListItem = new EventEmitter<string>();
  isSelected=false;
  todosService = inject(TodosService);

  constructor(private todoService : TodosService) {
  }

  deleteTodo(id: string, event: any) {
    event.stopPropagation();
    this.removeListItem.emit(id);
  }

  onClick() {
    this.click.emit();
  }

  onCheck(todo: TodosProps, event: any) {
    this.isSelected = true;
    event.stopPropagation();
    this.todoService.checkTodo(todo).subscribe();
    this.deleteTodo(todo.id, event);
  }
}
