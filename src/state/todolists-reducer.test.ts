import { v1 } from 'uuid';
import { todolistsReducer } from './todolists-reducer';
import { TodoListsType } from '../App';

test('correct todolist should be removed', () => {
  const todolist1 = v1();
  const todolist2 = v1();

  const startState: TodoListsType[] = [
    { id: todolist1, title: 'Learn', filter: 'all' },
    { id: todolist2, title: 'Buy', filter: 'all' },
  ];

  const actualState = todolistsReducer(startState, {
    type: 'REMOVE-TODOLIST',
    id: todolist1,
  });

  expect(actualState.length).toBe(1);
  expect(actualState[0].id).toBe(todolist2);
});

test('correct todolist should be added', () => {
  const todolist1 = v1();
  const todolist2 = v1();

  const newTodolistTitle = 'new title';

  const startState: TodoListsType[] = [
    { id: todolist1, title: 'Learn', filter: 'all' },
    { id: todolist2, title: 'Buy', filter: 'all' },
  ];

  const actualState = todolistsReducer(startState, {
    type: 'ADD-TODOLIST',
    title: newTodolistTitle,
  });

  expect(actualState.length).toBe(3);
  expect(actualState[2].title).toBe(newTodolistTitle);
  expect(actualState[2].filter).toBe('all');
});

test('correct todolist should change its name', () => {
  const todolist1 = v1();
  const todolist2 = v1();

  const newTodolistTitle = 'new title';

  const startState: TodoListsType[] = [
    { id: todolist1, title: 'Learn', filter: 'all' },
    { id: todolist2, title: 'Buy', filter: 'all' },
  ];

  const actualState = todolistsReducer(startState, {
    type: 'CHANGE-TODOLIST-TITLE',
    id: todolist2,
    title: newTodolistTitle,
  });

  expect(actualState[0].title).toBe('Learn');
  expect(actualState[1].title).toBe(newTodolistTitle);
});

test('correct todolist filter should changed', () => {
  const todolist1 = v1();
  const todolist2 = v1();

  const newFilter = 'active';

  const startState: TodoListsType[] = [
    { id: todolist1, title: 'Learn', filter: 'all' },
    { id: todolist2, title: 'Buy', filter: 'all' },
  ];

  const action = {
    type: 'CHANGE-TODOLIST-FILTER',
    id: todolist2,
    filter: newFilter,
  };

  const actualState = todolistsReducer(startState, action);

  expect(actualState[0].filter).toBe('all');
  expect(actualState[1].filter).toBe(newFilter);
});
