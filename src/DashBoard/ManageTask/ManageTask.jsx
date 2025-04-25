import { useState, Fragment } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { toast } from "react-toastify";
import { Dialog, Transition } from "@headlessui/react";

const ManageTask = () => {
  const queryClient = useQueryClient();
  const [isOpen, setIsOpen] = useState(false);
  const [editingTask, setEditingTask] = useState(null);

  // Fetch tasks
  const { data: tasks = [], isLoading } = useQuery({
    queryKey: ["tasks"],
    queryFn: async () => {
      const res = await axios.get("https://task-management-server-dun-nine.vercel.app/tasks");
      return res.data;
    },
  });

  // Delete Task Mutation
  const deleteTaskMutation = useMutation({
    mutationFn: async (id) => {
      await axios.delete(`https://task-management-server-dun-nine.vercel.app/tasks/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["tasks"]);
      toast.success("Task deleted successfully!");
    },
  });

  // Update Task Mutation
  const updateTaskMutation = useMutation({
    mutationFn: async ({ id, updatedTask }) => {
      await axios.put(`https://task-management-server-dun-nine.vercel.app/tasks/${id}`, updatedTask);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["tasks"]);
      setIsOpen(false);
      setEditingTask(null);
      toast.success("Task updated successfully!");
    },
  });

  // Open Edit Modal
  const handleEdit = (task) => {
    setEditingTask(task);
    setIsOpen(true);
  };

  // Handle Save Changes
  const handleSave = () => {
    updateTaskMutation.mutate({
      id: editingTask._id,
      updatedTask: editingTask,
    });
  };

  if (isLoading) return <p>Loading tasks...</p>;

  return (
    <div className="p-4">
      <h2 className="text-3xl font-semibold text-gray-900 mb-6 text-center">Manage Tasks</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-4">
        {["To-Do", "In Progress", "Done"].map((category) => (
          <div key={category} className="bg-gray-100 p-4 rounded-md shadow">
            <h2 className="text-lg font-semibold text-center mb-4">{category}</h2>
            {tasks.filter((task) => task.category === category).map((task) => (
              <div key={task._id} className="bg-white p-4 rounded-md shadow-md mb-3">
                <h3 className="font-bold">{task.title}</h3>
                <p className="text-gray-600">{task.description}</p>
                <p className="text-sm text-gray-500">Category: {task.category}</p>
                <div className="flex justify-between mt-3">
                  <button className="bg-blue-500 text-white px-4 py-1 rounded" onClick={() => handleEdit(task)}>
                    Edit
                  </button>
                  <button className="bg-yellow-500 text-white px-4 py-1 rounded" onClick={() => deleteTaskMutation.mutate(task._id)}>
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        ))}
      </div>

      {/* Edit Task Modal */}
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={() => setIsOpen(false)}>
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
            <Dialog.Panel className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
              <Dialog.Title className="text-lg font-bold">Edit Task</Dialog.Title>
              <div className="mt-4">
                <input
                  type="text"
                  placeholder="Title"
                  value={editingTask?.title || ""}
                  onChange={(e) => setEditingTask({ ...editingTask, title: e.target.value })}
                  className="w-full p-2 border rounded mb-2"
                  required
                />
                <textarea
                  placeholder="Description"
                  value={editingTask?.description || ""}
                  onChange={(e) => setEditingTask({ ...editingTask, description: e.target.value })}
                  className="w-full p-2 border rounded mb-2"
                />
                <select
                  value={editingTask?.category || "To-Do"}
                  onChange={(e) => setEditingTask({ ...editingTask, category: e.target.value })}
                  className="w-full p-2 border rounded mb-2"
                >
                  <option value="To-Do">To-Do</option>
                  <option value="In Progress">In Progress</option>
                  <option value="Done">Done</option>
                </select>
                <div className="flex justify-end gap-2">
                  <button onClick={() => setIsOpen(false)} className="px-4 py-2 bg-gray-300 rounded">Cancel</button>
                  <button onClick={handleSave} className="px-4 py-2 bg-blue-500 text-white rounded">Update</button>
                </div>
              </div>
            </Dialog.Panel>
          </div>
        </Dialog>
      </Transition>
    </div>
  );
};

export default ManageTask;
