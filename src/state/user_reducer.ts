type UserType = {
  age: number;
  name: string;
  childrenCount: number;
};

type ActionType = {
  type: string;
  [key: string]: any;
};

export const userReducer = (state: UserType, action: ActionType): UserType => {
  switch (action.type) {
    case 'INCRIMENT-AGE':
      return { ...state, age: state.age + 1 };
    case 'INCRIMENT-CHILDREN-COUNT':
      return { ...state, childrenCount: state.childrenCount + 1 };
    case 'CHANGE-NAME':
      return { ...state, name: action.newName };

    default:
      throw new Error('No such type found');
  }
};
