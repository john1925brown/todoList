import { v1 } from 'uuid';
import { ToDoList } from './components/ToDoList';

export type FilterValuesType = 'all' | 'active' | 'completed' | 'firstThree';

type TodoListsType = {
  id: string;
  title: string;
  filter: FilterValuesType;
};

function App() {
  let todoLists: Array<TodoListsType> = [
    { id: v1(), title: 'What learn', filter: 'all' },
    { id: v1(), title: 'What buy', filter: 'all' },
  ];
  return (
    <div className="App">
      {todoLists.map((todo) => {
        return <ToDoList title={todo.title} />;
      })}
      {/* <ToDoList title={'What learn'} /> */}
      {/* <ToDoList title={'What learn'} /> */}
    </div>
  );
}

export default App;
