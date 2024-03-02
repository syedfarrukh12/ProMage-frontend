import { useState } from "react";
import { TaskStatus } from "../const/const";
import { createTask } from "../utils/api";

function CreateTask({ project }) {
  const initialState = {
    description: "",
    status: "",
    startDate: "",
    endDate: "",
    project: project._id,
  };
  const [fields, setFields] = useState(initialState);

  const handleChange = (event) => {
    setFields({ ...fields, [event.target.id]: event.target.value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Handle form submission logic here (e.g., call an API, submit data)
    createTask(fields);

    setFields(initialState);
  };

  return (
    <div className="container mx-auto py-12">
      <h1 className="text-3xl font-semibold mb-6">Create Task</h1>
      <form onSubmit={handleSubmit} className="mx-auto">
        <div className="mb-4">
          <label
            htmlFor="description"
            className="block text-sm font-medium text-gray-700"
          >
            Description:
          </label>
          <textarea
            className="mt-1 p-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            id="description"
            value={fields.description}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="status"
            className="block text-sm font-medium text-gray-700"
          >
            Status:
          </label>
          <select
            id="status"
            className="mt-1 p-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            value={fields.status}
            onChange={handleChange}
            required
          >
            <option value="">Select Status</option>
            {Object.entries(TaskStatus).map(([displayText, storedValue]) => (
              <option key={storedValue} value={storedValue}>
                {displayText}
              </option>
            ))}
          </select>
        </div>
        <div className="mb-4">
          <label
            htmlFor="startDate"
            className="block text-sm font-medium text-gray-700"
          >
            Start Date:
          </label>
          <input
            type="date"
            className="mt-1 p-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            id="startDate"
            value={fields.startDate}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="endDate"
            className="block text-sm font-medium text-gray-700"
          >
            End Date:
          </label>
          <input
            type="date"
            className="mt-1 p-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            id="endDate"
            value={fields.endDate}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mt-4">
          <button
            type="submit"
            className="inline-block px-4 py-2 bg-indigo-600 text-white rounded-lg shadow-md hover:bg-indigo-700 focus:outline-none focus:bg-indigo-700"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
}

export default CreateTask;
