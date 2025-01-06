import { v1 } from 'uuid';
import { FilterValuesType, TodoListsType } from '../App';

type ActionType = {
  type: string;
  [key: string]: any;
};

export const todolistsReducer = (
  state: TodoListsType[],
  action: ActionType
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
