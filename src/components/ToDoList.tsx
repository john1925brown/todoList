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
  filter: FilterValuesType;
  todoListId: string;
  removeTodoList: (todoListId: string) => void;
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
  let [activeFilter, setActiveFilter] = useState<FilterValuesType>(
    props.filter
  );
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
    setActiveFilter(value);
  };

  const filteredTasks=()=>{
    let tasksForTodolist = tasks;

    if (activeFilter === "active") {
    return   tasksForTodolist = tasks.filter(t => !t.isDone);
    }
    if (activeFilter === "completed") {
      return  tasksForTodolist = tasks.filter(t => t.isDone);
    }
    return tasksForTodolist
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

  const removeTodoList = () => {
    props.removeTodoList(props.todoListId);
  };

  return (
    <>
      <h2>{props.title}</h2>
      <button onClick={removeTodoList}>remove todoList </button>
      <br />
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
        {filteredTasks().map((t) => {
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
          className={activeFilter === 'all' ? 'filter--active' : ''}
          onClick={onAllClickHandler}
        >
          all
        </button>
        <button
          className={activeFilter === 'active' ? 'filter--active' : ''}
          onClick={onActiveClickHandler}
        >
          active
        </button>
        <button
          className={activeFilter === 'completed' ? 'filter--active' : ''}
          onClick={onCompletedClickHandler}
        >
          completed
        </button>
        <button
          className={activeFilter === 'firstThree' ? 'filter--active' : ''}
          onClick={showThreeTaskHandler}
        >
          show 3 tasks
        </button>
      </div>
    </>
  );
};
