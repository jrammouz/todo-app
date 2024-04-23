import {TodosService} from "../../services/todos.service";
import {of} from "rxjs";
import {HttpClientModule} from "@angular/common/http";
import {userEvent} from "@testing-library/user-event";
import {render, screen} from "@testing-library/angular";
import {TodoCardComponent} from "./todo-card.component";

describe("Checkbox clicked", () => {
  const emit = jasmine.createSpy();
  const todosService = jasmine.createSpyObj("TodosService", ["markTodoAsCompleted"]);
  todosService.markTodoAsCompleted.and.returnValue(of({
    "id": 1,
    "todo": "test",
    "completed": false,
    "userId": 1
  } as any));


  beforeEach(async () => {

    await render(TodoCardComponent, {
      imports: [HttpClientModule],
      providers: [
        {
          provide: TodosService,
          useValue: todosService
        }
      ],
      componentProperties: {
        todo: {
          "id": 1,
          "title": "test",
          "content": "testContent"
        },
        click: {
          emit: emit
        }
      } as any,
    });
  });

  beforeEach(async () => {
    todosService.markTodoAsCompleted.calls.reset();
  });

  it("should be deleted on checkbox clicked", async () => {
    const user = userEvent.setup();

    const checkbox = screen.getByRole("checkbox");

    if (checkbox) {
      await user.click(checkbox);
      expect(todosService.markTodoAsCompleted).toHaveBeenCalledTimes(1);
      expect(emit).toHaveBeenCalledTimes(0);
    }
  });


})
