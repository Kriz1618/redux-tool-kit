import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { deleteTask } from "../features/tasks/tasksSlice";

export function TasksList() {
  const tasks = useSelector((state) => state.tasks);
  const dispatch = useDispatch();

  const handleDelete = (id) => {
    dispatch(deleteTask(id));
  };

  return (
    <div className="w-4/6 ">
      <div className="flex items-center justify-center pb-6">
        <h3 className="text-4xl">Tasks List</h3>
      </div>
      <header className="flex justify-between items-center py-4">
        <h1>Tasks ({tasks.length})</h1>

        <Link
          to="/create-task"
          className="bg-indigo-600 px-2 py-1 rounded-sm text-sm shadow-sm"
        >
          Create Task
        </Link>
      </header>

      <div className="grid grid-cols-3 gap-3">
        {tasks.map((task) => (
          <div className="bg-neutral-800 p-4 rounded-md" key={task.id}>
            <header className="flex justify-between">
              <h3 className="text-lg font-bold">{task.title}</h3>
              <div className="flex gap-x-2">
                <Link
                  to={`/edit-task/${task.id}`}
                  className="bg-zinc-600 px-2 py-2 text-xs rounded-md self-center"
                >
                  Edit
                </Link>
                <button
                  onClick={() => handleDelete(task.id)}
                  className="bg-red-500 px-2 py-1 text-xs rounded-md"
                >
                  Delete
                </button>
              </div>
            </header>
            <p>{task.description}</p>
            <p className="text-xs text-slate-400">{task.id}</p>
          </div>
        ))}
      </div>
    </div>
  );
};
