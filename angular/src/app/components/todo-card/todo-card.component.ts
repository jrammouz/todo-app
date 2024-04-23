import {Component, EventEmitter, Input, Output} from '@angular/core';
import {TodosProps, TodosService} from '../../services/todos.service';
import {NgIf} from '@angular/common';

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
  @Output() removeListItem = new EventEmitter<string>();

  // todosService = inject(TodosService);
  protected readonly event = event;

  constructor(private todoService: TodosService) {
  }

  deleteTodo($event: any, id: string) {
    $event.stopPropagation();
    this.removeListItem.emit(id);
  }

  onClick($event: any) {
    $event.stopPropagation();
    this.click.emit();
  }

  checkboxClicked($event: any) {
    console.log("checkbox clicked", $event)
    if (this.todo == undefined) {
      console.error("todo is undefined")
      return;
    }
    this.todoService.markTodoAsCompleted(this.todo?.id).subscribe({
      next: (value) => {
      },
      error: err => {

      },
      complete: () => {
        this.deleteTodo($event, this.todo?.id!);
      }
    });
    $event.stopPropagation();
  }
}
