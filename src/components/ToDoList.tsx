import './toDoList.css';
import { FilterValuesType } from '../AppWithRedux';
import { AddItemForm } from './AddItemForm/AddItemForm';
import { EditableSpan } from './EditableSpan/EditableSpan';
import { Button, Checkbox } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { useSelector } from 'react-redux';
import { AppRootStateType } from '../state/store';
import { useDispatch } from 'react-redux';
import {
  addTaskAC,
  changeTaskStatusAC,
  changeTaskTitleAC,
  removeTaskAC,
} from '../state/tasks-reducer';

export type TaskType = {
  id: string;
  title: string;
  isDone: boolean;
};

type ToDoListPropsType = {
  title: string;
  filter: FilterValuesType;
  todolistId: string;
  removeTodoList: (todolistId: string) => void;
  changeFilter: (value: FilterValuesType, todolistId: string) => void;
  changeTodoListTitle: (newTitle: string, todolistId: string) => void;
};
export const ToDoList = (props: ToDoListPropsType): JSX.Element => {
  const dispatch = useDispatch();

  const tasks = useSelector<AppRootStateType, TaskType[]>(
    (state) => state.tasks[props.todolistId]
  );

  const onAllClickHandler = () => props.changeFilter('all', props.todolistId);

  const onActiveClickHandler = () =>
    props.changeFilter('active', props.todolistId);

  const onCompletedClickHandler = () =>
    props.changeFilter('completed', props.todolistId);

  const showThreeTaskHandler = () =>
    props.changeFilter('firstThree', props.todolistId);

  const removeTodoList = () => {
    props.removeTodoList(props.todolistId);
  };

  const changeTodoListTitle = (newTitle: string) => {
    props.changeTodoListTitle(newTitle, props.todolistId);
  };

  let tasksForTodolist = tasks;

  if (props.filter === 'active') {
    tasksForTodolist = tasksForTodolist.filter((t) => !t.isDone);
  }

  if (props.filter === 'completed') {
    tasksForTodolist = tasksForTodolist.filter((t) => t.isDone);
  }

  if (props.filter === 'firstThree') {
    tasksForTodolist = tasksForTodolist.slice(0, 3);
  }

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

      <AddItemForm
        addItem={(title: string) => {
          dispatch(addTaskAC(props.todolistId, title));
        }}
      />

      <ul>
        {tasksForTodolist.map((t) => {
          const onChangeTitleHandler = (newValue: string) => {
            dispatch(changeTaskTitleAC(props.todolistId, t.id, newValue)); // do not change
          };

          const onChangeStatusHandler = () => {
            dispatch(changeTaskStatusAC(props.todolistId, t.id));
          };

          const onClickRemoveHandler = () => {
            dispatch(removeTaskAC(props.todolistId, t.id));
          };

          return (
            <li key={t.id} className={t.isDone ? 'is-done' : ''}>
              <EditableSpan
                title={t.title}
                onChangeTitleHandler={onChangeTitleHandler}
              />

              <Checkbox checked={t.isDone} onChange={onChangeStatusHandler} />

              <Button
                onClick={onClickRemoveHandler}
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
