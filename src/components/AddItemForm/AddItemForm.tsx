import { ChangeEvent, KeyboardEvent, useState } from 'react';

type AddItemFormPropsType = {
  addItem: (title: string) => void;
};

export const AddItemForm = ({ addItem }: AddItemFormPropsType) => {
  let [isInputEmpty, setIsInputEmpty] = useState(false);
  const [newTaskTitle, setNewTaskTitle] = useState('');

  const onNewTaskPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && newTaskTitle.trim().length) {
      addItem(newTaskTitle);
      setNewTaskTitle('');
    }
  };

  const onNewTaskChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setIsInputEmpty(false);
    setNewTaskTitle(e.currentTarget.value);
  };

  const addNewTask = () => {
    if (!newTaskTitle.trim().length) {
      setIsInputEmpty(true);
      return;
    }
    addItem(newTaskTitle);
    setNewTaskTitle('');
  };

  return (
    <div>
      <input
        type="text"
        value={newTaskTitle}
        onChange={onNewTaskChangeHandler}
        onKeyUp={onNewTaskPressHandler}
        className={isInputEmpty ? 'error' : ''}
      />
      <button onClick={addNewTask}>add</button>
      {isInputEmpty && <p className="error__message">Field is required</p>}
    </div>
  );
};
