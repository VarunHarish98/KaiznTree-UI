import React, { useState, useEffect } from "react";
import mockData from "../mockData.json";
import {
  heading,
  newButtonItem,
  newItemButton,
  optionsButton,
  subHeading,
  totalCategory,
  totalItems,
} from "../constants";
import redColorImage from "../images/red-color.png";
import greenColorImage from "../images/green-color.png";
import amazonImage from "../images/amazon.png"; // Import Amazon image
import twitterImage from "../images/twitter.jpg"; // Import Twitter image

const Dashboard = () => {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortConfig, setSortConfig] = useState({ key: null, direction: "" });
  const [totalCategoryCount, setTotalCategoryCount] = useState("");
  const [totalItemCount, setTotalItemCount] = useState("");

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      // Fetch data from backend
      //   const response = await fetch("your-backend-api-url");
      //   const data = await response.json();
      const data = mockData; //Trial Data
      getDataLength(data);
      setData(data);
      setFilteredData(data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const getDataLength = (data) => {
    let len = data.length;
    let uniqueCategory = [];
    let res = data.map((item) => {
      if (!uniqueCategory.includes(item?.category))
        uniqueCategory.push(item.category);
    });
    // console.log("--------", uniqueCategory);
    setTotalCategoryCount(uniqueCategory.length);
    setTotalItemCount(len);
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
    return {};
  };

  return (
    <div className="container p-10 ml-auto">
      <div className="container flex">
        <div className="">
          <h1 className="text-2xl font-bold mb-4">{heading}</h1>
          <h3 className="text-xl mb-4">{subHeading}</h3>
        </div>
        <div>
          {" "}
          <div className="flex justify-end">
            <table>
              <tbody>
                <tr>
                  <td>{totalItems}</td>
                  <td>{totalItemCount}</td>
                </tr>
                <tr>
                  <td>{totalCategory}</td>
                  <td>{totalCategoryCount}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <button
        type="button"
        onClick={addItem}
        className="bg-green-600 px-4 py-2 rounded-lg shadow-lg text-white m-4"
      >
        {newItemButton}
      </button>

      <div className="border border-solid">
        <button
          onClick={addItem}
          className="bg-green-600 rounded-lg shadow-lg px-4 py-2 text-white m-4"
        >
          {newButtonItem}
        </button>
        <select
          className="bg-slate-400 px-4 py-2 rounded-lg shadow-lg text-black m-4"
          disabled
          name={optionsButton}
        >
          <option disabled value="Option1">
            OPTIONS
          </option>
        </select>
        {/* <button onClick={handleSort}></button> */}
        <input
          type="text"
          placeholder="Search..."
          value={searchTerm}
          onChange={handleSearch}
          className="border rounded-md px-4 py-2 mb-4 "
        />
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
                    <img src={amazonImage} alt="Amazon" className="w-4 h-4 mr-1 flex" />
                  )}
                  {item.tags.includes("Twitter") && (
                    <img src={twitterImage} alt="Twitter" className="w-4 h-4 mr-1 flex" />
                  )}
                  {/* {item.tags} */}
                </td>
                <td className="px-4 py-2">{item.category}</td>
                <td className="px-4 py-2 w-1/6">
                  {" "}
                  {/* Adjusted width */}
                  <div className="flex items-center justify-center">
                    {" "}
                    {/* Added flex container */}
                    {item.stock_status.total_stock < 100 ? (
                      <span className="flex items-center">
                        <img src={redColorImage} className="w-3 h-3 mr-1" />{" "}
                        {/* Adjusted image size */}
                        {item.stock_status.total_stock}
                      </span>
                    ) : (
                      <span className="flex items-center">
                        <img src={greenColorImage} className="w-3 h-3 mr-1" />{" "}
                        {/* Adjusted image size */}
                        {item.stock_status.total_stock}
                      </span>
                    )}
                  </div>
                </td>
                <td className="px-4 py-2 w-1/6">
                  {" "}
                  {/* Adjusted width */}
                  <div className="flex items-center justify-center">
                    {" "}
                    {/* Added flex container */}
                    {item.stock_status.total_stock < 100 ? (
                      <span className="flex items-center">
                        <img src={redColorImage} className="w-3 h-3 mr-1" />{" "}
                        {/* Adjusted image size */}
                        {item.stock_status.available_stock}
                      </span>
                    ) : (
                      <span className="flex items-center">
                        <img src={greenColorImage} className="w-3 h-3 mr-1" />{" "}
                        {/* Adjusted image size */}
                        {item.stock_status.available_stock}
                      </span>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Dashboard;
