import { useEffect, useState } from "react";
import { getProjects } from "../../utils/api";
import Project from "../../components/Project";
import CreateProject from "../../components/CreateProject";

export default function Dashboard() {
  const [state, setState] = useState({
    projects: [],
    loading: false,
    showCreate: false,
  });

  useEffect(() => {
    setState((prev) => ({
      ...prev,
      loading: true,
    }));
    getProjects().then((res) => {
      setState((prev) => ({
        ...prev,
        projects: res,
        loading: false,
      }));
    });
  }, []);

  return (
    <div className="m-2">
      <div className="flex justify-between">
        <p className="text-lg font-bold">Projects</p>
        <button
          className="bg-slate-200 p-2 rounded-md"
          onClick={() => {
            setState((prev) => ({
              ...prev,
              showCreate: !state.showCreate,
            }));
          }}
        >
          {state.showCreate ? "Close" : "Create Project"}
        </button>
      </div>
      {state.showCreate && <CreateProject state={state} setState={setState} />}

      {state.loading ? "Loading..." : <Project projects={state.projects} />}
    </div>
  );
}
