import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";

const DashHome = () => {
  const { data: tasks, isLoading } = useQuery({
    queryKey: ["tasks"],
    queryFn: async () => {
      const { data } = await axios.get("https://task-management-server-dun-nine.vercel.app/tasks");
      return data;
    },
  });

  if (isLoading) return <div className="text-center text-lg font-semibold">Loading...</div>;

  // Group tasks by priority for the chart
  function groupTasksByPriority(tasks) {
    const priorityCounts = {};
    tasks.forEach((task) => {
      const priority = task.priority || "Unknown";
      priorityCounts[priority] = (priorityCounts[priority] || 0) + 1;
    });

    return Object.entries(priorityCounts).map(([name, value]) => ({ name, value }));
  }

  const priorityData = groupTasksByPriority(tasks);

  // Task statistics
  const taskData = {
    total: tasks.length,
    // completed: tasks.filter((task) => task.status === "completed").length,
    completed: tasks.filter((task) => task.category === "Done").length,
    inProgress: tasks.filter((task) => task.category === "In Progress").length,
    todos : tasks.filter((task) => task.category === "To-Do").length
  };

  return (
    <div className="bg-gray-100 min-h-screen p-6">
      {/* Task Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {[
          { title: "Total Tasks", value: taskData.total, color: "bg-gray-500" },
          { title: "Completed Tasks", value: taskData.completed, color: "bg-gray-500" },
          { title: "Tasks In Progress", value: taskData.inProgress, color: "bg-gray-500" },
          { title: "To Do", value: taskData.todos, color: "bg-gray-500" },
        ].map((item, index) => (
          <div key={index} className={`p-4 rounded-lg shadow text-white ${item.color}`}>
            <h2 className="text-lg font-medium">{item.title}</h2>
            <p className="text-2xl font-bold">{item.value}</p>
          </div>
        ))}
      </div>

      {/* Chart Section */}
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-xl font-bold mb-4">Task Priority Distribution</h2>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={priorityData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="value" fill=" #3B82F6" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default DashHome;
