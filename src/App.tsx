import { v1 } from 'uuid';
import { ToDoList } from './components/ToDoList';
import { useState } from 'react';

export type FilterValuesType = 'all' | 'active' | 'completed' | 'firstThree';

type TodoListsType = {
  id: string;
  title: string;
  filter: FilterValuesType;
};

function App() {
  const [todoLists, setTodoLists] = useState<Array<TodoListsType>>([
    { id: v1(), title: 'What learn', filter: 'all' },
    { id: v1(), title: 'What buy', filter: 'active' },
  ]);

  const removeTodoList = (todoListId: string) => {
    let filteredTodos = todoLists.filter((todo) => todo.id !== todoListId);
    setTodoLists(filteredTodos);
  };

  return (
    <div className="App">
      {todoLists.map((todo) => {
        return (
          <ToDoList
            key={todo.id}
            title={todo.title}
            filter={todo.filter}
            todoListId={todo.id}
            removeTodoList={removeTodoList}
          />
        );
      })}
    </div>
  );
}

export default App;
