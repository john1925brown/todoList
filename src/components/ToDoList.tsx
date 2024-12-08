import { ChangeEvent, useState } from 'react';
import { v1 } from 'uuid';

type TaskType = {
  id: string;
  title: string;
  isDone: boolean;
};

type FilterValuesType = 'all' | 'active' | 'completed' | 'firstThree';

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
    setNewTaskTitle(e.currentTarget.value);
  };

  const onNewTaskPressHandler = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && newTaskTitle) {
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
      />
      <button onClick={addNewTask}>add</button>
      <ul>
        {tasksForToDo.map((t) => {
          return (
            <li key={t.id}>
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
        <button onClick={onAllClickHandler}>all</button>
        <button onClick={onActiveClickHandler}>active</button>
        <button onClick={onCompletedClickHandler}>completed</button>
        <button onClick={showThreeTaskHandler}>show 3 tasks</button>
      </div>
    </>
  );
};
