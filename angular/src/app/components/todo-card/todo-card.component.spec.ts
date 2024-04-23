import {fireEvent, getByTestId, render, screen} from '@testing-library/angular';
import {TodoCardComponent} from "./todo-card.component";
import {TodosService} from "../../services/todos.service";
import {of} from "rxjs";
import createSpy = jasmine.createSpy;


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
  );

  todosService.deleteTodo.and.returnValue(
    of({
      "id": 30,
      "todo": "Take cat on a walk",
      "completed": false,
      "userId": 15,
      "isDeleted": true,
      "deletedOn": "2024-04-21T14:00:27.095Z"
    })
  );


  it('should call markAsComplete when checkbox is checked', async () => {
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

  it('should fill checkBox', async () => {
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
    expect(checkbox.checked).toBeTrue();
  })

  it('should show action buttons when delete icon click, then delete when delete btn clicked', async () => {
    const emit = createSpy();
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
        removeCardFromList:{
          emit : emit
        } as any
        }
    })
    const trash = screen.getByTestId('delete-icon') as HTMLInputElement;

    fireEvent.click(trash); // click on the trash icon
    expect(screen.queryByTestId('delete-icon')).toBeNull();
    const deleteBtn = screen.getByTestId('delete-btn') as HTMLInputElement;
    fireEvent.click(deleteBtn);
    expect(emit).toHaveBeenCalledWith('5');
  })

  it('should show action buttons when delete icon click, then reshow trash icon when cancel btn clicked', async () => {
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
    const trash = screen.getByTestId('delete-icon') as HTMLInputElement;

    fireEvent.click(trash); // click on the trash icon
    expect(screen.queryByTestId('delete-icon')).toBeNull();
    const cancelBtn = screen.getByTestId('close-btn') as HTMLInputElement;
    fireEvent.click(cancelBtn);
    expect(screen.queryByTestId('delete-icon')).toBeTruthy();
    expect(screen.queryByTestId('close-btn')).toBeNull();
    expect(screen.queryByTestId('delete-btn')).toBeNull();

  })

})
