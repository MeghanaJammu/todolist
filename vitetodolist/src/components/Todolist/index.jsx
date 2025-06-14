import React, { useState, useEffect } from "react";
import { MdDelete } from "react-icons/md";
import { IoCheckmarkDone } from "react-icons/io5";

export default function ToDoList() {
  const [tasks, setTasks] = useState(() => {
    const saved = localStorage.getItem("tasks");
    return saved ? JSON.parse(saved) : [];
  });
  const [input, setInput] = useState("");
  const [filter, setFilter] = useState("all");
  const [sortOrder, setSortOrder] = useState("newest");

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  const addTask = () => {
    const trimmed = input.trim();
    if (!trimmed) return;
    const newTask = { id: Date.now(), text: trimmed, completed: false };
    setTasks([...tasks, newTask]);
    setInput("");
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  const toggleTask = (id) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const filteredTasks = tasks.filter((task) => {
    if (filter === "completed") return task.completed;
    if (filter === "active") return !task.completed;
    return true;
  });

  const sortedTasks = [...filteredTasks].sort((a, b) => {
    if (sortOrder === "newest") return b.id - a.id;
    if (sortOrder === "oldest") return a.id - b.id;
    if (sortOrder === "az") return a.text.localeCompare(b.text);
    if (sortOrder === "za") return b.text.localeCompare(a.text);
    if (sortOrder === "completed") return b.completed - a.completed;
    return 0;
  });

  return (
    <div
      className="h-screen bg-cover bg-center flex items-center justify-center"
      style={{
        backgroundImage: `url('/todoforest.jpg')`,
      }}
    >
      <div className="bg-[#38144D]/40 backdrop-blur-sm rounded-xl shadow-lg p-6 pb-10 pt-6 w-[90%] max-w-md mt-10">
        <h1 className="text-white font-bold text-center text-xl mb-4">
          Get Your "TO DO LIST" Done
        </h1>

        <div className="flex justify-between items-center mb-4 text-white text-sm gap-2 flex-wrap">
          <div className="flex gap-2">
            <button
              className={`px-2 py-1 rounded ${
                filter === "all" ? "bg-purple-700" : "bg-purple-900"
              }`}
              onClick={() => setFilter("all")}
            >
              All
            </button>
            <button
              className={`px-2 py-1 rounded ${
                filter === "active" ? "bg-purple-700" : "bg-purple-900"
              }`}
              onClick={() => setFilter("active")}
            >
              Active
            </button>
            <button
              className={`px-2 py-1 rounded ${
                filter === "completed" ? "bg-purple-700" : "bg-purple-900"
              }`}
              onClick={() => setFilter("completed")}
            >
              Completed
            </button>
          </div>

          <select
            className="bg-purple-900 px-2 py-1 rounded text-white"
            value={sortOrder}
            onChange={(e) => setSortOrder(e.target.value)}
          >
            <option value="newest">Newest</option>
            <option value="oldest">Oldest</option>
            <option value="az">A → Z</option>
            <option value="za">Z → A</option>
            <option value="completed">Completed First</option>
          </select>
        </div>

        <div className="flex items-center gap-2 mb-6">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Enter what you want to do here"
            className="flex-grow px-4 py-2 rounded bg-white placeholder-purple text-purple font-medium"
          />
          <button
            onClick={addTask}
            className="px-4 py-2 bg-purple-900 text-white rounded font-semibold"
          >
            Add
          </button>
        </div>

        <div className="space-y-4">
          {sortedTasks.map((task, index) => (
            <div
              key={task.id}
              className="flex items-center justify-between bg-[#38144D]/60 text-white px-4 py-2 rounded"
            >
              <div
                className={`flex-1 font-semibold ${
                  task.completed ? "line-through opacity-50" : ""
                }`}
              >
                {index + 1}. {task.text}
              </div>
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => toggleTask(task.id)}
                  className="text-white hover:text-green-600 text-xl"
                >
                  <IoCheckmarkDone />
                </button>
                <button
                  onClick={() => deleteTask(task.id)}
                  className="text-white hover:text-red-500 text-xl"
                >
                  <MdDelete />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
