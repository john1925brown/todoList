import { EditableSpan } from '../EditableSpan/EditableSpan';
import { Button, Checkbox } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { useDispatch } from 'react-redux';
import {
  changeTaskStatusAC,
  changeTaskTitleAC,
  removeTaskAC,
} from '../../state/tasks-reducer';
import { memo, useCallback } from 'react';

type TaskPropsType = {
  todolistId: string;
  taskId: string;
  isDone: boolean;
  title: string;
};

export const Task = memo((props: TaskPropsType) => {
  const dispatch = useDispatch();
  const onChangeTitleHandler = useCallback(
    (newValue: string) => {
      changeTaskTitleAC(props.todolistId, props.taskId, newValue);
    },
    [props.todolistId, props.taskId]
  );

  const onChangeStatusHandler = useCallback(() => {
    dispatch(changeTaskStatusAC(props.todolistId, props.taskId));
  }, [props.todolistId, props.taskId, dispatch]);

  const onClickRemoveHandler = useCallback(() => {
    dispatch(removeTaskAC(props.todolistId, props.taskId));
  }, [props.todolistId, props.taskId, dispatch]);

  return (
    <li className={props.isDone ? 'is-done' : ''}>
      <EditableSpan
        title={props.title}
        onChangeTitleHandler={onChangeTitleHandler}
      />

      <Checkbox checked={props.isDone} onChange={onChangeStatusHandler} />

      <Button
        onClick={onClickRemoveHandler}
        variant="text"
        startIcon={<DeleteIcon />}
      />
    </li>
  );
});
