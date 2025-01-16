import { TasksStateType } from '../AppWithRedux';
import { TaskType } from '../components/ToDoList';
import {
  addTaskAC,
  changeTaskStatusAC,
  changeTaskTitleAC,
  removeTaskAC,
  tasksReducer,
} from './tasks-reducer';
let startState: TasksStateType = {};
beforeEach(() => {
  startState = {
    todolistId1: [
      { id: '1', title: 'CSS', isDone: false },
      { id: '2', title: 'JS', isDone: true },
      { id: '3', title: 'React', isDone: false },
    ],
    todolistId2: [
      { id: '1', title: 'bread', isDone: false },
      { id: '2', title: 'milk', isDone: true },
      { id: '3', title: 'tea', isDone: false },
    ],
  };
});

test('task should be deleted from current todolist', () => {
  const action = removeTaskAC('todolistId1', '2');

  const actualState = tasksReducer(startState, action);

  expect(actualState['todolistId1'].length).toBe(2);
  expect(actualState['todolistId2'].length).toBe(3);
  expect(
    actualState['todolistId1'].every((todolist) => todolist.id !== '2')
  ).toBeTruthy();
});

test('new task should be added to current todolist', () => {
  const action = addTaskAC('todolistId1', 'newTaskTitle');

  const actualState = tasksReducer(startState, action);

  expect(actualState['todolistId1'].length).toBe(4);
  expect(actualState['todolistId2'].length).toBe(3);
  expect(actualState['todolistId1'][0].title).toBe('newTaskTitle');
  expect(actualState['todolistId1'][0].id).toBeDefined();
});

test('task status should be changed', () => {
  const action = changeTaskStatusAC('todolistId1', '2');

  const actualState = tasksReducer(startState, action);

  expect(actualState['todolistId1'][0].isDone).toBe(false);
  expect(actualState['todolistId1'][1].isDone).toBe(false);
});

test('task title should be changed', () => {
  const action = changeTaskTitleAC('todolistId1', '2', 'newTitle');

  const actualState = tasksReducer(startState, action);

  expect(actualState['todolistId1'][0].title).toBe('CSS');
  expect(actualState['todolistId1'][1].title).toBe('newTitle');
});
