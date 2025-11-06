import React, { useContext, useState } from "react";
import {
  Routes,
  Route,
  Link,
  useNavigate,
  useLocation,
} from "react-router-dom";
import HomePage from "./Pages/HomePage";
import CreatePage from "./Pages/CreatePage";
import EditPage from "./Pages/EditPage";
import NoteDetailPage from "./Pages/NoteDetailPage";
import LoginPage from "./Pages/LoginPage";
import RegisterPage from "./Pages/RegisterPage";
import { AuthContext } from "./context/AuthContext";

function App() {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const navLinks = user
    ? [
        { to: "/", label: "Home" },
        { to: "/create", label: "Create" },
      ]
    : [
        { to: "/login", label: "Login" },
        { to: "/register", label: "Register" },
      ];

  const isActive = (path) => location.pathname === path;

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100">
      {/* Navbar */}
      <nav className="bg-gray-900/90 backdrop-blur-md border-b border-gray-700 sticky top-0 z-50 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex-shrink-0">
              <Link
                to="/"
                className="flex items-center space-x-2 text-2xl font-bold text-blue-400 hover:text-blue-300 transition"
              >
                <span>NoteKeeper</span>
              </Link>
            </div>

            <div className="hidden md:flex items-center space-x-1">
              {navLinks.map((link) => (
                <Link
                  key={link.to}
                  to={link.to}
                  className={`px-3 py-1 text-sm font-medium transition-colors
    ${
      isActive(link.to)
        ? "text-blue-400 border-b-2 border-blue-400"
        : "text-gray-300 hover:text-blue-400"
    }`}
                >
                  {link.label}
                </Link>
              ))}

              {user && (
                <>
                  <div className="flex items-center space-x-3 pl-4 border-l border-gray-700">
                    <span className="text-sm text-gray-400 font-medium">
                      Hi, {user.name.split(" ")[0]}
                    </span>
                    <button
                      onClick={handleLogout}
                      className="px-4 py-2 bg-gradient-to-r from-red-700 to-red-800 text-white text-sm font-medium rounded-lg shadow hover:from-red-600 hover:to-red-700 transform hover:-translate-y-0.5 transition-all duration-200 flex items-center gap-1.5"
                    >
                      <svg
                        className="h-4 w-4"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                        />
                      </svg>
                      Logout
                    </button>
                  </div>
                </>
              )}
            </div>

            <div className="md:hidden">
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2 rounded-lg text-gray-400 hover:bg-gray-800 transition"
              >
                {mobileMenuOpen ? (
                  <svg
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                ) : (
                  <svg
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4 6h16M4 12h16M4 18h16"
                    />
                  </svg>
                )}
              </button>
            </div>
          </div>
        </div>

        {mobileMenuOpen && (
          <div className="md:hidden bg-gray-800 border-t border-gray-700">
            <div className="px-4 pt-2 pb-3 space-y-1">
              {navLinks.map((link) => (
                <Link
                  key={link.to}
                  to={link.to}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`block px-3 py-2 rounded-md text-base font-medium
                    ${
                      isActive(link.to)
                        ? "bg-blue-900/50 text-blue-300"
                        : "text-gray-300 hover:bg-gray-700"
                    }`}
                >
                  {link.label}
                </Link>
              ))}

              {user && (
                <>
                  <div className="pt-3 border-t border-gray-700">
                    <span className="text-sm text-gray-400 font-medium">
                      Hi, {user.name.split(" ")[0]}
                    </span>
                    <button
                      onClick={() => {
                        handleLogout();
                        setMobileMenuOpen(false);
                      }}
                      className="w-full mt-1 px-3 py-2 bg-red-700 text-white rounded-md text-base font-medium hover:bg-red-600 transition"
                    >
                      Logout
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>
        )}
      </nav>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/create" element={<CreatePage />} />
          <Route path="/edit/:id" element={<EditPage />} />
          <Route path="/note/:id" element={<NoteDetailPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
