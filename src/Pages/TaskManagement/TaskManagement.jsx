import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Dialog, Transition } from "@headlessui/react";
import { Fragment } from "react";
import { DndContext, DragOverlay, closestCenter, KeyboardSensor, PointerSensor, useSensor, useSensors } from "@dnd-kit/core";
import { arrayMove, SortableContext, sortableKeyboardCoordinates, verticalListSortingStrategy } from "@dnd-kit/sortable";
import { SortableItem } from "./SortableItem"; // এই কম্পোনেন্টটি তৈরি করুন

const TaskManagement = () => {
  const queryClient = useQueryClient();
  const [task, setTask] = useState({ title: "", description: "", category: "To-Do" });
  const [editingTask, setEditingTask] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const [activeTask, setActiveTask] = useState(null); // সক্রিয় টাস্ক ট্র্যাক করতে

  const { data: tasks, isLoading } = useQuery({
    queryKey: ["tasks"],
    queryFn: async () => {
      const { data } = await axios.get("http://localhost:5000/tasks");
      return data;
    },
  });

  const mutation = useMutation({
    mutationFn: (newTask) =>
      newTask._id ? axios.put(`http://localhost:5000/tasks/${newTask._id}`, newTask) : axios.post("http://localhost:5000/tasks", newTask),
    onSuccess: () => {
      queryClient.invalidateQueries(["tasks"]);
      setIsOpen(false);
      setTask({ title: "", description: "", category: "To-Do" });
      setEditingTask(null);
      toast.success(editingTask ? "Task updated successfully!" : "Task added successfully!");
    },
  });

  const deleteTaskMutation = useMutation({
    mutationFn: (id) => axios.delete(`http://localhost:5000/tasks/${id}`),
    onSuccess: () => {
      queryClient.invalidateQueries(["tasks"]);
      toast.error("Task deleted successfully!");
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    mutation.mutate({ ...task, _id: editingTask?._id });
  };

  const handleEdit = (task) => {
    console.log("Editing Task:", task); // কনসোলে টাস্ক ডেটা দেখুন
    setEditingTask(task);
    setTask({ title: task.title, description: task.description, category: task.category });
    setIsOpen(true);
  };

  const handleDelete = (id) => {
    console.log("Deleting Task ID:", id); // কনসোলে টাস্ক আইডি দেখুন
    deleteTaskMutation.mutate(id);
  };

  // ড্রাগ অ্যান্ড ড্রপ ফাংশনালিটি
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleDragStart = (event) => {
    const { active } = event;
    setActiveTask(tasks.find((task) => task._id === active.id));
  };

  const handleDragEnd = async (event) => {
    const { active, over } = event;

    if (active.id !== over.id) {
      const oldIndex = tasks.findIndex((task) => task._id === active.id);
      const newIndex = tasks.findIndex((task) => task._id === over.id);

      // টাস্কের নতুন কলাম নির্ধারণ করুন
      const newCategory = tasks[newIndex].category;

      // ফ্রন্টএন্ডে টাস্কগুলির অর্ডার আপডেট করুন
      const updatedTasks = arrayMove(tasks, oldIndex, newIndex);
      queryClient.setQueryData(["tasks"], updatedTasks);

      // ব্যাকএন্ডে আপডেট করুন
      try {
        const response = await axios.put(`http://localhost:5000/tasks/${active.id}`, {
          ...activeTask,
          category: newCategory, // নতুন কলাম
          order: newIndex, // নতুন অর্ডার
        });

        // আপডেটেড ডেটা কনসোলে দেখুন
        console.log("Updated Task:", response.data);

        // ফ্রন্টএন্ডে আপডেটেড ডেটা সেট করুন
        queryClient.setQueryData(["tasks"], (oldTasks) =>
          oldTasks.map((task) => (task._id === active.id ? response.data : task))
        );
      } catch (error) {
        console.error("Error updating task:", error);
      }
    }

    setActiveTask(null);
  };

  if (isLoading) return <div>Loading...</div>;

  return (
    <div className="p-8">
      <h1 className="text-3xl text-center font-bold mb-4">Task Management</h1>
      <button onClick={() => setIsOpen(true)} className="p-3 px-4 bg-blue-500 text-white text-xl font-bold rounded">
        Add Task
      </button>

      <DndContext sensors={sensors} collisionDetection={closestCenter} onDragStart={handleDragStart} onDragEnd={handleDragEnd}>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
          {["To-Do", "In Progress", "Done"].map((category) => (
            <div key={category} className="bg-gray-100 p-4 rounded-lg shadow-lg">
              <h2 className="text-xl font-semibold text-center mb-3">{category}</h2>
              <SortableContext items={tasks?.filter((task) => task.category === category).map((task) => task._id)} strategy={verticalListSortingStrategy}>
                {tasks
                  ?.filter((task) => task.category === category)
                  .map((task) => (
                    <SortableItem key={task._id} id={task._id}>
                      <div className="bg-white p-4 mb-3 rounded-lg shadow-md transition-transform transform hover:scale-105">
                        <h3 className="font-bold text-lg">{task.title}</h3>
                        <p className="text-gray-700">{task.description}</p>
                        <div className="mt-3 flex justify-end gap-3">
                          <button onClick={() => handleEdit(task)} className="p-2 px-4 bg-blue-500 text-white rounded-lg text-sm">
                            Edit
                          </button>
                          <button onClick={() => handleDelete(task._id)} className="p-2 px-4 bg-red-500 text-white rounded-lg text-sm">
                            Delete
                          </button>
                        </div>
                      </div>
                    </SortableItem>
                  ))}
              </SortableContext>
            </div>
          ))}
        </div>
        <DragOverlay>{activeTask ? <div className="bg-white p-4 rounded-lg shadow-md">{activeTask.title}</div> : null}</DragOverlay>
      </DndContext>

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
                <textarea
                  type="text"
                  placeholder="Description"
                  value={task.description}
                  onChange={(e) => setTask({ ...task, description: e.target.value })}
                  className="w-full p-2 border rounded mb-2"
                ></textarea>
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
                  <button type="submit" className="p-2 px-6 bg-blue-500 text-white rounded">
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