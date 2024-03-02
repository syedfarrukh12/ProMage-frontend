import { convertDate } from "../utils/utils";

export default function TaskTable({ tasks }) {
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
        {tasks.map((task, index) => (
          <tr key={task.id} className={index % 2 === 0 ? "bg-gray-100" : ""}>
            <td className="border px-4 py-2">{convertDate(task.startDate)}</td>
            <td className="border px-4 py-2">{convertDate(task.endDate)}</td>
            <td className="border px-4 py-2">{task.description}</td>
            <td className="border px-4 py-2">{task.Status}</td>
            <td className="border px-4 py-2">
              <button className="bg-sky-300 p-2 rounded-lg">Edit</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
