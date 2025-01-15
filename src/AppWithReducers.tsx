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

export type FilterValuesType = 'all' | 'active' | 'completed' | 'firstThree';

export type TodoListsType = {
  id: string;
  title: string;
  filter: FilterValuesType;
};

export type TasksStateType = {
  [key: string]: Array<TaskType>;
};

export function AppWithReducers() {
  const todoList1 = v1();
  const todoList2 = v1();

  const [todoLists, dispatchToTodolistsReducer] = useReducer(todolistsReducer, [
    { id: todoList1, title: 'What learn', filter: 'all' },
    { id: todoList2, title: 'What buy', filter: 'active' },
  ]);

  const initTasks: TasksStateType = {
    [todoList1]: [
      { id: v1(), title: 'html', isDone: true },
      { id: v1(), title: 'js', isDone: true },
      { id: v1(), title: 'react', isDone: false },
      { id: v1(), title: 'redux', isDone: false },
      { id: v1(), title: 'GraphQL', isDone: false },
    ],
    [todoList2]: [
      { id: v1(), title: 'meat', isDone: true },
      { id: v1(), title: 'beer', isDone: true },
      { id: v1(), title: 'milk', isDone: false },
    ],
  };

  let [tasksObj, dispatchToTasksReducer] = useReducer(tasksReducer, initTasks);

  const removeTask = (taskId: string, todoListId: string) => {
    dispatchToTasksReducer(removeTaskAC(todoListId, taskId));
  };

  const addTask = (newTaskTitle: string, todoListId: string) => {
    dispatchToTasksReducer(addTaskAC(todoListId, newTaskTitle));
  };

  const changeTaskStatus = (todolistId: string, taskId: string) => {
    dispatchToTasksReducer(changeTaskStatusAC(taskId, todolistId));
  };

  const changeTaskTitle = (
    taskId: string,
    newValue: string,
    todoListId: string
  ) => {
    dispatchToTasksReducer(changeTaskTitleAC(taskId, newValue, todoListId));
  };

  const changeFilter = (value: FilterValuesType, todoListId: string) => {
    dispatchToTodolistsReducer(changeTotodlistFilterAC(todoListId, value));
  };

  const removeTodoList = (todoListId: string) => {
    const action = removeTodolistAC(todoListId);
    dispatchToTodolistsReducer(action);
    dispatchToTasksReducer(action); 
  };

  const changeTodoListTitle = (newTitle: string, todoListId: string) => {
    dispatchToTodolistsReducer(changeTotodlistTitleAC(todoListId, newTitle));
  };

  const addTodolist = (title: string) => { 
    const action = addTodolistAC(title);
    dispatchToTodolistsReducer(action);
    dispatchToTasksReducer(action); 
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
