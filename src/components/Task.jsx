import { useState } from "react";
import { convertDate } from "../utils/utils";
import { TaskStatus } from "../const/const";
import { editTask } from "../utils/api";

export default function TaskTable({ tasksArray }) {
  const [editableRows, setEditableRows] = useState({});
  const [tasks, setTasks] = useState(tasksArray);

  const handleEdit = (taskId) => {
    setEditableRows((prevState) => ({
      ...prevState,
      [taskId]: true,
    }));
  };

  const handleCancel = (taskId) => {
    setEditableRows((prevState) => ({
      ...prevState,
      [taskId]: false,
    }));
  };

  const handleUpdate = (taskId) => {
    const updatedTask = tasks.find((task) => task._id === taskId);
    editTask(updatedTask);
    setTasks((prevTasks) =>
      prevTasks.map((task) => (task._id === taskId ? updatedTask : task))
    );
    setEditableRows((prevState) => ({ ...prevState, [taskId]: false }));
  };

  const isRowEditable = (taskId) => !!editableRows[taskId];

  const handleInputChange = (taskId, field, value) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task._id === taskId
          ? {
              ...task,
              [field]: value,
            }
          : task
      )
    );
  };

  return (
    <table className="border-collapse w-full mt-2">
      <thead>
        <tr>
          <th className="border px-4 py-2">Start Date</th>
          <th className="border px-4 py-2">End Date</th>
          <th className="border px-4 py-2">Description</th>
          <th className="border px-4 py-2">Status</th>
          <th className="border px-4 py-2">Actions</th>
        </tr>
      </thead>
      <tbody>
        {tasks.map((task) => (
          <tr
            key={task._id}
            className={task._id % 2 === 0 ? "bg-gray-100" : ""}
          >
            <td className="border px-4 py-2">
              {isRowEditable(task._id) ? (
                <input
                  type="date"
                  className="border rounded-md px-2 py-1"
                  value={task.startDate}
                  onChange={(e) =>
                    handleInputChange(task._id, "startDate", e.target.value)
                  }
                />
              ) : (
                convertDate(task.startDate)
              )}
            </td>
            <td className="border px-4 py-2">
              {isRowEditable(task._id) ? (
                <input
                  type="date"
                  className="border rounded-md px-2 py-1"
                  value={task.endDate}
                  onChange={(e) =>
                    handleInputChange(task._id, "endDate", e.target.value)
                  }
                />
              ) : (
                convertDate(task.endDate)
              )}
            </td>
            <td className="border px-4 py-2">
              {isRowEditable(task._id) ? (
                <input
                  type="text"
                  className="border rounded-md px-2 py-1"
                  value={task.description}
                  onChange={(e) =>
                    handleInputChange(task._id, "description", e.target.value)
                  }
                />
              ) : (
                task.description
              )}
            </td>
            <td className="border px-4 py-2">
              {isRowEditable(task._id) ? (
                <select
                  className="border rounded-md px-2 py-1"
                  value={task.status}
                  onChange={(e) =>
                    handleInputChange(task._id, "status", e.target.value)
                  }
                >
                  <option value="">Select Status</option>
                  {Object.entries(TaskStatus).map(
                    ([displayText, storedValue]) => (
                      <option key={storedValue} value={storedValue}>
                        {displayText}
                      </option>
                    )
                  )}
                </select>
              ) : (
                task.status
              )}
            </td>
            <td className="border px-4 py-2">
              {isRowEditable(task._id) ? (
                <>
                  <button
                    className="bg-green-500 px-2 py-1 rounded-md text-white"
                    onClick={() => handleUpdate(task._id)}
                  >
                    Update
                  </button>
                  <button
                    className="bg-red-500 px-2 py-1 rounded-md text-white ml-2"
                    onClick={() => handleCancel(task._id)}
                  >
                    Cancel
                  </button>
                </>
              ) : (
                <button
                  className="bg-sky-300 p-2 rounded-lg"
                  onClick={() => handleEdit(task._id)}
                >
                  Edit
                </button>
              )}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
