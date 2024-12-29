import './toDoList.css';
import { FilterValuesType } from '../App';
import { AddItemForm } from './AddItemForm/AddItemForm';
import { EditableSpan } from './EditableSpan/EditableSpan';
import { Button, Checkbox } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

export type TaskType = {
  id: string;
  title: string;
  isDone: boolean;
};

type PropsType = {
  title: string;
  tasks: Array<TaskType>;
  filter: FilterValuesType;
  todoListId: string;
  removeTodoList: (todoListId: string) => void;
  addTask: (title: string, todoListId: string) => void;
  removeTask: (id: string, todoListId: string) => void;
  changeTaskStatus: (taskId: string, todoListId: string) => void;
  changeTaskTitle: (
    taskId: string,
    newValue: string,
    todoListId: string
  ) => void;
  changeFilter: (value: FilterValuesType, todoListId: string) => void;
  changeTodoListTitle: (newTitle: string, todoListId: string) => void;
};

export const ToDoList = (props: PropsType) => {
  const onAllClickHandler = () => props.changeFilter('all', props.todoListId);

  const onActiveClickHandler = () =>
    props.changeFilter('active', props.todoListId);

  const onCompletedClickHandler = () =>
    props.changeFilter('completed', props.todoListId);

  const showThreeTaskHandler = () =>
    props.changeFilter('firstThree', props.todoListId);

  const removeTodoList = () => {
    props.removeTodoList(props.todoListId);
  };

  const addTask = (title: string) => {
    props.addTask(title, props.todoListId);
  };

  const changeTodoListTitle = (newTitle: string) => {
    props.changeTodoListTitle(newTitle, props.todoListId);
  };
  return (
    <div>
      <h2>
        <EditableSpan
          onChangeTitleHandler={changeTodoListTitle}
          title={props.title}
        />
      </h2>

      <Button
        onClick={removeTodoList}
        variant="outlined"
        startIcon={<DeleteIcon />}
      >
        remove todoList
      </Button>

      <AddItemForm addItem={addTask} />

      <ul>
        {props.tasks.map((t) => {
          const onChangeTitleHandler = (newValue: string) => {
            props.changeTaskTitle(t.id, newValue, props.todoListId);
          };

          return (
            <li key={t.id} className={t.isDone ? 'is-done' : ''}>
              <EditableSpan
                title={t.title}
                onChangeTitleHandler={onChangeTitleHandler}
              />

              <Checkbox
                checked={t.isDone}
                onChange={() => {
                  props.changeTaskStatus(t.id, props.todoListId);
                }}
              />

              <Button
                onClick={() => {
                  props.removeTask(t.id, props.todoListId);
                }}
                variant="text"
                startIcon={<DeleteIcon />}
              />
            </li>
          );
        })}
      </ul>

      <div>
        <Button
          color="inherit"
          variant={props.filter === 'all' ? 'contained' : 'outlined'}
          className={props.filter === 'all' ? 'filter--active' : ''}
          onClick={onAllClickHandler}
        >
          all
        </Button>
        <Button
          color="primary"
          variant={props.filter === 'active' ? 'contained' : 'outlined'}
          className={props.filter === 'active' ? 'filter--active' : ''}
          onClick={onActiveClickHandler}
        >
          active
        </Button>
        <Button
          color="secondary"
          variant={props.filter === 'completed' ? 'contained' : 'outlined'}
          className={props.filter === 'completed' ? 'filter--active' : ''}
          onClick={onCompletedClickHandler}
        >
          completed
        </Button>
        <Button
          color="success"
          variant={props.filter === 'firstThree' ? 'contained' : 'outlined'}
          className={props.filter === 'firstThree' ? 'filter--active' : ''}
          onClick={showThreeTaskHandler}
        >
          show 3 tasks
        </Button>
      </div>
    </div>
  );
};
