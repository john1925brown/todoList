import { ChangeEvent, useState } from 'react';
import { v1 } from 'uuid';
import './toDoList.css';
import { FilterValuesType } from '../App';

type TaskType = {
  id: string;
  title: string;
  isDone: boolean;
};

type PropsType = {
  title: string;
};

export const ToDoList = (props: PropsType) => {
  const initTasks = [
    { id: v1(), title: 'html', isDone: true },
    { id: v1(), title: 'js', isDone: true },
    { id: v1(), title: 'react', isDone: false },
    { id: v1(), title: 'redux', isDone: false },
    { id: v1(), title: 'GraphQL', isDone: false },
  ];

  let [tasks, setTasks] = useState(initTasks);
  let [activeTab, setActiveTab] = useState<FilterValuesType>('all');
  let [isInputEmpty, setIsInputEmpty] = useState(false);

  const removeTask = (id: string) => {
    setTasks(tasks.filter((t) => id !== t.id));
  };

  const deleteAllTasks = () => {
    setTasks([]);
  };

  const addTask = (value: string) => {
    let newTask: TaskType = {
      id: v1(),
      title: value,
      isDone: false,
    };

    setTasks([newTask, ...tasks]);
  };

  const changeFilter = (value: FilterValuesType) => {
    setActiveTab(value);
  };

  let tasksForToDo = tasks;

  if (activeTab === 'completed') {
    tasksForToDo = tasks.filter((t) => t.isDone === true);
  }

  if (activeTab === 'active') {
    tasksForToDo = tasks.filter((t) => t.isDone === false);
  }

  if (activeTab === 'firstThree') {
    tasksForToDo = tasks.filter((t, index) => index < 3);
  }

  const [newTaskTitle, setNewTaskTitle] = useState('');

  const onNewTaskChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setIsInputEmpty(false);
    setNewTaskTitle(e.currentTarget.value);
  };

  const onNewTaskPressHandler = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && newTaskTitle.trim().length) {
      addTask(newTaskTitle);
      setNewTaskTitle('');
    }
  };

  const changeTaskStatus = (taskId: string) => {
    let currentTask = tasks.find((task) => task.id === taskId); // find current task,
    if (currentTask) {
      currentTask.isDone = !currentTask?.isDone; // change current tusk isDone
    }
    setTasks([...tasks]); // update state
  };

  const addNewTask = () => {
    if (!newTaskTitle.trim().length) {
      setIsInputEmpty(true);
      return;
    }
    addTask(newTaskTitle);
    setNewTaskTitle('');
  };

  const onAllClickHandler = () => {
    return changeFilter('all');
  };

  const onActiveClickHandler = () => {
    return changeFilter('active');
  };

  const onCompletedClickHandler = () => {
    return changeFilter('completed');
  };

  const showThreeTaskHandler = () => {
    return changeFilter('firstThree');
  };

  return (
    <>
      <h2>{props.title}</h2>
      <input
        type="text"
        value={newTaskTitle}
        onChange={onNewTaskChangeHandler}
        onKeyUp={onNewTaskPressHandler}
        className={isInputEmpty ? 'error' : ''}
      />
      <button onClick={addNewTask}>add</button>
      {isInputEmpty && <p className="error__message">Field is required</p>}
      <ul>
        {tasksForToDo.map((t) => {
          return (
            <li key={t.id} className={t.isDone ? 'is-done' : ''}>
              {t.title}
              <input
                type="checkbox"
                checked={t.isDone}
                onChange={() => {
                  changeTaskStatus(t.id);
                }}
              />
              <button
                onClick={() => {
                  removeTask(t.id);
                }}
              >
                delete
              </button>
            </li>
          );
        })}
      </ul>
      <button onClick={deleteAllTasks}>delete all</button>

      <div>
        <button
          className={activeTab === 'all' ? 'filter--active' : ''}
          onClick={onAllClickHandler}
        >
          all
        </button>
        <button
          className={activeTab === 'active' ? 'filter--active' : ''}
          onClick={onActiveClickHandler}
        >
          active
        </button>
        <button
          className={activeTab === 'completed' ? 'filter--active' : ''}
          onClick={onCompletedClickHandler}
        >
          completed
        </button>
        <button
          className={activeTab === 'firstThree' ? 'filter--active' : ''}
          onClick={showThreeTaskHandler}
        >
          show 3 tasks
        </button>
      </div>
    </>
  );
};
