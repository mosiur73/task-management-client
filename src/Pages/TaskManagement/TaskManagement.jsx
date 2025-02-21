import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Dialog, Transition } from "@headlessui/react";
import { Fragment } from "react";

// Initialize Toast Notifications
// toast.configure();

const TaskManagement = () => {
  const queryClient = useQueryClient();
  const [task, setTask] = useState({ title: "", description: "", category: "To-Do" });
  const [editingTask, setEditingTask] = useState(null);
  const [isOpen, setIsOpen] = useState(false);

  // Fetch all tasks
  const { data: tasks, isLoading } = useQuery({
    queryKey: ["tasks"],
    queryFn: async () => {
      const { data } = await axios.get("http://localhost:5000/tasks");
      return data;
    },
  });

  // Add a new task
  const addTaskMutation = useMutation({
    mutationFn: (newTask) => axios.post("http://localhost:5000/tasks", newTask),
    onSuccess: () => {
      queryClient.invalidateQueries(["tasks"]); 
      setIsOpen(false);
      setTask({ title: "", description: "", category: "To-Do" }); // Reset form
      toast.success("Task added successfully!");
    },
  });

  // Update a task
  const updateTaskMutation = useMutation({
    mutationFn: (updatedTask) => axios.put(`http://localhost:5000/tasks/${updatedTask._id}`, updatedTask),
    onSuccess: () => {
      queryClient.invalidateQueries(["tasks"]); // Refresh tasks list
      setIsOpen(false);
      setEditingTask(null);
      toast.success("Task updated successfully!");
    },
  });

  // Delete a task
  const deleteTaskMutation = useMutation({
    mutationFn: (id) => axios.delete(`http://localhost:5000/tasks/${id}`),
    onSuccess: () => {
      queryClient.invalidateQueries(["tasks"]); // Refresh tasks list
      toast.error("Task deleted successfully!");
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editingTask) {
      updateTaskMutation.mutate({ ...task, _id: editingTask._id });
    } else {
      addTaskMutation.mutate(task);
    }
  };

  const handleEdit = (task) => {
    setEditingTask(task);
    setTask({ title: task.title, description: task.description, category: task.category });
    setIsOpen(true);
  };

  const handleDelete = (id) => {
    deleteTaskMutation.mutate(id);
  };

  if (isLoading) return <div>Loading...</div>;

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Task Management</h1>

      {/* Add Task Button */}
      <button onClick={() => setIsOpen(true)} className="p-2 bg-blue-500 text-white rounded">
        Add Task
      </button>

      {/* Task List */}
      <div className="mt-4">
        {tasks?.map((task) => (
          <div key={task._id} className="p-4 border mb-2 rounded">
            <h2 className="font-bold">{task.title}</h2>
            <p>{task.description}</p>
            <p>Category: {task.category}</p>
            <button onClick={() => handleEdit(task)} className="p-2 bg-green-500 text-white rounded mr-2">
              Edit
            </button>
            <button onClick={() => handleDelete(task._id)} className="p-2 bg-red-500 text-white rounded">
              Delete
            </button>
          </div>
        ))}
      </div>

      {/* Modal for Add/Edit Task */}
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={() => setIsOpen(false)}>
          <div className="fixed inset-0 bg-black bg-opacity-50" />
          <div className="fixed inset-0 flex items-center justify-center">
            <Dialog.Panel className="bg-white p-6 rounded-lg shadow-lg w-96">
              <Dialog.Title className="text-lg font-bold">{editingTask ? "Edit Task" : "Add Task"}</Dialog.Title>
              <form onSubmit={handleSubmit} className="mt-4">
                <input
                  type="text"
                  placeholder="Title"
                  value={task.title}
                  onChange={(e) => setTask({ ...task, title: e.target.value })}
                  className="w-full p-2 border rounded mb-2"
                  required
                />
                <input
                  type="text"
                  placeholder="Description"
                  value={task.description}
                  onChange={(e) => setTask({ ...task, description: e.target.value })}
                  className="w-full p-2 border rounded mb-2"
                />
                <select
                  value={task.category}
                  onChange={(e) => setTask({ ...task, category: e.target.value })}
                  className="w-full p-2 border rounded mb-2"
                >
                  <option value="To-Do">To-Do</option>
                  <option value="In Progress">In Progress</option>
                  <option value="Done">Done</option>
                </select>
                <div className="flex justify-end">
                  <button type="button" onClick={() => setIsOpen(false)} className="p-2 bg-gray-400 text-white rounded mr-2">
                    Cancel
                  </button>
                  <button type="submit" className="p-2 bg-blue-500 text-white rounded">
                    {editingTask ? "Update" : "Add"}
                  </button>
                </div>
              </form>
            </Dialog.Panel>
          </div>
        </Dialog>
      </Transition>
    </div>
  );
};

export default TaskManagement;
