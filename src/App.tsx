import React, { useState } from 'react';
import { ToDoList } from './components/ToDoList';
import { v1 } from 'uuid';
import { title } from 'process';

export type FilterValuesType = 'all' | 'active' | 'completed';

function App() {
  const initTasks = [
    { id: v1(), title: 'html', isDone: true },
    { id: v1(), title: 'js', isDone: true },
    { id: v1(), title: 'react', isDone: false },
    { id: v1(), title: 'redux', isDone: false },
  ];

  let [tasks, setTasks] = useState(initTasks);
  let [activeTab, setActiveTab] = useState<FilterValuesType>('all');

  const removeTask = (id: string) => {
    let filteredTasks = tasks.filter((t) => id !== t.id);
    setTasks(filteredTasks);
  };

  const addTask = (value: string) => {
    let newTask = {
      id: v1(),
      title: value,
      isDone: false,
    };

    setTasks([newTask, ...tasks]);
  };
  let tasksForToDo = tasks;

  const changeFilter = (value: FilterValuesType) => {
    setActiveTab(value);
  };

  if (activeTab === 'completed') {
    tasksForToDo = tasks.filter((t) => t.isDone === true);
  }

  if (activeTab === 'active') {
    tasksForToDo = tasks.filter((t) => t.isDone === false);
  }

  return (
    <div className="App">
      <ToDoList
        title={'What learn'}
        tasks={tasksForToDo}
        removeTask={removeTask}
        changeFilter={changeFilter}
        addTask={addTask}
      />
    </div>
  );
}

export default App;
