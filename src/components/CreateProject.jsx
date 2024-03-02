import { useEffect, useState } from "react";
import { createProject, getUsers } from "../utils/api";

const initialState = {
  name: "",
  description: "",
  manager: "",
  startDate: "",
  endDate: "",
};

function CreateProject() {
  const [project, setProject] = useState(initialState);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      const users = await getUsers();
      setUsers(users);
    };
    fetchUsers();
  }, []);

  const handleChange = (event) => {
    setProject({ ...project, [event.target.id]: event.target.value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    createProject(project);

    setProject(initialState);
  };

  return (
    <div className="container mx-auto py-12">
      <h1 className="text-3xl font-semibold mb-6">Create Project</h1>
      <form onSubmit={handleSubmit} className="max-w-lg mx-auto">
        <div className="mb-4">
          <label
            htmlFor="name"
            className="block text-sm font-medium text-gray-700"
          >
            Project Name:
          </label>
          <input
            type="text"
            className="mt-1 p-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            id="name"
            value={project.name}
            onChange={handleChange}
            required
          />
        </div>
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
            value={project.description}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="manager"
            className="block text-sm font-medium text-gray-700"
          >
            Manager:
          </label>
          <select
            id="manager"
            className="mt-1 p-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            value={project.manager}
            onChange={handleChange}
            required
          >
            <option value="">Select Manager</option>
            {users.map((user) => (
              <option key={user._id} value={user._id}>
                {user.firstName + " " + user.lastName}
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
            value={project.startDate}
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
            value={project.endDate}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mt-4">
          <button
            type="submit"
            className="inline-block px-4 py-2 bg-indigo-600 text-white rounded-lg shadow-md hover:bg-indigo-700 focus:outline-none focus:bg-indigo-700"
          >
            Create Project
          </button>
        </div>
      </form>
    </div>
  );
}

export default CreateProject;
