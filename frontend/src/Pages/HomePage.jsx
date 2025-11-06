import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../api/api";

const HomePage = () => {
  const [notes, setNotes] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    api
      .get("/notes")
      .then((res) => setNotes(res.data))
      .catch((err) => {
        if (err.response?.status === 401) {
          localStorage.removeItem("userInfo");
          navigate("/login");
        }
      });
  }, [navigate]);

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this note?")) return;
    try {
      await api.delete(`/notes/${id}`);
      setNotes((prev) => prev.filter((n) => n._id !== id));
    } catch (err) {
      alert("Failed to delete.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 py-8 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-100">
            My Notes
          </h1>
          <Link
            to="/create"
            className="inline-flex items-center gap-2 px-4 py-2 bg-blue-700 text-white font-medium text-sm rounded-full hover:bg-blue-600 transition-all shadow-md hover:shadow-lg"
          >
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 4v16m8-8H4"
              />
            </svg>
            New Note
          </Link>
        </div>

        {notes.length === 0 ? (
          <div className="text-center py-16">
            <div className="bg-gray-700 border-2 border-dashed rounded-xl w-24 h-24 mx-auto mb-4" />
            <p className="text-xl text-gray-400 font-medium">
              No notes yet. Create one!
            </p>
            <Link
              to="/create"
              className="mt-4 inline-block px-6 py-2 bg-blue-700 text-white rounded-lg hover:bg-blue-600 transition"
            >
              Create Note
            </Link>
          </div>
        ) : (
          <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            {notes.map((note) => (
              <div
                key={note._id}
                className="group bg-gray-800 rounded-xl shadow-sm hover:shadow-xl border border-gray-700 overflow-hidden transition-all duration-300 transform hover:-translate-y-1"
              >
                <Link to={`/note/${note._id}`} className="block p-5 pb-3">
                  <h3 className="text-xl font-bold text-gray-100 group-hover:text-blue-400 transition line-clamp-1">
                    {note.title || "Untitled"}
                  </h3>
                  <p className="mt-2 text-gray-400 line-clamp-2 text-sm leading-relaxed">
                    {note.content
                      ? note.content.slice(0, 120) +
                        (note.content.length > 120 ? "..." : "")
                      : "No content"}
                  </p>
                  <time className="text-xs text-gray-500 mt-3 block">
                    {new Date(note.updatedAt).toLocaleDateString(undefined, {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                    })}
                  </time>
                </Link>

                <div className="flex border-t border-gray-700">
                  <Link
                    to={`/edit/${note._id}`}
                    className="flex-1 px-4 py-3 text-center text-sm font-medium text-blue-400 hover:bg-gray-700 transition"
                  >
                    Edit
                  </Link>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDelete(note._id);
                    }}
                    className="flex-1 px-4 py-3 text-center text-sm font-medium text-red-400 hover:bg-gray-700 transition"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default HomePage;
