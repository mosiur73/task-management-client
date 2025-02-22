import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { toast } from "react-toastify";


const ManageTask = () => {
  const queryClient = useQueryClient();

  // Fetch tasks
  const { data: tasks = [], isLoading } = useQuery({
    queryKey: ["tasks"],
    queryFn: async () => {
      const res = await axios.get("http://localhost:5000/tasks");
      return res.data;
    },
  });

  // Delete Task Mutation
  const deleteTaskMutation = useMutation({
    mutationFn: async (id) => {
      await axios.delete(`http://localhost:5000/tasks/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["tasks"]); // Refresh tasks on delete
      toast.success("Task deleted successfully!");
    },
  });

  // Update Task Mutation
  const updateTaskMutation = useMutation({
    mutationFn: async ({ id, updatedTask }) => {
      await axios.put(`http://localhost:5000/tasks/${id}`, updatedTask);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["tasks"]); // Refresh tasks on update
      toast.success("Task updated successfully!");
    },
  });

  // Function to handle task update
  const handleEdit = (task) => {
    const newTitle = prompt("Enter new title:", task.title);
    const newDescription = prompt("Enter new description:", task.description);
    if (newTitle && newDescription) {
      updateTaskMutation.mutate({
        id: task._id,
        updatedTask: { ...task, title: newTitle, description: newDescription },
      });
    }
  };

  if (isLoading) return <p>Loading tasks...</p>;

  return (
    <div className="grid grid-cols-3 gap-4 p-6">
     
      {["To-Do", "In Progress", "Done"].map((category) => (
        <div key={category} className="bg-gray-100 p-4 rounded-md shadow">
          <h2 className="text-lg font-semibold text-center mb-4">{category}</h2>
          {tasks
            .filter((task) => task.category === category)
            .map((task) => (
              <div
                key={task._id}
                className="bg-white p-4 rounded-md shadow-md mb-3"
              >
                <h3 className="font-bold">{task.title}</h3>
                <p className="text-gray-600">{task.description}</p>
                <div className="flex justify-between mt-3">
                  <button
                    className="bg-blue-500 text-white px-4 py-1 rounded"
                    onClick={() => handleEdit(task)}
                  >
                    Edit
                  </button>
                  <button
                    className="bg-red-500 text-white px-4 py-1 rounded"
                    onClick={() => deleteTaskMutation.mutate(task._id)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
        </div>
      ))}
    </div>
  );
};

export default ManageTask;
