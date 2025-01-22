import { TaskType, ToDoList } from './components/todoList/ToDoList';

import { AddItemForm } from './components/AddItemForm/AddItemForm';
import './App.css';
import {
  AppBar,
  Container,
  IconButton,
  Paper,
  Toolbar,
  CssBaseline,
  Switch,
} from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import MenuIcon from '@mui/icons-material/Menu';
import { Grid } from '@mui/system';
import { containerSx } from './components/todoList/Todolist.styles';

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
import { useCallback, useState } from 'react';
import { NavButton } from './components/NavButton';

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

  // THEME

  type ThemeMode = 'dark' | 'light';

  const [themeMode, setThemeMode] = useState<ThemeMode>('light');

  const changeMode = () => {
    setThemeMode(themeMode === 'light' ? 'dark' : 'light');
  };

  const theme = createTheme({
    palette: {
      mode: themeMode,
      primary: {
        main: '#087EA4',
        light: '#5CB3CC',
        dark: '#0a354b',
        contrastText: '#ffffff',
      },
    },
  });

  return (
    <div className="App">
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <AppBar position="static" sx={{ mb: '30px' }}>
          <Toolbar>
            <Container maxWidth={'lg'} sx={containerSx}>
              <IconButton edge="start" color="inherit">
                <MenuIcon />
              </IconButton>
              <div>
                <NavButton color="inherit">Sign in</NavButton>
                <NavButton color="inherit">Sign up</NavButton>
                <NavButton background={theme.palette.primary.dark}>
                  Faq
                </NavButton>
                <Switch color={'default'} onChange={changeMode} />
              </div>
            </Container>
          </Toolbar>
        </AppBar>
        <Container fixed maxWidth={'lg'}>
          <Grid container sx={{ mb: '30px' }}>
            <AddItemForm addItem={addTodolist} />
          </Grid>
          <Grid container spacing={3}>
            {todoLists.map((todo) => {
              const tasksForTodoList = tasks[todo.id];
              return (
                <Grid key={todo.id}>
                  <Paper sx={{ p: '0 20px 20px 20px' }}>
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
      </ThemeProvider>
    </div>
  );
}
