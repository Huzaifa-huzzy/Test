import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/api";

const CreatePage = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [error, setError] = useState("");
  const [saving, setSaving] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSaving(true);

    try {
      await api.post("/notes", { title: title.trim(), content: content.trim() });
      navigate("/");
    } catch (err) {
      setError(err.response?.data?.message || "Failed to create note.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-900 p-6">
      <div className="w-full max-w-2xl bg-gray-800 rounded-2xl shadow-2xl p-8 border border-gray-700 transform transition-all hover:scale-[1.01]">
        <h2 className="text-3xl font-extrabold text-center text-blue-400 mb-6">
          Create New Note
        </h2>

        {error && (
          <div className="bg-red-900/50 border border-red-800 text-red-300 px-4 py-3 rounded-lg mb-5 text-center font-medium flex items-center justify-center gap-2">
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
            </svg>
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-gray-300 font-semibold mb-2">Title</label>
            <input
              type="text"
              placeholder="Enter a title..."
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full bg-gray-700 border border-gray-600 text-gray-100 placeholder-gray-400 px-4 py-3 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:outline-none transition-all"
              required
              autoFocus
            />
          </div>

          <div>
            <label className="block text-gray-300 font-semibold mb-2">Content</label>
            <textarea
              placeholder="Write your note..."
              value={content}
              onChange={(e) => setContent(e.target.value)}
              rows="10"
              className="w-full bg-gray-700 border border-gray-600 text-gray-100 placeholder-gray-400 px-4 py-3 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:outline-none transition-all resize-none"
              required
            />
          </div>

          <div className="flex gap-3">
            <button
              type="submit"
              disabled={saving}
              className={`flex-1 py-3 text-lg font-semibold rounded-lg transition-all duration-200 shadow-md flex items-center justify-center gap-2
                ${saving ? "bg-blue-800 cursor-not-allowed" : "bg-gradient-to-r from-blue-700 to-blue-800 hover:from-blue-600 hover:to-blue-700 text-white hover:shadow-lg transform hover:-translate-y-0.5"}`}
            >
              {saving ? (
                <>
                  <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                  </svg>
                  Saving...
                </>
              ) : (
                <>
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4" />
                  </svg>
                  Save Note
                </>
              )}
            </button>
            <button
              type="button"
              onClick={() => navigate(-1)}
              className="px-6 py-3 text-gray-300 font-medium bg-gray-700 rounded-lg hover:bg-gray-600 transition-all"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreatePage;