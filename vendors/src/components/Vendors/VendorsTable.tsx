import { useVendors } from "../../hooks/vendors/useVendors";
import { useDeleteVendor } from "../../hooks/vendors/useDeleteVendor";
import { useState } from "react";
import AddVendorModal from "./AddVendorModal";

const VendorsTable = () => {
  const { vendors, loading } = useVendors();
  const { deleteVendor } = useDeleteVendor();
  const [showModal, setShowModal] = useState(false);

  console.log("Vendors data:", vendors);
  console.log("Loading state:", loading);
  console.log("Vendors length:", vendors?.length);
  console.log("First vendor structure:", vendors?.[0]);

  if (loading) {
    return (
      <div className="p-8">
        <div className="flex items-center justify-center h-64">
          <p className="text-xl text-gray-600">Loading vendors...</p>
        </div>
      </div>
    );
  }

  const handleDelete = async (vendorName: string) => {
    if (!vendorName) {
      alert("Invalid vendor name");
      return;
    }

    if (!confirm("Are you sure you want to delete this vendor?")) return;

    console.log("Attempting to delete vendor with name:", vendorName);
    const success = await deleteVendor(vendorName);

    if (success) {
      alert("Vendor deleted successfully");
      window.location.reload();
    } else {
      alert("Failed to delete vendor. Please check the console for details.");
    }
  };

  const handleAddVendor = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleSuccess = () => {
    window.location.reload();
  };

  if (!vendors || vendors.length === 0) {
    return (
      <div className="p-8">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">Vendors</h1>
          <button
            onClick={handleAddVendor}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-semibold transition"
          >
            + Add Vendor
          </button>
        </div>
        <div className="flex items-center justify-center h-64 bg-white rounded-lg border">
          <p className="text-xl text-gray-600">No vendors found</p>
        </div>

        <AddVendorModal
          isOpen={showModal}
          onClose={handleCloseModal}
          onSuccess={handleSuccess}
        />
      </div>
    );
  }

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold">Vendors</h1>
          <p className="text-gray-600 mt-1">Total: {vendors.length} vendors</p>
        </div>
        <button
          onClick={handleAddVendor}
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-semibold transition"
        >
          + Add Vendor
        </button>
      </div>

      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Name
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Email
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Phone
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Notes
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {vendors.map((vendor) => {
                console.log("Rendering vendor:", vendor);
                console.log("Vendor ID:", vendor.id);
                console.log("All vendor keys:", Object.keys(vendor));
                return (
                  <tr
                    key={vendor.id || Math.random()}
                    className="hover:bg-gray-50"
                  >
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="font-medium text-gray-900">
                        {vendor.name}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">
                        {vendor.email || "-"}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">
                        {vendor.phone || "-"}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm text-gray-900 max-w-xs truncate">
                        {vendor.notes || "-"}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <button
                        onClick={() => handleDelete(vendor.name)}
                        className="text-red-600 hover:text-red-900 transition"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      <AddVendorModal
        isOpen={showModal}
        onClose={handleCloseModal}
        onSuccess={handleSuccess}
      />
    </div>
  );
};

export default VendorsTable;
