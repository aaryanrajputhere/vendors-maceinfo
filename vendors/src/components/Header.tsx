import { Link, useLocation } from "react-router-dom";

export default function Header() {
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  return (
    <header className="bg-white shadow-sm border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="text-xl font-bold text-gray-900">
            Vendors & Materials
          </Link>

          <nav className="flex space-x-8">
            <Link
              to="/materials"
              className={`px-3 py-2 rounded-md text-sm font-medium transition ${
                isActive("/materials")
                  ? "bg-blue-100 text-blue-700"
                  : "text-gray-700 hover:bg-gray-100"
              }`}
            >
              Materials
            </Link>
            <Link
              to="/vendors"
              className={`px-3 py-2 rounded-md text-sm font-medium transition ${
                isActive("/vendors")
                  ? "bg-blue-100 text-blue-700"
                  : "text-gray-700 hover:bg-gray-100"
              }`}
            >
              Vendors
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
}
