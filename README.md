# React Dashboard

This project is a React dashboard component designed to display and manage data fetched from a backend API. It includes features like searching, sorting, and filtering data. The dashboard is visually appealing and user-friendly.

## Installation

To install and run this project locally, follow these steps:

1. **Clone the repository:**

    ```bash
    git clone https://github.com/your-username/react-dashboard.git
    ```

2. **Navigate to the project directory:**

    ```bash
    cd react-dashboard
    ```

3. **Install dependencies:**

    ```bash
    npm install
    ```

4. **Start the development server:**

    ```bash
    npm start
    ```

## Features

- Fetches data from a backend API (or uses trial/mock data for demonstration purposes).
- Displays total category count and total item count.
- Implements search functionality to filter data based on a search term.
- Supports sorting data based on various keys.
- Allows adding new items.

## Usage

```javascript
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
  // Component logic...
};

export default Dashboard;

