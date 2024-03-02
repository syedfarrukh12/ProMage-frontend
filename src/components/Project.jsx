import { Link } from "react-router-dom";
import { convertDate, isBetweenDates } from "../utils/utils";

export default function ProjectList({ projects }) {
  return (
    <table className="border-collapse w-full mt-2">
      <thead>
        <tr>
          <th className="border px-4 py-2">Name</th>
          <th className="border px-4 py-2">Manager</th>
          <th className="border px-4 py-2">Start Date</th>
          <th className="border px-4 py-2">End Date</th>
          <th className="border px-4 py-2">Is Running</th>
        </tr>
      </thead>
      <tbody>
        {projects.map((project, index) => (
          <tr
            key={project._id}
            className={index % 2 === 0 ? "bg-gray-100" : ""}
          >
            <th className="border px-4 py-2">
              <Link
                to={`/projects/${project._id}`}
                className="text-blue-500 hover:underline"
              >
                {project.name}
              </Link>
            </th>
            <td className="border px-4 py-2">
              {project.manager.firstName + " " + project.manager.lastName}
            </td>
            <td className="border px-4 py-2">
              {convertDate(project.startDate)}
            </td>
            <td className="border px-4 py-2">{convertDate(project.endDate)}</td>
            <td className="border px-4 py-2">
              <input
                type="checkbox"
                name="isRunning"
                checked={isBetweenDates(project.startDate, project.endDate)}
                id=""
              />
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
