import { Injectable, signal } from '@angular/core';
import { LocalStorageService } from './localstorage.service';
import { generateId } from '../../utils/helper';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

export type TodosProps = {
  id: string;
  title: string;
  content: string;
};

export type TodoProp = {
  title: string;
  content: string;
};

export type View = 'list' | 'grid';

export const todos = signal<TodosProps[]>([]);
export type addTodosResponse = {
  id: string;
  todo: string;
  completed: boolean;
  userId: number;
};
export type todosResponse = {
  todos: fetchedTodo[];
  skip: number;
  total: number;
  limit: number;
};

export type fetchedTodo = {
  completed: boolean;
  id: number;
  todo: string;
  userId: number;
};
@Injectable({
  providedIn: 'root',
})
export class TodosService {
  private todoSubject = new BehaviorSubject<TodosProps[] | null>(null);
  todos: Observable<TodosProps[] | null> = this.todoSubject.asObservable();

  private viewSubject = new BehaviorSubject<View>('grid');
  viewType: Observable<View> = this.viewSubject.asObservable();

  constructor(
    private localStorage: LocalStorageService,
    private http: HttpClient
  ) {
    this.loadTodos();
  }

  fetchTodos(): Observable<todosResponse> {
    return this.http.get<todosResponse>('https://dummyjson.com/todos');
  }

  postToDo(todo: string): Observable<addTodosResponse> {
    return this.http.post<addTodosResponse>('https://dummyjson.com/todos/add', {
      todo: todo,
      completed: false,
      userId: 1,
    });
  }

  loadTodos() {
    this.fetchTodos().subscribe((data) => {
      const todos: TodosProps[] = data.todos.map((todo) => {
        return {
          content: todo.todo,
          title: todo.id.toString(),
          id: todo.id.toString(),
        };
      });
      this.todoSubject.next(todos);
    });
  }

  getTodos() {
    return this.todoSubject.value;
  }

  getViewType() {
    return this.viewType;
  }

  setTodos(todos: TodosProps[]) {
    this.todoSubject.next(todos);
    this.localStorage.setItem('todos', JSON.stringify(todos));
  }

  setViewType(type: View) {
    this.viewSubject.next(type);
  }

  addTodo(todo: TodoProp) {
    const todoToAdd = { ...todo, id: generateId() };
    const prevTodos = [...(this.todoSubject.value || [])];
    prevTodos.push(todoToAdd);
    this.setTodos(prevTodos);
  }

  deleteTodo = (id: string) => {
    return this.http.delete(`https://dummyjson.com/todos/${id}`);
  };

  markTodoAsComplete(id: string, checked : boolean): Observable<any> {
    return this.http.put<addTodosResponse>('https://dummyjson.com/todos/' +id, {
      completed : checked
    });
  }

  editTodos = (toDo: TodosProps) => {
    const updatedTodos = [...(this.todoSubject.value || [])].filter(
      (todo) => todo.id !== toDo.id
    );
    updatedTodos.push(toDo);
    this.setTodos(updatedTodos);
  };
}
