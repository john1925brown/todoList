import { v1 } from 'uuid';
import { TaskType, ToDoList } from './components/ToDoList';
import { useState } from 'react';
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

export type FilterValuesType = 'all' | 'active' | 'completed' | 'firstThree';

export type TodoListsType = {
  id: string;
  title: string;
  filter: FilterValuesType;
};

type TasksStateType = {
  [key: string]: Array<TaskType>;
};

function App() {
  const todoList1 = v1();
  const todoList2 = v1();

  const [todoLists, setTodoLists] = useState<Array<TodoListsType>>([
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

  let [tasksObj, setTasks] = useState<TasksStateType>(initTasks);

  const removeTask = (id: string, todoListId: string) => {
    const filteredTasks = tasksObj[todoListId].filter((t) => id !== t.id);
    tasksObj[todoListId] = filteredTasks;
    setTasks({ ...tasksObj });
  };

  const addTask = (value: string, todoListId: string) => {
    let newTask: TaskType = {
      id: v1(),
      title: value,
      isDone: false,
    };

    const newTasks = [newTask, ...tasksObj[todoListId]];
    tasksObj[todoListId] = newTasks;
    setTasks({ ...tasksObj });
  };

  const changeTaskStatus = (taskId: string, todolistId: string) => {
    let currentTask = tasksObj[todolistId].find((task) => task.id === taskId);
    if (currentTask) {
      currentTask.isDone = !currentTask?.isDone;
      setTasks({ ...tasksObj });
    }
  };

  const changeTaskTitle = (
    taskId: string,
    newValue: string,
    todoListId: string
  ) => {
    let currentTask = tasksObj[todoListId].find((task) => task.id === taskId);
    if (currentTask) {
      currentTask.title = newValue;
      setTasks({ ...tasksObj });
    }
  };

  const changeFilter = (value: FilterValuesType, todoListId: string) => {
    let todoList = todoLists.find((todo) => todo.id === todoListId);

    if (todoList) {
      todoList.filter = value;
      setTodoLists([...todoLists]);
    }
  };

  const removeTodoList = (todoListId: string) => {
    let filteredTodoLists = todoLists.filter((todo) => todo.id !== todoListId);
    setTodoLists(filteredTodoLists);
    delete tasksObj[todoListId];
    setTasks({ ...tasksObj });
  };

  const changeTodoListTitle = (newTitle: string, todoListId: string) => {
    let currentTodoList = todoLists.find((todo) => todo.id === todoListId);
    if (currentTodoList) {
      currentTodoList.title = newTitle;
      setTodoLists([...todoLists]);
    }
  };

  const addTodolist = (title: string) => {
    let newTodoList: TodoListsType = {
      id: v1(),
      title: title,
      filter: 'all',
    };

    setTodoLists([newTodoList, ...todoLists]);
    setTasks({ ...tasksObj, [newTodoList.id]: [] });
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

export default App;
