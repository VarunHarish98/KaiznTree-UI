import React from "react";
import Sidebar from "./Sidebar";
import Dashboard from "./Dashboard";

const Page = () => {
  return (
    <div className="flex">
      <Sidebar />
      <Dashboard />
    </div>
  );
};

export default Page;
