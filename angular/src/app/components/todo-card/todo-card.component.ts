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
  @Output() markAsDoneEmit = new EventEmitter<string>();

  todosService = inject(TodosService);

  deleteTodo(id: string) {
    this.removeListItem.emit(id);
  }

  markAsDone(id: string, $event: any){
    // this.markAsDoneEmit.emit(id)
    $event.stopPropagation();
    this.todosService.markTodoAsDone(id).subscribe();
    this.deleteTodo(id);
  }

  onClick() {
    this.click.emit();
  }
}
