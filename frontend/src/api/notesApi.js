import axios from "axios";

const API = axios.create({
  baseURL: "/api/notes", // backend URL
});

// Get all notes
export const getNotes = () => API.get("/");

// Create a new note
export const createNote = (data) => API.post("/", data);

// Update note
export const updateNote = (id, data) => API.put(`/${id}`, data);

// Delete note
export const deleteNote = (id) => API.delete(`/${id}`);
