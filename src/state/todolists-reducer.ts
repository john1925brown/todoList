import { v1 } from 'uuid';
import { FilterValuesType, TodoListsType } from '../App';

type ActionsType =
  | RemoveTodoListActionType
  | AddTotodlistActionType
  | ChangeTotodlistFilterActionType
  | ChangeTotodlistTitleActionType;

export type RemoveTodoListActionType = {
  type: 'REMOVE-TODOLIST';
  id: string;
};
export type AddTotodlistActionType = {
  type: 'ADD-TODOLIST';
  title: string;
};
export type ChangeTotodlistTitleActionType = {
  type: 'CHANGE-TODOLIST-TITLE';
  title: string;
  id: string;
};
export type ChangeTotodlistFilterActionType = {
  type: 'CHANGE-TODOLIST-FILTER';
  id: string;
  filter: FilterValuesType;
};

export const removeTodolistAC = (
  todolistId: string
): RemoveTodoListActionType => {
  return { type: 'REMOVE-TODOLIST', id: todolistId };
};

export const addTodolistAC = (title: string): AddTotodlistActionType => {
  return {
    type: 'ADD-TODOLIST',
    title: title,
  };
};

export const changeTotodlistTitleAC = (
  id: string,
  title: string
): ChangeTotodlistTitleActionType => {
  return {
    type: 'CHANGE-TODOLIST-TITLE',
    id: id,
    title: title,
  };
};

export const changeTotodlistFilterAC = (
  id: string,
  filter: FilterValuesType
): ChangeTotodlistFilterActionType => {
  return {
    type: 'CHANGE-TODOLIST-FILTER',
    id: id,
    filter: filter,
  };
};

export const todolistsReducer = (
  state: TodoListsType[],
  action: ActionsType
): TodoListsType[] => {
  switch (action.type) {
    case 'REMOVE-TODOLIST':
      return state.filter((todolist) => todolist.id !== action.id);
    case 'ADD-TODOLIST':
      return [...state, { id: v1(), filter: 'all', title: action.title }];
    case 'CHANGE-TODOLIST-TITLE':
      return state.map((item) =>
        item.id === action.id ? { ...item, title: action.title } : item
      );
    case 'CHANGE-TODOLIST-FILTER':
      return state.map((item) =>
        item.id === action.id ? { ...item, filter: action.filter } : item
      );
    default:
      throw new Error('No such type found');
  }
};
