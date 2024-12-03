import { ChangeEvent, useState } from 'react';
import { FilterValuesType } from '../App';

type TaskType = {
  id: string;
  title: string;
  isDone: boolean;
};

type PropsType = {
  title: string;
  tasks: Array<TaskType>;
  removeTask: (id: string) => void;
  changeFilter: (value: FilterValuesType) => void;
  addTask: (value: string) => void;
  deleteAllTasks: () => void;
  showThreeTask: any;
};

export const ToDoList = (props: PropsType) => {
  const [newTaskTitle, setNewTaskTitle] = useState('');

  const onNewTaskChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setNewTaskTitle(e.currentTarget.value);
  };

  const onNewTaskPressHandler = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && newTaskTitle) {
      props.addTask(newTaskTitle);
      setNewTaskTitle('');
    }
  };

  const addNewTask = () => {
    props.addTask(newTaskTitle);
    setNewTaskTitle('');
  };

  const onAllClickHandler = () => {
    return props.changeFilter('all');
  };

  const onActiveClickHandler = () => {
    return props.changeFilter('active');
  };

  const onCompletedClickHandler = () => {
    return props.changeFilter('completed');
  };

  return (
    <>
      <h2>{props.title}</h2>
      <input
        type="text"
        value={newTaskTitle}
        onChange={onNewTaskChangeHandler}
        onKeyUp={onNewTaskPressHandler}
      />
      <button onClick={addNewTask}>add</button>
      <ul>
        {props.tasks.map((t) => {
          return (
            <li key={t.id}>
              {t.title}
              <input type="checkbox" checked={t.isDone} />
              <button
                onClick={() => {
                  props.removeTask(t.id);
                }}
              >
                delete
              </button>
            </li>
          );
        })}
      </ul>
      <button onClick={props.deleteAllTasks}>delete all</button>

      <div>
        <button onClick={onAllClickHandler}>all</button>
        <button onClick={onActiveClickHandler}>active</button>
        <button onClick={onCompletedClickHandler}>completed</button>
        <button onClick={props.showThreeTask}>show 3 tasks</button>
      </div>
    </>
  );
};
