import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Dialog, Transition } from "@headlessui/react";
import { Fragment } from "react";
import { DndContext, closestCenter, useSensor, useSensors, PointerSensor, KeyboardSensor } from "@dnd-kit/core";
import { arrayMove, SortableContext, sortableKeyboardCoordinates, verticalListSortingStrategy } from "@dnd-kit/sortable";
import { SortableItem } from "./SortableItem";

const TaskManagement = () => {
  const queryClient = useQueryClient();
  const [task, setTask] = useState({ title: "", description: "", category: "To-Do" });
  const [isOpen, setIsOpen] = useState(false);

  const { data: tasks = [], isLoading } = useQuery({
    queryKey: ["tasks"],
    queryFn: async () => {
      const { data } = await axios.get("http://localhost:5000/tasks");
      return data;
    },
  });

  const mutation = useMutation({
    mutationFn: (newTask) => axios.post("http://localhost:5000/tasks", newTask),
    onSuccess: () => {
      queryClient.invalidateQueries(["tasks"]);
      setIsOpen(false);
      setTask({ title: "", description: "", category: "To-Do" });
      toast.success("Task added successfully!");
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    mutation.mutate(task);
  };

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates })
  );

  if (isLoading) return <div>Loading...</div>;

  return (
    <div className="p-8">
      <h1 className="text-3xl text-center font-bold mb-4">Task Management</h1>
      <button onClick={() => setIsOpen(true)} className="p-3 px-4 bg-blue-500 text-white text-xl font-bold rounded">
        Add Task
      </button>
      <DndContext sensors={sensors} collisionDetection={closestCenter}>
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
                        <p className="text-sm text-gray-500">Category: {task.category}</p>
                      </div>
                    </SortableItem>
                  ))}
              </SortableContext>
            </div>
          ))}
        </div>
      </DndContext>
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={() => setIsOpen(false)}>
          <div className="fixed inset-0 bg-black bg-opacity-50" />
          <div className="fixed inset-0 flex items-center justify-center">
            <Dialog.Panel className="bg-white p-6 rounded-lg shadow-lg w-96">
              <Dialog.Title className="text-lg font-bold">Add Task</Dialog.Title>
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
                <button type="submit" className="p-2 px-6 bg-blue-500 text-white rounded">Add</button>
              </form>
            </Dialog.Panel>
          </div>
        </Dialog>
      </Transition>
    </div>
  );
};

export default TaskManagement;
