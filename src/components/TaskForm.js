import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { addTask, editTask } from "../features/tasks/tasksSlice";
import { v4 as uuid } from "uuid";

export function TaskForm() {
  const [task, setTask] = useState({
    title: "",
    description: "",
  });
  const [title, setTitle] = useState("Create Task");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const params = useParams();
  const tasks = useSelector((state) => state.tasks);

  const handleChange = (e) => {
    setTask({
      ...task,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (params.id) {
      dispatch(editTask({ ...task, id: params.id }));
    } else {
      dispatch(
        addTask({
          ...task,
          id: uuid(),
        })
      );
    }

    navigate("/");
  };

  useEffect(() => {
    if (params.id) {
      const oldTask = tasks.find((task) => task.id === params.id);
      setTask(oldTask);
      setTitle(`Update Task: ${oldTask.title}`);
    }
  }, [params, tasks]);

  return (
    <div>
      <div className="flex items-center justify-center pb-6">
        <h3 className="text-4xl">{title}</h3>
      </div>
      <form onSubmit={handleSubmit} className="bg-zinc-800 max-w-sm p-4">
        <label className="block text-sm font-bold">Task:</label>
        <input
          type="text"
          name="title"
          onChange={handleChange}
          value={task.title}
          className="w-full p-2 rounded-md bg-zinc-600 mb-2"
          placeholder="Write a title"
          autoFocus
        />
        <label>
          Description:
          <textarea
            type="text"
            name="description"
            onChange={handleChange}
            value={task.description}
            className="w-full p-2 rounded-md bg-zinc-600 mb-2"
            placeholder="Write a description"
          />
        </label>
        <button type="submit" disabled={!task.title || !task.description} className="bg-indigo-600 px-2 py-1">
          Submit
        </button>
      </form>
    </div>
  );
}
