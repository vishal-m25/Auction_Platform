import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const initialFormData = {
  FirstName: "",
  LastName: "",
  email: "",
  ProductName: "",
  Description: "",
  Category: "Electronics",
  Image: null,
  Price: "",
  DateTime: "",
};

export default function Owner() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState(initialFormData);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "Image" && files.length > 0) {
      setFormData((prev) => ({ ...prev, [name]: files[0] }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    for (const key in formData) {
      data.append(key, formData[key]);
    }

    try {
      const token = localStorage.getItem("token");
      const response = await fetch("http://localhost:8000/api/auth/sell", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: data,
      });
      if (response.ok) {
        alert("Auction Placed Successfully!");
        setFormData(initialFormData); // Reset the form
        navigate("/buy");
      } else {
        alert("Failed to place auction");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div>
      <div className="flex items-center justify-center min-h-screen mt-20">
        <div className="max-w-4xl w-full px-4 py-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900">
              Sell Your Item
            </h2>
          </div>
          <form onSubmit={handleSubmit}>
            <div className="bg-slate-50 border-gray-200 rounded shadow-md px-6 py-8">
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                <div>
                  <label
                    htmlFor="FirstName"
                    className="block text-sm font-medium text-gray-900"
                  >
                    First name
                  </label>
                  <input
                    type="text"
                    name="FirstName"
                    value={formData.FirstName}
                    onChange={handleChange}
                    autoComplete="given-name"
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  />
                </div>
                <div>
                  <label
                    htmlFor="LastName"
                    className="block text-sm font-medium text-gray-900"
                  >
                    Last name
                  </label>
                  <input
                    type="text"
                    name="LastName"
                    value={formData.LastName}
                    onChange={handleChange}
                    autoComplete="family-name"
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  />
                </div>
                <div className="sm:col-span-2">
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-gray-900"
                  >
                    Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    autoComplete="email"
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  />
                </div>
                <div className="sm:col-span-2">
                  <label
                    htmlFor="ProductName"
                    className="block text-sm font-medium text-gray-900"
                  >
                    Product Name
                  </label>
                  <input
                    type="text"
                    name="ProductName"
                    value={formData.ProductName}
                    onChange={handleChange}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  />
                </div>
                <div className="sm:col-span-2">
                  <label
                    htmlFor="Description"
                    className="block text-sm font-medium text-gray-900"
                  >
                    Product Description
                  </label>
                  <input
                    type="text"
                    name="Description"
                    value={formData.Description}
                    onChange={handleChange}
                    className="mt-1 block w-full h-32 px-3 py-3 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  />
                </div>
                <div>
                  <label
                    htmlFor="Category"
                    className="block text-sm font-medium text-gray-900"
                  >
                    Category
                  </label>
                  <select
                    name="Category"
                    value={formData.Category}
                    onChange={handleChange}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  >
                    <option>Electronics</option>
                    <option>Antiques</option>
                    <option>Car</option>
                  </select>
                </div>
                <div>
                  <label
                    htmlFor="Image"
                    className="block text-sm font-medium text-gray-900"
                  >
                    Image
                  </label>
                  <input
                    type="file"
                    name="Image"
                    accept="image/*"
                    onChange={handleChange}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  />
                </div>
                <div>
                  <label
                    htmlFor="Price"
                    className="block text-sm font-medium text-gray-900"
                  >
                    Price
                  </label>
                  <input
                    type="number"
                    name="Price"
                    value={formData.Price}
                    onChange={handleChange}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  />
                </div>
                <div>
                  <label
                    htmlFor="DateTime"
                    className="block text-sm font-medium text-gray-900"
                  >
                    Date and Time
                  </label>
                  <input
                    type="datetime-local"
                    name="DateTime"
                    value={formData.DateTime}
                    onChange={handleChange}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  />
                </div>
                <button
                  className="ml-80 items-center justify-center w-44 mt-4 rounded-md bg-black text-white px-4 py-3 font-semibold text-sm leading-5 hover:bg-black/80"
                  type="submit"
                >
                  Sell
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
