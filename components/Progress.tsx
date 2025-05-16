import React from "react";
import { Trash2 } from "lucide-react";

type Task = {
  title: string;
  description: string;
};

type Props = {
  inProgress: Task[];
  deleteTask: (index: number, column: "inprogress") => void;
  onDragstart: (e: React.DragEvent, index: number, column: "inprogress") => void;
};

const Progress: React.FC<Props> = ({ inProgress, deleteTask, onDragstart }) => {
  return (
    <div className="border border-gray-300 p-6 h-[80vh] overflow-y-auto">
      <div className="text-xl font-semibold border-b pb-2">In Progress</div>

      {inProgress.length === 0 && (
        <p className="text-gray-400 mt-4">No tasks in progress</p>
      )}

      {inProgress.map((task, index) => (
        <div
          key={index}
          draggable
          onDragStart={(e) => onDragstart(e, index, "inprogress")}
          className="my-4 border p-4 flex items-center justify-between bg-white shadow-sm rounded-md hover:shadow-md transition-shadow"
        >
          <div className="w-full pr-4">
            <div>
              <span className="font-semibold">Title:</span> {task.title}
            </div>
            <div>
              <span className="font-semibold">Description:</span> {task.description}
            </div>
          </div>
          <button
            onClick={() => deleteTask(index, "inprogress")}
            className="cursor-pointer hover:scale-110 transition-transform"
          >
            <Trash2 color="red" />
          </button>
        </div>
      ))}
    </div>
  );
};

export default Progress;
