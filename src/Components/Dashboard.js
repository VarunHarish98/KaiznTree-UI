import React, { useState, useEffect } from "react";
import { heading, subHeading, totalCategory, totalItems } from "../constants";
import redColorImage from "../images/red-color.png";
import greenColorImage from "../images/green-color.png";
import amazonImage from "../images/amazon.png"; // Import Amazon image
import twitterImage from "../images/twitter.jpg"; // Import Twitter image
import mockData from "../mockData.json";

const Dashboard = () => {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortConfig, setSortConfig] = useState({ key: null, direction: "" });
  const [totalCategoryCount, setTotalCategoryCount] = useState(0);
  const [totalItemCount, setTotalItemCount] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const [newItemFields, setNewItemFields] = useState({
    sku: "",
    name: "",
    tags: "",
    category: "",
    total_stock: "",
    available_stock: "",
  });

  useEffect(() => {
    fetchData();
  });

  const fetchData = async () => {
    try {
      const response = await fetch("http://3.143.24.1:8000/dashboard/show", {
        headers: {
          "access-control-allow-origin": "*",
          "access-control-allow-headers": "*",
        },
      });
      const data = await response.json();
      getDataLength(data);
      setData(data);
      setFilteredData(data);
    } catch (error) {
      console.error("Error fetching data:", error);
      const data = mockData;
      getDataLength(data);
      setData(data);
      setFilteredData(data);
    }
  };

  const getDataLength = (data) => {
    let uniqueCategory = [];
    data.forEach((item) => {
      if (!uniqueCategory.includes(item?.category)) {
        uniqueCategory.push(item.category);
      }
    });
    setTotalCategoryCount(uniqueCategory.length);
    setTotalItemCount(data.length);
  };

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
    filterData(event.target.value);
  };

  const filterData = (term) => {
    const filtered = data.filter((item) => {
      return Object.values(item).some((value) =>
        value.toString().toLowerCase().includes(term.toLowerCase())
      );
    });
    setFilteredData(filtered);
  };

  const handleSort = (key) => {
    let direction = "ascending";
    if (sortConfig.key === key && sortConfig.direction === "ascending") {
      direction = "descending";
    }
    setSortConfig({ key, direction });
    const sortedData = [...filteredData].sort((a, b) => {
      if (a[key] < b[key]) {
        return direction === "ascending" ? -1 : 1;
      }
      if (a[key] > b[key]) {
        return direction === "ascending" ? 1 : -1;
      }
      return 0;
    });
    setFilteredData(sortedData);
  };

  const addItem = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    // Reset newItemFields to initial state
    setNewItemFields({
      sku: "",
      name: "",
      tags: "",
      category: "",
      total_stock: "",
      available_stock: "",
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const newItem = { ...newItemFields };
    setData([...data, newItem]);
    setFilteredData([...filteredData, newItem]);
    setShowModal(false);
    getDataLength([...data, newItem]);
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setNewItemFields({ ...newItemFields, [name]: value });
  };

  return (
    <div className="container p-10 ml-auto">
      <div className="container flex justify-between mb-4">
        <div>
          <h1 className="text-2xl font-bold mb-4">{heading}</h1>
          <h3 className="text-xl mb-4">{subHeading}</h3>
        </div>
        <div className="flex flex-col text-right">
          <div className="mb-2">
            <span className="font-bold p-3">{totalItems}</span>
            <span>{totalItemCount}</span>
          </div>
          <div>
            <span className="font-bold p-3">{totalCategory}</span>
            <span>{totalCategoryCount}</span>
          </div>
        </div>
      </div>
      <div className="flex justify-between">
        <button
          type="button"
          onClick={addItem}
          className="bg-green-600 px-4 py-2 rounded-lg shadow-lg text-white m-4"
        >
          Add New Item
        </button>
        <input
          type="text"
          placeholder="Search..."
          className="border border-gray-300 rounded-lg p-x-4 py-2 m-4 focus:outline-none focus:border-blue-500"
          onChange={handleSearch}
        />
      </div>
      {/* Add Item Modal */}
      {showModal && (
        <div className="fixed inset-0 z-10 overflow-y-auto">
          {/* Modal Overlay */}
          <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            {/* Modal Background */}
            <div
              className="fixed inset-0 transition-opacity"
              aria-hidden="true"
            >
              <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
            </div>
            {/* Modal Content */}
            <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
              {/* Modal Header */}
              <form onSubmit={handleSubmit}>
                {/* Modal Body */}
                <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                  <div className="sm:flex sm:items-start">
                    <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                      <h3 className="text-lg leading-6 font-medium text-gray-900">
                        New Item
                      </h3>
                      {/* Input Fields */}
                      <div className="mt-2">
                        {/* SKU */}
                        <div className="mb-4">
                          <label className="block text-gray-700 text-sm font-bold mb-2">
                            SKU
                          </label>
                          <input
                            type="text"
                            name="sku"
                            onChange={handleChange}
                            value={newItemFields.sku}
                            className="border rounded-md px-4 py-2 w-full"
                          />
                        </div>
                        {/* Name */}
                        <div className="mb-4">
                          <label className="block text-gray-700 text-sm font-bold mb-2">
                            Name
                          </label>
                          <input
                            type="text"
                            name="name"
                            onChange={handleChange}
                            value={newItemFields.name}
                            className="border rounded-md px-4 py-2 w-full"
                          />
                        </div>
                        {/* Category */}
                        <div className="mb-4">
                          <label className="block text-gray-700 text-sm font-bold mb-2">
                            Category
                          </label>
                          <input
                            type="text"
                            name="category"
                            onChange={handleChange}
                            value={newItemFields.category}
                            className="border rounded-md px-4 py-2 w-full"
                          />
                        </div>
                        {/* Tags */}
                        <div className="mb-4">
                          <label className="block text-gray-700 text-sm font-bold mb-2">
                            Tags
                          </label>
                          <input
                            type="text"
                            name="tags"
                            onChange={handleChange}
                            value={newItemFields.tags}
                            className="border rounded-md px-4 py-2 w-full"
                          />
                        </div>
                        {/* In Stock */}
                        <div className="mb-4">
                          <label className="block text-gray-700 text-sm font-bold mb-2">
                            In Stock
                          </label>
                          <input
                            type="text"
                            name="stock_status.total_stock"
                            onChange={handleChange}
                            value={newItemFields?.stock_status?.total_stock}
                            className="border rounded-md px-4 py-2 w-full"
                          />
                        </div>
                        {/* Available Stock */}
                        <div className="mb-4">
                          <label className="block text-gray-700 text-sm font-bold mb-2">
                            Available Stock
                          </label>
                          <input
                            type="text"
                            name="stock_status.available_stock"
                            onChange={handleChange}
                            value={newItemFields?.stock_status?.available_stock}
                            className="border rounded-md px-4 py-2 w-full"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                {/* Modal Footer */}
                <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                  <button
                    type="submit"
                    className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-green-600 text-base font-medium text-white hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 sm:ml-3 sm:w-auto sm:text-sm"
                  >
                    Add Item
                  </button>
                  <button
                    type="button"
                    onClick={handleCloseModal}
                    className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* Table */}
      <table className="w-full border-collapse border border-gray-300">
        <thead>
          <tr>
            <th
              onClick={() => handleSort("sku")}
              className="cursor-pointer bg-gray-100 px-4 py-2"
            >
              SKU
            </th>
            <th
              onClick={() => handleSort("name")}
              className="cursor-pointer bg-gray-100 px-4 py-2"
            >
              Name
            </th>
            <th
              onClick={() => handleSort("tags")}
              className="cursor-pointer bg-gray-100 px-4 py-2"
            >
              Tags
            </th>
            <th
              onClick={() => handleSort("category")}
              className="cursor-pointer bg-gray-100 px-4 py-2"
            >
              Category
            </th>
            <th
              onClick={() => handleSort("stock_status.total_stock")}
              className="cursor-pointer bg-gray-100 px-4 py-2"
            >
              In Stock
            </th>
            <th
              onClick={() => handleSort("stock_status.available_stock")}
              className="cursor-pointer bg-gray-100 px-4 py-2"
            >
              Available Stock
            </th>
          </tr>
        </thead>
        <tbody>
          {filteredData.map((item, index) => (
            <tr key={index} className="border-t border-gray-300 text-center">
              <td className="px-4 py-2">{item.sku}</td>
              <td className="px-4 py-2">{item.name}</td>
              <td className="px-4 py-2 flex">
                {item.tags.includes("Amazon") && (
                  <img
                    src={amazonImage}
                    alt="Amazon"
                    className="w-4 h-4 mr-1 flex"
                  />
                )}
                {item.tags.includes("Twitter") && (
                  <img
                    src={twitterImage}
                    alt="Twitter"
                    className="w-4 h-4 mr-1 flex"
                  />
                )}
              </td>
              <td className="px-4 py-2">{item.category}</td>
              <td className="px-4 py-2 w-1/6">
                <div className="flex items-center justify-center">
                  {item?.stock_status?.total_stock < 100 ? (
                    <span className="flex items-center">
                      <img
                        src={redColorImage}
                        alt="total_stock"
                        className="w-3 h-3 mr-1"
                      />
                      {item.stock_status?.total_stock}
                    </span>
                  ) : (
                    <span className="flex items-center">
                      <img
                        src={greenColorImage}
                        alt="total_stock"
                        className="w-3 h-3 mr-1"
                      />
                      {item.stock_status?.total_stock}
                    </span>
                  )}
                </div>
              </td>
              <td className="px-4 py-2 w-1/6">
                <div className="flex items-center justify-center">
                  {item?.stock_status?.total_stock < 100 ? (
                    <span className="flex items-center">
                      <img
                        src={redColorImage}
                        alt="available_stock"
                        className="w-3 h-3 mr-1"
                      />
                      {item?.stock_status?.available_stock}
                    </span>
                  ) : (
                    <span className="flex items-center">
                      <img
                        src={greenColorImage}
                        alt="available_stock"
                        className="w-3 h-3 mr-1"
                      />
                      {item?.stock_status?.available_stock}
                    </span>
                  )}
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Dashboard;
