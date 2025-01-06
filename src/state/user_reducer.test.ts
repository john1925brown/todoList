import { userReducer } from './user_reducer';

test('UserReducer should increment only age', () => {
  const testState = { age: 26, name: 'Dima', childrenCount: 0 };

  const actualState = userReducer(testState, { type: 'INCRIMENT-AGE' });

  expect(actualState.age).toBe(27);
  expect(actualState.childrenCount).toBe(0);
});

test('UserReducer should increment only children count ', () => {
  const testState = { age: 26, name: 'Dima', childrenCount: 0 };

  const actualState = userReducer(testState, {
    type: 'INCRIMENT-CHILDREN-COUNT',
  });

  expect(actualState.age).toBe(26);
  expect(actualState.childrenCount).toBe(1);
});

test('UserReducer should change name of user ', () => {
  const testState = { age: 26, name: 'Dima', childrenCount: 0 };

  const newName = 'Tanya';

  const actualState = userReducer(testState, {
    type: 'CHANGE-NAME',
    newName: newName,
  });

  expect(actualState.age).toBe(26);
  expect(actualState.childrenCount).toBe(0);
  expect(actualState.name).toBe('Tanya');
});
