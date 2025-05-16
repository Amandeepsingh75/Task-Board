import React, { useState } from "react";

type Props = {
  setShowPopup: (show: boolean) => void;
  addTask: (title: string, description: string, column: "todo" | "inprogress" | "done") => void;
};

const Popup: React.FC<Props> = ({ setShowPopup, addTask }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [column, setColumn] = useState<"todo" | "inprogress" | "done">("todo");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (title.trim().length === 0) return alert("Title cannot be empty");

    addTask(title, description, column);

    setTitle("");
    setDescription("");
    setShowPopup(false);
  };

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50"
      onClick={() => setShowPopup(false)}
    >
      <form
        onSubmit={handleSubmit}
        className="bg-white rounded-lg p-6 w-96"
        onClick={e => e.stopPropagation()}
      >
        <h2 className="text-xl font-semibold mb-4">Add New Task</h2>

        <label className="block mb-2 font-semibold" htmlFor="title">
          Title
        </label>
        <input
          id="title"
          type="text"
          value={title}
          onChange={e => setTitle(e.target.value)}
          className="border rounded px-3 py-2 w-full mb-4"
          required
          autoFocus
        />

        <label className="block mb-2 font-semibold" htmlFor="description">
          Description (optional)
        </label>
        <textarea
          id="description"
          value={description}
          onChange={e => setDescription(e.target.value)}
          className="border rounded px-3 py-2 w-full mb-4 resize-none"
          rows={3}
        />

        <label className="block mb-2 font-semibold" htmlFor="column">
          Column
        </label>
        <select
          id="column"
          value={column}
          onChange={e => setColumn(e.target.value as "todo" | "inprogress" | "done")}
          className="border rounded px-3 py-2 w-full mb-6"
        >
          <option value="todo">Todo</option>
          <option value="inprogress">In Progress</option>
          <option value="done">Done</option>
        </select>

        <div className="flex justify-end gap-4">
          <button
            type="button"
            className="px-4 py-2 rounded bg-gray-300 hover:bg-gray-400"
            onClick={() => setShowPopup(false)}
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-4 py-2 rounded bg-blue-700 text-white hover:bg-blue-800"
          >
            Add Task
          </button>
        </div>
      </form>
    </div>
  );
};

export default Popup;
