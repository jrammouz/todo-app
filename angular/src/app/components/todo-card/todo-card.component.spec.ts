import {fireEvent, getByTestId, render, screen} from '@testing-library/angular';
import {TodoCardComponent} from "./todo-card.component";
import {TodosService} from "../../services/todos.service";
import {of} from "rxjs";


describe('TodoCardComponent', () => {
  const todosService = jasmine.createSpyObj('TodosService', [
    'markTodoAsComplete', 'deleteTodo'
  ]);

  todosService.markTodoAsComplete.and.returnValue(
    of({
      "id": 30,
      "todo": "Take cat on a walk",
      "completed": false,
      "userId": 15
    })
  )

  todosService.deleteTodo.and.returnValue(
    of({
      "id": 30,
      "todo": "Take cat on a walk",
      "completed": false,
      "userId": 15,
      "isDeleted": true,
      "deletedOn": "2024-04-21T14:00:27.095Z"
    })
  )


  it('should mark as complete when checkbox is checked', async () => {
    await render(TodoCardComponent, {
      providers:[{provide : TodosService, useValue : todosService}],
      componentInputs: {
        todo : {
          id: '5',
          title : 'make your bed',
          content :'please make your bed'
        },
        isSelected : false
      },
    })

    const checkbox = screen.getByTestId('my-checkbox') as HTMLInputElement;
    fireEvent.click(checkbox); // Check the checkbox
    expect(todosService.markTodoAsComplete).toHaveBeenCalled();
  })

  it('should emit on delete trash button click', async () => {

    await render(TodoCardComponent, {
      providers:[{provide : TodosService, useValue : todosService}],
      componentInputs: {
        todo : {
          id: '5',
          title : 'make your bed',
          content :'please make your bed'
        },
        isSelected : false
      },
      componentOutputs:{
        // removeCardFromList:{
        //   emit:
        // } as any
      }
    })

    const button = screen.getByTestId('deleteBtn') as HTMLInputElement;
    fireEvent.click(button); // Check the checkbox
    // expect().toHaveBeenCalled();
  });

})
