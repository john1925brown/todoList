import { TaskType, ToDoList } from './components/ToDoList';
import { AddItemForm } from './components/AddItemForm/AddItemForm';
import './App.css';
import {
  AppBar,
  Button,
  Container,
  IconButton,
  Menu,
  Paper,
  Toolbar,
  Typography,
} from '@mui/material';
import { Grid } from '@mui/system';
import {
  addTodolistAC,
  changeTotodlistFilterAC,
  changeTotodlistTitleAC,
  removeTodolistAC,
} from './state/todolists-reducer';
import {} from './state/tasks-reducer';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { AppRootStateType } from './state/store';
import { useCallback } from 'react';

export type FilterValuesType = 'all' | 'active' | 'completed' | 'firstThree';

export type TodoListsType = {
  id: string;
  title: string;
  filter: FilterValuesType;
};

export type TasksStateType = {
  [key: string]: Array<TaskType>;
};

export function AppWithRedux() {
  const dispatch = useDispatch();

  const todoLists = useSelector<AppRootStateType, TodoListsType[]>(
    (state) => state.todoLists
  );

  const tasks = useSelector<AppRootStateType, TasksStateType>(
    (state) => state.tasks
  );

  const changeFilter = useCallback(
    (value: FilterValuesType, todoListId: string) => {
      dispatch(changeTotodlistFilterAC(todoListId, value));
    },
    []
  );

  const removeTodoList = useCallback((todoListId: string) => {
    const action = removeTodolistAC(todoListId);
    dispatch(action);
  }, []);

  const changeTodoListTitle = useCallback(
    (newTitle: string, todoListId: string) => {
      const action = changeTotodlistTitleAC(todoListId, newTitle);
      dispatch(action);
    },
    []
  );

  const addTodolist = useCallback((title: string) => {
    const action = addTodolistAC(title);
    dispatch(action);
  }, []);

  return (
    <div className="App">
      <AppBar position="static">
        <Toolbar>
          <IconButton edge="start" color="inherit" aria-label="menu">
            {/* <Menu open /> */}
          </IconButton>
          <Typography variant="h6">news</Typography>
          <Button color="inherit">login</Button>
        </Toolbar>
      </AppBar>
      <Container fixed>
        <Grid container>
          <AddItemForm addItem={addTodolist} />
        </Grid>
        <Grid container spacing={3}>
          {todoLists.map((todo) => {
            const tasksForTodoList = tasks[todo.id];
            return (
              <Grid key={todo.id}>
                <Paper>
                  <ToDoList
                    tasks={tasksForTodoList}
                    title={todo.title}
                    filter={todo.filter}
                    todolistId={todo.id}
                    removeTodoList={removeTodoList}
                    changeFilter={changeFilter}
                    changeTodoListTitle={changeTodoListTitle}
                  />
                </Paper>
              </Grid>
            );
          })}
        </Grid>
      </Container>
    </div>
  );
}
