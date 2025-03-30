import React, { useState } from "react";
const AddHouse = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState<{
    address: string;
    price: string;
    beds: string;
    baths: string;
    sqft: string;
    image: File | null;
  }>({
    address: "",
    price: "",
    beds: "",
    baths: "",
    sqft: "",
    image: null,
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type } = e.target;
    const newValue = type === "number" && value === "" ? "" : value;
    setFormData((prev) => ({ ...prev, [name]: newValue }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setFormData((prev) => ({ ...prev, image: file }));
  };

  const handleSubmit = () => {
    console.log("Form Data:", formData);
    setIsModalOpen(false);
  };

  return (
    <div>
      <button
        className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition duration-300"
        onClick={() => setIsModalOpen(true)}
      >
        Add House
      </button>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-11/12 max-w-md shadow-lg">
            <h2 className="text-2xl font-bold mb-4 text-black">Add House</h2>
            <form className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-black">Address</label>
                <input
                  type="text"
                  name="address"
                  value={formData.address}
                  onChange={handleInputChange}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 text-black"
                  placeholder="Enter address"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-black">Price</label>
                <input
                  type="number"
                  name="price"
                  value={formData.price}
                  onChange={handleInputChange}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 text-black"
                  placeholder="Enter price"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-black">Beds</label>
                <input
                  type="number"
                  name="beds"
                  value={formData.beds}
                  onChange={handleInputChange}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 text-black"
                  placeholder="Enter number of beds"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-black">Baths</label>
                <input
                  type="number"
                  name="baths"
                  value={formData.baths}
                  onChange={handleInputChange}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 text-black"
                  placeholder="Enter number of baths"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-black">Square Footage</label>
                <input
                  type="number"
                  name="sqft"
                  value={formData.sqft}
                  onChange={handleInputChange}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 text-black"
                  placeholder="Enter square footage"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-black">Upload Image (PNG)</label>
                <input
                  type="file"
                  accept="image/png"
                  onChange={handleFileChange}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 text-black"
                />
              </div>
            </form>

            <div className="mt-6 flex justify-end space-x-4">
              <button
                className="bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600"
                onClick={() => setIsModalOpen(false)}
              >
                Cancel
              </button>
              <button
                className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
                onClick={handleSubmit}
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AddHouse;
