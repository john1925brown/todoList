import { v1 } from 'uuid';
import { FilterValuesType, TasksStateType } from '../App';
import { TaskType } from '../components/ToDoList';
import { TaskAlt } from '@mui/icons-material';

type ActionsType =
  | RemoveTaskActionType
  | AddTaskActionType
  | ChangeTaskStatusActionType
  | ChangeTaskTitleActionType;

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

//reducer
export const tasksReducer = (
  state: TasksStateType,
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
      const stateCopy = { ...state };
      const currentTask = stateCopy[action.todolistId].find(
        (task) => task.id === action.taskId
      );
      if (currentTask) {
        currentTask.isDone = !currentTask.isDone;
      }
      return stateCopy;
    }

    case 'CHANGE-TASK-TITLE': {
      const stateCopy = { ...state };
      const currentTask = stateCopy[action.todolistId].find(
        (task) => task.id === action.taskId
      );

      if (currentTask) {
        currentTask.title = action.newTitle;
      }
      return stateCopy;
    }
    default:
      throw new Error('No such type found');
  }
};
