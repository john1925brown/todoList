import './toDoList.css';
import { FilterValuesType } from '../../AppWithRedux';
import { AddItemForm } from '../AddItemForm/AddItemForm';
import { EditableSpan } from '../EditableSpan/EditableSpan';
import { Button } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { useDispatch } from 'react-redux';
import { addTaskAC } from '../../state/tasks-reducer';
import { memo, useCallback } from 'react';
import { Task } from '../Task/Task';

export type TaskType = {
  id: string;
  title: string;
  isDone: boolean;
};

type ToDoListPropsType = {
  tasks: TaskType[];
  title: string;
  filter: FilterValuesType;
  todolistId: string;
  removeTodoList: (todolistId: string) => void;
  changeFilter: (value: FilterValuesType, todolistId: string) => void;
  changeTodoListTitle: (newTitle: string, todolistId: string) => void;
};
export const ToDoList = memo((props: ToDoListPropsType): JSX.Element => {
  const dispatch = useDispatch();

  const onAllClickHandler = useCallback(() => {
    props.changeFilter('all', props.todolistId);
  }, [props.changeFilter, props.todolistId, props]);

  const onActiveClickHandler = useCallback(() => {
    props.changeFilter('active', props.todolistId);
  }, [props.todolistId, props.changeFilter]);

  const onCompletedClickHandler = useCallback(() => {
    props.changeFilter('completed', props.todolistId);
  }, [props.changeFilter, props.todolistId]);

  const showThreeTaskHandler = useCallback(() => {
    props.changeFilter('firstThree', props.todolistId);
  }, [props.changeFilter, props.todolistId]);

  const removeTodoList = useCallback(() => {
    props.removeTodoList(props.todolistId);
  }, [props.removeTodoList, props.todolistId]);

  const changeTodoListTitle = useCallback(
    (newTitle: string) => {
      props.changeTodoListTitle(newTitle, props.todolistId);
    },
    [props.todolistId, props.changeTodoListTitle]
  );

  const addTask = useCallback(
    (title: string) => {
      dispatch(addTaskAC(props.todolistId, title));
    },
    [props.todolistId, dispatch]
  );

  let tasksForTodolist = props.tasks;

  if (props.filter === 'active') {
    tasksForTodolist = props.tasks.filter((t) => !t.isDone);
  }

  if (props.filter === 'completed') {
    tasksForTodolist = props.tasks.filter((t) => t.isDone);
  }

  if (props.filter === 'firstThree') {
    tasksForTodolist = props.tasks.slice(0, 3);
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

      <AddItemForm addItem={addTask} />

      <div>
        {tasksForTodolist.map((t) => (
          <Task
            key={t.id}
            todolistId={props.todolistId}
            taskId={t.id}
            isDone={t.isDone}
            title={t.title}
          />
        ))}
      </div>

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
          color="error"
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
});
