import { TodoCardComponent } from "./todo-card.component";
import { of } from "rxjs";
import { render, screen } from '@testing-library/angular';
import { HttpClientModule } from "@angular/common/http";
import { TodosProps, TodosService } from "../../services/todos.service";
import { userEvent } from "@testing-library/user-event";
import { NgIf } from "@angular/common";

describe("TodoCardComponent", () => {
  const todosService = jasmine.createSpyObj('TodosService', [
    'checkTodo',
    'deleteTodo',
  ]);

  todosService.checkTodo.and.returnValue(
    of({
      "id": 30,
      "todo": "Take cat on a walk",
      "completed": false,
      "userId": 15
    })
  );

  todosService.deleteTodo.and.returnValue(
    of({
      "id": 30,
      "todo": "Take cat on a walk",
      "completed": false,
      "userId": 15,
      "isDeleted": true,
      "deletedOn": "2024-04-19T14:00:27.095Z"
    })
  );

  it("should delete a checked todo card", async () => {
    const user = userEvent.setup()
    const todo : TodosProps = {
      id: '30',
      title: 'Test',
      content: 'Test'
    }
    await render(TodoCardComponent, {
      componentProperties: {
        todo: todo
      },
      imports: [HttpClientModule, NgIf],
      providers: [
        {
          provide: TodosService,
          useValue: todosService,
        },
      ],
    });
    const checkbox = screen.queryByRole("checkbox");

    if (checkbox) {
      await user.click(checkbox); 
    }

    expect(todosService.checkTodo).toHaveBeenCalledTimes(1);
  });
});
