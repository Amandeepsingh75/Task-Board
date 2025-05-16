import Todo from "@/components/Todo";
import Progress from "@/components/Progress";
import Done from "@/components/Done";
import Popup from "@/components/Popup";
import { useEffect, useState } from "react";
import socket from "../lib/socket";


type Task = {
  title: string;
  description: string;
};

type Board = {
  todo: Task[];
  inprogress: Task[];
  done: Task[];
};

export default function Home() {
  const [board, setBoard] = useState<Board>({
    todo: [],
    inprogress: [],
    done: [],
  });

  const [showPopup, setShowPopup] = useState(false);

  const addTask = (title: string, description: string, column: keyof Board) => {
    setShowPopup(false);
    if (title.trim().length <= 0) return;

    const newTask = { title, description };
    const newBoard = {
      ...board,
      [column]: [...board[column], newTask],
    };

    updateBoard(newBoard);
  };

  const deleteTask = (index: number, column: keyof Board) => {
    const newBoard = {
      ...board,
      [column]: board[column].filter((_, i) => i !== index),
    };

    updateBoard(newBoard);
  };

  const onDrop = (e: React.DragEvent, toColumn: keyof Board) => {
    e.preventDefault();
    const { index, fromColumn }: { index: number; fromColumn: keyof Board } = JSON.parse(
      e.dataTransfer.getData("text/plain")
    );

    const draggedTask = board[fromColumn][index];

    const newBoard = {
      ...board,
      [fromColumn]: board[fromColumn].filter((_, i) => i !== index),
      [toColumn]: [...board[toColumn], draggedTask],
    };

    updateBoard(newBoard);
  };


  const onDragStart = (e: React.DragEvent, index: number, fromColumn: keyof Board) => {
    e.dataTransfer.setData("text/plain", JSON.stringify({ index, fromColumn }));
  };

  useEffect(() => {
    socket.on("board_state", (newBoard: Board) => {
      setBoard(newBoard);
    });

    return () => {
      socket.off("board_state");
    };
  }, []);

  const updateBoard = (newBoard: Board) => {
    setBoard(newBoard);
    socket.emit("update_board", newBoard);
  };
  return (
    <>
      <div className="max-w-screen-xl mx-auto pt-12">
        <div className="flex justify-end">
          <button
            onClick={() => setShowPopup(!showPopup)}
            className="bg-blue-900 text-white p-2 rounded-md"
          >
            Add Task
          </button>
        </div>

        <div className="grid grid-cols-3 gap-8 my-8">
          <div onDragOver={e => e.preventDefault()} onDrop={e => onDrop(e, "todo")}>
            <Todo todoArr={board.todo} deleteTask={deleteTask} onDragstart={onDragStart} />
          </div>
          <div onDragOver={e => e.preventDefault()} onDrop={e => onDrop(e, "inprogress")}>
            <Progress inProgress={board.inprogress} deleteTask={deleteTask} onDragstart={onDragStart} />
          </div>
          <div onDragOver={e => e.preventDefault()} onDrop={e => onDrop(e, "done")}>
            <Done done={board.done} deleteTask={deleteTask} onDragstart={onDragStart} />
          </div>
        </div>
      </div>

      {showPopup && <Popup setShowPopup={setShowPopup} addTask={addTask} />}
    </>
  );
}
