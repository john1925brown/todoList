import { v1 } from 'uuid';
import { TaskType, ToDoList } from './components/ToDoList';
import { useReducer } from 'react';
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
  todolistsReducer,
} from './state/todolists-reducer';
import {
  addTaskAC,
  changeTaskStatusAC,
  changeTaskTitleAC,
  removeTaskAC,
  tasksReducer,
} from './state/tasks-reducer';
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

  const tasksObj = useSelector<AppRootStateType, TasksStateType>(
    (state) => state.tasks
  );

  const removeTask = (taskId: string, todoListId: string) => {
    dispatch(removeTaskAC(todoListId, taskId));
  };

  const addTask = (newTaskTitle: string, todoListId: string) => {
    dispatch(addTaskAC(todoListId, newTaskTitle));
  };

  const changeTaskStatus = (todolistId: string, taskId: string) => {
    dispatch(changeTaskStatusAC(taskId, todolistId));
  };

  const changeTaskTitle = (
    taskId: string,
    newValue: string,
    todoListId: string
  ) => {
    dispatch(changeTaskTitleAC(taskId, newValue, todoListId));
  };

  const changeFilter = (value: FilterValuesType, todoListId: string) => {
    dispatch(changeTotodlistFilterAC(todoListId, value));
  };

  const removeTodoList = (todoListId: string) => {
    const action = removeTodolistAC(todoListId);
    dispatch(action);
  };

  const changeTodoListTitle = (newTitle: string, todoListId: string) => {
    dispatch(changeTotodlistTitleAC(todoListId, newTitle));
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
            const filteredTasks = () => {
              let tasksForTodolist = tasksObj[todo.id];

              if (todo.filter === 'active') {
                return (tasksForTodolist = tasksForTodolist.filter(
                  (t) => !t.isDone
                ));
              }

              if (todo.filter === 'completed') {
                return (tasksForTodolist = tasksForTodolist.filter(
                  (t) => t.isDone
                ));
              }

              if (todo.filter === 'firstThree') {
                return (tasksForTodolist = tasksForTodolist.slice(0, 3));
              }

              return tasksForTodolist;
            };

            const tasks = filteredTasks();

            return (
              <Grid>
                <Paper>
                  <ToDoList
                    key={todo.id}
                    title={todo.title}
                    tasks={tasks}
                    filter={todo.filter}
                    todoListId={todo.id}
                    removeTodoList={removeTodoList}
                    addTask={addTask}
                    removeTask={removeTask}
                    changeTaskStatus={changeTaskStatus}
                    changeFilter={changeFilter}
                    changeTaskTitle={changeTaskTitle}
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
