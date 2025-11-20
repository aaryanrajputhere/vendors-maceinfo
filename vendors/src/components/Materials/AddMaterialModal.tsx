import { useState } from "react";
import { useAddMaterial } from "../../hooks/materials/useAddMaterial";
import { useImageUpload } from "../../hooks/drive/useImageUpload";
import { useVendors } from "../../hooks/vendors/useVendors";
import type { Material } from "../../types/material";

interface AddMaterialModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

const AddMaterialModal = ({
  isOpen,
  onClose,
  onSuccess,
}: AddMaterialModalProps) => {
  const { addMaterial } = useAddMaterial();
  const { uploadImage, loading: uploadingImage } = useImageUpload();
  const { vendors, loading: loadingVendors } = useVendors();
  const [formData, setFormData] = useState({
    itemName: "",
    category: "",
    size: "",
    unit: "",
    price: "",
    vendors: "",
    image: "",
  });
  const [selectedVendors, setSelectedVendors] = useState<string[]>([]);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string>("");

  if (!isOpen) return null;

  const handleCloseModal = () => {
    setFormData({
      itemName: "",
      category: "",
      size: "",
      unit: "",
      price: "",
      vendors: "",
      image: "",
    });
    setSelectedVendors([]);
    setImageFile(null);
    setImagePreview("");
    onClose();
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      let imageUrl = formData.image;

      // Upload image if file is selected
      if (imageFile) {
        // Note: materialId will be undefined for new materials, backend will handle it
        imageUrl = await uploadImage(imageFile, undefined, formData.itemName);
      }

      // Convert selected vendors array to comma-separated string
      const vendorsString = selectedVendors.join(" , ");

      const materialData = {
        itemName: formData.itemName,
        category: formData.category,
        size: formData.size,
        unit: formData.unit,
        price: parseFloat(formData.price),
        vendors: vendorsString || null,
        image: imageUrl || null,
      };

      await addMaterial(materialData as unknown as Material);
      alert("Material added successfully!");
      handleCloseModal();
      onSuccess();
    } catch (err) {
      console.error("Error adding material:", err);
      alert("Failed to add material. Please try again.");
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-8 max-w-md w-full mx-4 max-h-[90vh] overflow-y-auto">
        <h2 className="text-2xl font-bold mb-6">Add New Material</h2>
        <form onSubmit={handleSubmit}>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Item Name *
              </label>
              <input
                type="text"
                name="itemName"
                value={formData.itemName}
                onChange={handleInputChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Category *
              </label>
              <input
                type="text"
                name="category"
                value={formData.category}
                onChange={handleInputChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Size *
                </label>
                <input
                  type="text"
                  name="size"
                  value={formData.size}
                  onChange={handleInputChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Unit *
                </label>
                <input
                  type="text"
                  name="unit"
                  value={formData.unit}
                  onChange={handleInputChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Price *
              </label>
              <input
                type="number"
                step="0.01"
                name="price"
                value={formData.price}
                onChange={handleInputChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Vendors
              </label>
              {loadingVendors ? (
                <p className="text-sm text-gray-500">Loading vendors...</p>
              ) : (
                <div className="space-y-2">
                  <select
                    onChange={(e) => {
                      const vendor = e.target.value;
                      if (vendor && !selectedVendors.includes(vendor)) {
                        setSelectedVendors([...selectedVendors, vendor]);
                      }
                      e.target.value = "";
                    }}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="">Select vendors (optional)</option>
                    {vendors.map((vendor) => (
                      <option key={vendor.name} value={vendor.name}>
                        {vendor.name}
                      </option>
                    ))}
                  </select>
                  {selectedVendors.length > 0 && (
                    <div className="flex flex-wrap gap-2">
                      {selectedVendors.map((vendor) => (
                        <span
                          key={vendor}
                          className="inline-flex items-center gap-1 px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm"
                        >
                          {vendor}
                          <button
                            type="button"
                            onClick={() =>
                              setSelectedVendors(
                                selectedVendors.filter((v) => v !== vendor)
                              )
                            }
                            className="hover:text-blue-900 font-bold"
                          >
                            ×
                          </button>
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Image
              </label>
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              {imagePreview && (
                <img
                  src={imagePreview}
                  alt="Preview"
                  className="mt-2 h-20 w-20 object-cover rounded"
                />
              )}
              <p className="text-xs text-gray-500 mt-1">Or provide URL below</p>
              <input
                type="text"
                name="image"
                value={formData.image}
                onChange={handleInputChange}
                placeholder="https://example.com/image.jpg"
                className="w-full px-3 py-2 mt-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>

          <div className="flex gap-3 mt-6">
            <button
              type="button"
              onClick={handleCloseModal}
              className="flex-1 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={uploadingImage}
              className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {uploadingImage ? "Uploading..." : "Add Material"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddMaterialModal;
