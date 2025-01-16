import { v1 } from 'uuid';
import { TasksStateType } from '../AppWithRedux';
import {
  AddTotodlistActionType,
  RemoveTodoListActionType,
  todoList1,
  todoList2,
} from './todolists-reducer';

type ActionsType =
  | RemoveTaskActionType
  | AddTaskActionType
  | ChangeTaskStatusActionType
  | ChangeTaskTitleActionType
  | RemoveTodoListActionType
  | AddTotodlistActionType;

// action types

export type RemoveTaskActionType = {
  type: 'REMOVE-TASK';
  todolistId: string;
  taskId: string;
};
export type AddTaskActionType = {
  type: 'ADD-TASK';
  todolistId: string;
  newTaskTitle: string;
};
export type ChangeTaskStatusActionType = {
  type: 'CHANGE-TASK-STATUS';
  todolistId: string;
  taskId: string;
};
export type ChangeTaskTitleActionType = {
  type: 'CHANGE-TASK-TITLE';
  todolistId: string;
  taskId: string;
  newTitle: string;
};

// action creators

export const removeTaskAC = (
  todolistId: string,
  taskId: string
): RemoveTaskActionType => {
  return { type: 'REMOVE-TASK', todolistId: todolistId, taskId: taskId };
};

export const addTaskAC = (
  todolistId: string,
  newTaskTitle: string
): AddTaskActionType => {
  return {
    type: 'ADD-TASK',
    todolistId: todolistId,
    newTaskTitle: newTaskTitle,
  };
};

export const changeTaskStatusAC = (
  todolistId: string,
  taskId: string
): ChangeTaskStatusActionType => {
  return { type: 'CHANGE-TASK-STATUS', todolistId: todolistId, taskId: taskId };
};

export const changeTaskTitleAC = (
  todolistId: string,
  taskId: string,
  newTitle: string
): ChangeTaskTitleActionType => {
  return {
    type: 'CHANGE-TASK-TITLE',
    todolistId: todolistId,
    taskId: taskId,
    newTitle: newTitle,
  };
};

const initialState: TasksStateType = {
  [todoList1]: [
    { id: v1(), title: 'html', isDone: true },
    { id: v1(), title: 'js', isDone: true },
    { id: v1(), title: 'react', isDone: false },
    { id: v1(), title: 'redux', isDone: false },
    { id: v1(), title: 'GraphQL', isDone: false },
  ],
  [todoList2]: [
    { id: v1(), title: 'meat', isDone: true },
    { id: v1(), title: 'beer', isDone: true },
    { id: v1(), title: 'milk', isDone: false },
  ],
};

//reducer
export const tasksReducer = (
  state: TasksStateType = initialState,
  action: ActionsType
): TasksStateType => {
  switch (action.type) {
    case 'REMOVE-TASK': {
      const stateCopy = { ...state };

      const filteredTasks = stateCopy[action.todolistId].filter(
        (task) => task.id !== action.taskId
      );
      stateCopy[action.todolistId] = filteredTasks;
      return stateCopy;
    }

    case 'ADD-TASK': {
      const stateCopy = { ...state };
      stateCopy[action.todolistId] = [
        { title: action.newTaskTitle, id: v1(), isDone: false },
        ...state[action.todolistId],
      ];
      return { ...stateCopy };
    }

    case 'CHANGE-TASK-STATUS': {
      const stateCopy = {
        ...state,
        [action.todolistId]: state[action.todolistId].map((task) =>
          task.id === action.taskId ? { ...task, isDone: !task.isDone } : task
        ),
      };

      return stateCopy;
    }

    case 'CHANGE-TASK-TITLE': {
      const stateCopy = { ...state };

      stateCopy[action.todolistId] = stateCopy[action.todolistId].map((task) =>
        task.id === action.taskId ? { ...task, title: action.newTitle } : task
      );
      return stateCopy;
    }

    case 'ADD-TODOLIST': {
      const stateCopy = { ...state };

      stateCopy[action.todolistId] = [];
      return stateCopy;
    }

    case 'REMOVE-TODOLIST': {
      const stateCopy = { ...state };
      delete stateCopy[action.id];
      return stateCopy;
    }
    default:
      return state;
  }
};
