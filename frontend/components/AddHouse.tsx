import React, { useState } from "react";

const AddHouse = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    address: "",
    price: "",
    beds: "",
    baths: "",
    sqft: "",
    image: null,
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFormData({ ...formData, image: e.target.files[0] });
    }
  };

  const handleSubmit = () => {
    console.log("Form Data:", formData);
    // Add logic to handle form submission (e.g., send data to a server or blockchain)
    setIsModalOpen(false); // Close the modal after submission
  };

  return (
    <div>
      {/* Add House Button */}
      <button
        className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition duration-300"
        onClick={() => setIsModalOpen(true)}
      >
        Add House
      </button>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-11/12 max-w-md shadow-lg">
            <h2 className="text-2xl font-bold mb-4">Add House</h2>
            <form className="space-y-4">
              {/* Address */}
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Address
                </label>
                <input
                  type="text"
                  name="address"
                  value={formData.address}
                  onChange={handleInputChange}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2"
                  placeholder="Enter address"
                />
              </div>

              {/* Price */}
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Price
                </label>
                <input
                  type="number"
                  name="price"
                  value={formData.price}
                  onChange={handleInputChange}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2"
                  placeholder="Enter price"
                />
              </div>

              {/* Beds */}
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Beds
                </label>
                <input
                  type="number"
                  name="beds"
                  value={formData.beds}
                  onChange={handleInputChange}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2"
                  placeholder="Enter number of beds"
                />
              </div>

              {/* Baths */}
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Baths
                </label>
                <input
                  type="number"
                  name="baths"
                  value={formData.baths}
                  onChange={handleInputChange}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2"
                  placeholder="Enter number of baths"
                />
              </div>

              {/* Square Footage */}
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Square Footage
                </label>
                <input
                  type="number"
                  name="sqft"
                  value={formData.sqft}
                  onChange={handleInputChange}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2"
                  placeholder="Enter square footage"
                />
              </div>

              {/* PNG File */}
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Upload Image (PNG)
                </label>
                <input
                  type="file"
                  accept="image/png"
                  onChange={handleFileChange}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2"
                />
              </div>
            </form>

            {/* Buttons */}
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
