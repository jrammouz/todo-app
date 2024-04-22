import { TodoCardComponent } from './todo-card.component';
import { render, screen } from '@testing-library/angular';
import { userEvent } from "@testing-library/user-event";
import { NgIf } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { TodosProps, TodosService } from '../../services/todos.service';
import { of } from 'rxjs';

describe('TodoCardComponent', () => {

	const todosService = jasmine.createSpyObj('TodosService', [
		'markTodoAsDone',
		'deleteTodo',
	  ]);
	
	  todosService.markTodoAsDone.and.returnValue(
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
			"todo": "Test title",
			"completed": false,
			"userId": 15,
			"isDeleted": true,
			"deletedOn": "2024-04-22T16:15:04.293Z"
		})
	  );

	it("Should render the initial state of the component", async () => {
		let todo: TodosProps = {
			id: '30',
			title: 'Test title',
			content: 'test'
		}

		await render(TodoCardComponent, {
			imports: [NgIf, HttpClientModule],
			componentProperties: {todo: todo}

		});
		/* No act */
		// Assert
	});
	it("Should mark as checked", async () => {
		const user = userEvent.setup();

		const todo: TodosProps = {
			id: '30',
			title: 'Test',
			content: 'Test'
		}

		await render(TodoCardComponent, {
			imports: [NgIf, HttpClientModule],
			componentProperties: {todo: todo},
			providers:[
				{
					provide: TodosService,
					useValue: todosService
				},

			]
		});
		
		const checkbox = screen.queryByRole("checkbox");
		if( checkbox ){
			await user.click(checkbox);
		}
		expect(todosService.markTodoAsDone).toHaveBeenCalledTimes(1);
	} )
});