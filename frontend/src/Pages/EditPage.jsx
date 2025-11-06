import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../api/api";

const EditPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [error, setError] = useState("");
  const [updating, setUpdating] = useState(false);

  useEffect(() => {
    const fetchNote = async () => {
      try {
        const res = await api.get(`/notes/${id}`);
        setTitle(res.data.title);
        setContent(res.data.content);
      } catch (err) {
        setError("Failed to load note.");
      }
    };
    fetchNote();
  }, [id]);

  const handleUpdate = async (e) => {
    e.preventDefault();
    setUpdating(true);
    try {
      await api.put(`/notes/${id}`, { title: title.trim(), content: content.trim() });
      navigate("/");
    } catch (err) {
      setError(err.response?.data?.message || "Failed to update note.");
    } finally {
      setUpdating(false);
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-900 p-6">
      <div className="w-full max-w-2xl bg-gray-800 rounded-2xl shadow-2xl p-8 border border-gray-700 transform transition-all hover:scale-[1.01]">
        <h2 className="text-3xl font-extrabold text-center text-blue-400 mb-6">
          Edit Note
        </h2>

        {error && (
          <div className="bg-red-900/50 border border-red-800 text-red-300 px-4 py-3 rounded-lg mb-5 text-center font-medium flex items-center justify-center gap-2">
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
            </svg>
            {error}
          </div>
        )}

        <form onSubmit={handleUpdate} className="space-y-6">
          <div>
            <label className="block text-gray-300 font-semibold mb-2">Title</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full bg-gray-700 border border-gray-600 text-gray-100 placeholder-gray-400 px-4 py-3 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:outline-none transition-all"
              required
            />
          </div>

          <div>
            <label className="block text-gray-300 font-semibold mb-2">Content</label>
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              rows="10"
              className="w-full bg-gray-700 border border-gray-600 text-gray-100 placeholder-gray-400 px-4 py-3 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:outline-none transition-all resize-none"
              required
            />
          </div>

          <button
            type="submit"
            disabled={updating}
            className={`w-full py-3 text-lg font-semibold rounded-lg transition-all duration-200 shadow-md flex items-center justify-center gap-2
              ${updating ? "bg-blue-800 cursor-not-allowed" : "bg-gradient-to-r from-blue-700 to-blue-800 hover:from-blue-600 hover:to-blue-700 text-white hover:shadow-lg transform hover:-translate-y-0.5"}`}
          >
            {updating ? "Updating..." : "Update Note"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditPage;