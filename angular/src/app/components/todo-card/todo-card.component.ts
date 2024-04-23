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
  @Input() isSelected: boolean = false;
  @Output() click = new EventEmitter<void>();
  @Output() removeCardFromList : EventEmitter<string> = new EventEmitter<string>();
  todosService = inject(TodosService);

  deleteTodo(id: string, event:any) {
    event.stopPropagation();
    this.removeCardFromList.emit(id);
  }

  onCheckboxClick(event : any){
    console.log(event);
    if(this.todo){
      this.todosService.markTodoAsComplete(this.todo.id, event.target.checked);
    }
    event.stopPropagation();

  }

  onClick() {
    this.click.emit();
  }
}
