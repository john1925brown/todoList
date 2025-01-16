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

  const changeFilter = (value: FilterValuesType, todoListId: string) => {
    dispatch(changeTotodlistFilterAC(todoListId, value));
  };

  const removeTodoList = (todoListId: string) => {
    const action = removeTodolistAC(todoListId);
    dispatch(action);
  };

  const changeTodoListTitle = (newTitle: string, todoListId: string) => {
    const action = changeTotodlistTitleAC(todoListId, newTitle);
    dispatch(action);
  };

  const addTodolist = (title: string) => {
    const action = addTodolistAC(title);
    dispatch(action);
  };

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
            return (
              <Grid>
                <Paper>
                  <ToDoList
                    key={todo.id}
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
