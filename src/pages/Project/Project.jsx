import { useParams } from "react-router-dom";
import { getProject, getTasks } from "../../utils/api";
import { useEffect, useState } from "react";
import TaskTable from "../../components/Task";
import { convertDate } from "../../utils/utils";

export default function Project() {
  const { id } = useParams();
  const [state, setState] = useState({
    project: {},
    loading: true,
    tasks: [],
  });

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

  return (
    <>
      {state.loading ? (
        "Loading..."
      ) : (
        <div className="flex flex-col p-5">
          <div className="flex justify-between">
            <p className="text-lg font-semibold">{state.project.name}</p>
            <div>
              <p>
                {state.project.manager?.firstName +
                  " " +
                  state.project.manager?.lastName}
              </p>
              <p>{convertDate(state.project.startDate)}</p>
            </div>
          </div>
          <div className="flex justify-between mt-5">
            <p className="text-lg font-bold">Tasks</p>
            <button className="bg-slate-200 p-2 rounded-md">Create Task</button>
          </div>

          <TaskTable tasks={state.tasks} />
        </div>
      )}
    </>
  );
}
