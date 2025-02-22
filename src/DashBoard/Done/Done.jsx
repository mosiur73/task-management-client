import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const Done = () => {

    // Fetch tasks from the backend
  const { data: tasks = [], isLoading } = useQuery({
    queryKey: ["tasks"],
    queryFn: async () => {
      const res = await axios.get("https://task-management-server-dun-nine.vercel.app/tasks");
      return res.data;
    },
  });

  // Filter tasks for "To-Do" category
  const doneTasks = tasks.filter((task) => task.category === "Done");

  if (isLoading) return <p>Loading tasks...</p>;
    return (
        <div className="p-6 max-w-7xl mx-auto">
        <h2 className="text-3xl font-semibold text-gray-900 mb-6">To-Do Tasks</h2>
  
        {doneTasks.length === 0 ? (
          <p className="text-lg text-gray-500">No tasks in the Done category.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {doneTasks.map((task) => (
              <div
                key={task._id}
                className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300"
              >
                <h3 className="text-xl font-semibold text-gray-800">{task.title}</h3>
                <p className="text-gray-600 mt-2">{task.description}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    );
};

export default Done;