import { FilterValuesType } from '../App';

type TaskType = {
  id: number;
  title: string;
  isDone: boolean;
};

type PropsType = {
  title: string;
  tasks: Array<TaskType>;
  removeTask: (id: number) => void;
  changeFilter: (value: FilterValuesType) => void;
};

export const ToDoList = (props: PropsType) => {
  return (
    <>
      <h2>{props.title}</h2>
      <ul>
        {props.tasks.map((t) => {
          return (
            <li key={t.id}>
              {t.title}
              <input type="checkbox" checked={t.isDone} />
              <button
                onClick={() => {
                  props.removeTask(t.id);
                }}
              >
                delete
              </button>
            </li>
          );
        })}
      </ul>

      <div>
        <button
          onClick={() => {
            props.changeFilter('all');
          }}
        >
          all
        </button>
        <button
          onClick={() => {
            props.changeFilter('active');
          }}
        >
          active
        </button>
        <button
          onClick={() => {
            props.changeFilter('completed');
          }}
        >
          completed
        </button>
      </div>
    </>
  );
};
