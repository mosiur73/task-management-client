// // components/TaskModal.js
// import React from "react";
// import Modal from "react-modal";

// Modal.setAppElement("#root"); // Set the root element for accessibility

// const TaskModal = ({ isOpen, onRequestClose, task, setTask, onSubmit, isEditing }) => {
//   return (
//     <Modal
//       isOpen={isOpen}
//       onRequestClose={onRequestClose}
//       contentLabel="Task Modal"
//       className="modal"
//       overlayClassName="overlay"
//     >
//       <h2 className="text-2xl font-bold mb-4">{isEditing ? "Edit Task" : "Add Task"}</h2>
//       <form onSubmit={onSubmit}>
//         <input
//           type="text"
//           placeholder="Title"
//           value={task.title}
//           onChange={(e) => setTask({ ...task, title: e.target.value })}
//           className="p-2 border rounded w-full mb-4"
//           required
//         />
//         <input
//           type="text"
//           placeholder="Description"
//           value={task.description}
//           onChange={(e) => setTask({ ...task, description: e.target.value })}
//           className="p-2 border rounded w-full mb-4"
//         />
//         <select
//           value={task.category}
//           onChange={(e) => setTask({ ...task, category: e.target.value })}
//           className="p-2 border rounded w-full mb-4"
//         >
//           <option value="To-Do">To-Do</option>
//           <option value="In Progress">In Progress</option>
//           <option value="Done">Done</option>
//         </select>
//         <div className="flex justify-end">
//           <button
//             type="button"
//             onClick={onRequestClose}
//             className="p-2 bg-gray-500 text-white rounded mr-2"
//           >
//             Cancel
//           </button>
//           <button type="submit" className="p-2 bg-blue-500 text-white rounded">
//             {isEditing ? "Update Task" : "Add Task"}
//           </button>
//         </div>
//       </form>
//     </Modal>
//   );
// };

// export default TaskModal;