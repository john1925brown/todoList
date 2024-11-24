import React, { useState } from 'react';
import { ToDoList } from './components/ToDoList';

export type FilterValuesType = 'all' | 'active' | 'completed';

function App() {
  const initTasks = [
    { id: 1, title: 'html', isDone: true },
    { id: 2, title: 'js', isDone: true },
    { id: 3, title: 'react', isDone: false },
    { id: 4, title: 'redux', isDone: false },
  ];

  let [tasks, setTasks] = useState(initTasks);
  let [activeTab, setActiveTab] = useState<FilterValuesType>('all');

  const removeTask = (id: number) => {
    let filteredTasks = tasks.filter((t) => id !== t.id);
    setTasks(filteredTasks);
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
      />
    </div>
  );
}

export default App;
