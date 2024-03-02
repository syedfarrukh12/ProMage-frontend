import { useParams } from "react-router-dom";
import { getProject, getTasks, getUsers, updateProject } from "../../utils/api";
import { useEffect, useState } from "react";
import TaskTable from "../../components/Task";
import { convertDate } from "../../utils/utils";
import CreateTask from "../../components/CreateTask";

export default function Project() {
  const { id } = useParams();
  const [state, setState] = useState({
    project: {},
    loading: true,
    tasks: [],
    showCreate: false,
    isEditing: false,
    editedProject: {},
  });
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      const users = await getUsers();
      setUsers(users);
    };
    fetchUsers();
  }, [state]);

  useEffect(() => {
    const fetchData = async () => {
      const project = await getProject(id);
      const tasks = await getTasks(id);

      setState((prev) => ({
        ...prev,
        project: project,
        tasks,
        loading: false,
      }));
    };
    fetchData();
  }, [id]);

  const handleEdit = () => {
    setState((prev) => ({
      ...prev,
      isEditing: true,
      editedProject: { ...state.project },
    }));
  };

  const handleCancelEdit = () => {
    setState((prev) => ({
      ...prev,
      isEditing: false,
    }));
  };

  const handleUpdate = async () => {
    const updatedProject = await updateProject(state.editedProject);
    setState((prev) => ({
      ...prev,
      isEditing: false,
      project: updatedProject,
    }));
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setState((prev) => ({
      ...prev,
      editedProject: {
        ...prev.editedProject,
        [name]: value,
      },
      project: {
        ...prev.project,
        manager: {
          ...prev.project.manager,
          _id: value,
        },
      },
    }));
  };

  return (
    <>
      {state.loading ? (
        "Loading..."
      ) : (
        <div className="flex flex-col p-5">
          <div className="flex justify-between m-2">
            <div>
              <p className="text-lg font-semibold">
                {state.isEditing ? (
                  <input
                    type="text"
                    name="name"
                    value={state.editedProject.name}
                    onChange={handleInputChange}
                    className="border rounded-md px-2 py-1"
                  />
                ) : (
                  state.project.name
                )}
              </p>
              <p>
                {state.isEditing ? (
                  <textarea
                    name="description"
                    value={state.editedProject.description}
                    onChange={handleInputChange}
                    className="border rounded-md px-2 py-1"
                  />
                ) : (
                  state.project.description
                )}
              </p>

              {state.isEditing ? (
                <>
                  <button
                    className="bg-green-500 p-2 rounded-md text-white"
                    onClick={handleUpdate}
                  >
                    Update
                  </button>
                  <button
                    className="bg-red-500 p-2 rounded-md text-white"
                    onClick={handleCancelEdit}
                  >
                    Cancel
                  </button>
                </>
              ) : (
                <button
                  className="bg-slate-200 p-2 rounded-md"
                  onClick={handleEdit}
                >
                  Edit
                </button>
              )}
            </div>

            <div>
              <p>
                Manager:{" "}
                {state.isEditing ? (
                  <select
                    id="manager"
                    name="manager"
                    className="bg-slate-200 p-2 rounded-md"
                    value={state.editedProject.manager?._id}
                    onChange={handleInputChange}
                    required
                  >
                    <option value="">Select Manager</option>
                    {users.map((user) => (
                      <option key={user._id} value={user._id}>
                        {user.firstName + " " + user.lastName}
                      </option>
                    ))}
                  </select>
                ) : (
                  `${state.project.manager?.firstName} ${state.project.manager?.lastName}`
                )}
              </p>
              <p>
                Start Date:{" "}
                {state.isEditing ? (
                  <input
                    type="date"
                    name="startDate"
                    value={state.editedProject.startDate}
                    onChange={handleInputChange}
                    className="border rounded-md px-2 py-1"
                  />
                ) : (
                  convertDate(state.project.startDate)
                )}
              </p>
              <p>
                End Date:{" "}
                {state.isEditing ? (
                  <input
                    type="date"
                    name="endDate"
                    value={state.editedProject.endDate}
                    onChange={handleInputChange}
                    className="border rounded-md px-2 py-1"
                  />
                ) : (
                  convertDate(state.project.endDate)
                )}
              </p>
            </div>
          </div>
          <hr />
          <div className="flex justify-between mt-5">
            <p className="text-lg font-bold">Tasks</p>
            <button
              className="bg-slate-200 p-2 rounded-md"
              onClick={() => {
                setState((prev) => ({
                  ...prev,
                  showCreate: !state.showCreate,
                }));
              }}
            >
              {state.showCreate ? "Close" : "Create Task"}
            </button>
          </div>

          {state.showCreate && <CreateTask project={state.project} />}
          <TaskTable tasksArray={state.tasks} />
        </div>
      )}
    </>
  );
}
