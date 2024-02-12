// Sidebar.js
import React from "react";

const Sidebar = () => {
  // Sample data for sidebar menu items
  const menuItems = [
    { id: 1, label: "Home", icon: "home" },
    { id: 2, label: "Items", icon: "items" },
    { id: 3, label: "Stock", icon: "stock" },
    { id: 4, label: "Build", icon: "build" },
    { id: 5, label: "Customers", icon: "customers" },
    { id: 6, label: "Sales Orders", icon: "sales_orders" },
    { id: 7, label: "Suppliers", icon: "suppliers" },
    { id: 8, label: "Manufacturers", icon: "manufacturers" },
    { id: 9, label: "Purchase Orders", icon: "purchase_orders" },
    { id: 10, label: "Reports", icon: "reports" },
    { id: 11, label: "Help", icon: "help" },
    { id: 12, label: "Integrations", icon: "integrations" },
    { id: 13, label: "Logout", icon: "logout" },
    { id: 14, label: "My Profile", icon: "my_profile" }
  ];

  return (
    <div className="bg-white text-black h-full w-40">
      <ul>
        {menuItems.map((item) => (
          <li key={item.id} className="flex items-center p-4 hover:bg-slate-200 cursor-pointer">
            <span className="mr-2">{item.label}</span>
            {/* //TO_DO Need to add images */}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Sidebar;
