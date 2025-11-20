import { useNavigate } from "react-router-dom";

export default function HomePage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-8">
      <div className="max-w-4xl w-full">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Vendors & Materials Management
          </h1>
          <p className="text-xl text-gray-600">
            Choose where you'd like to go
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <button
            onClick={() => navigate("/materials")}
            className="bg-white p-8 rounded-lg shadow-lg hover:shadow-xl transition-all transform hover:scale-105"
          >
            <div className="text-center">
              <div className="text-5xl mb-4">📦</div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">
                Materials
              </h2>
              <p className="text-gray-600">
                Manage your materials inventory
              </p>
            </div>
          </button>

          <button
            onClick={() => navigate("/vendors")}
            className="bg-white p-8 rounded-lg shadow-lg hover:shadow-xl transition-all transform hover:scale-105"
          >
            <div className="text-center">
              <div className="text-5xl mb-4">🏢</div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">
                Vendors
              </h2>
              <p className="text-gray-600">
                Manage your vendors list
              </p>
            </div>
          </button>
        </div>
      </div>
    </div>
  );
}
