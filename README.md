# Drone Pathfinding System

This project involves a drone navigation system that uses a graph-based approach for pathfinding. The goal is to provide the shortest path between nodes, track the drone's last confirmed position, and manage the drone's movement through a network of waypoints.

## Table of Contents

- [Description](#description)
- [Technologies Used](#technologies-used)
- [Getting Started](#getting-started)
- [Installation](#installation)
- [Usage](#usage)

## Description

This project simulates a drone navigating a set of nodes represented as a graph. Each node has properties like latitude, longitude, and altitude, and is connected to other nodes. The system is designed to compute the shortest path between two nodes using Dijkstra's algorithm. It also tracks the last confirmed node where the drone was located and the current target node it is heading toward.

## Technologies Used

### 1. **TypeScript**
   - **Description**: TypeScript is a strongly typed superset of JavaScript. It adds type safety and modern JavaScript features to help improve the development process. This project is written in TypeScript to ensure that the code is type-checked and maintainable.
   - **Use**: The entire backend logic, such as pathfinding and node management, is written using TypeScript.

### 2. **Dijkstra's Algorithm**
   - **Description**: Dijkstra's algorithm is a well-known graph search algorithm that finds the shortest path between two nodes in a graph with non-negative edge weights.
   - **Use**: This algorithm is used to compute the shortest path between nodes in the drone's pathfinding system.

### 3. **Node.js**
   - **Description**: Node.js is a JavaScript runtime built on Chrome's V8 JavaScript engine. It enables JavaScript to be used for backend development.
   - **Use**: Node.js is used for running the backend logic of this project, managing modules, and integrating with the Electron app.

### 4. **Electron**
   - **Description**: Electron is a framework that allows you to build cross-platform desktop applications with web technologies (HTML, CSS, and JavaScript).
   - **Use**: Electron is used to package the TypeScript backend logic and React frontend into a desktop application for the drone management system.

### 5. **React**
   - **Description**: React is a JavaScript library for building user interfaces, primarily for single-page applications by allowing developers to build reusable UI components.
   - **Use**: React is used for building the frontend of the drone management application, providing a dynamic and interactive UI.

### 6. **PostGIS**
   - **Description**: PostGIS is a spatial database extender for PostgreSQL, adding support for geographic objects to the database.
   - **Use**: PostGIS will eventually be used to store and query the drone's location graph and pathfinding data, though it is currently being simulated in-memory.

### 7. **Vite**
   - **Description**: Vite is a build tool that aims to provide a faster and leaner development experience for modern web projects.
   - **Use**: Vite is used to bundle the React frontend, providing fast hot module reloading during development.

### 8. **SQLite (Future Integration)**
   - **Description**: SQLite is a lightweight, disk-based database that doesn’t require a separate server process.
   - **Use**: It will be used in the future to store dynamic pathfinding data, including updated node locations and connections.

## Getting Started

To run this project locally, follow these steps:

### Prerequisites

- Node.js (v14 or later)
- npm or yarn
