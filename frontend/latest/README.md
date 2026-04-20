#  Subnetting & IP Planning Tool (Vite + Node + Redis)

This is a full-stack web application built to make subnetting easier to understand and use in practice. Instead of doing manual calculations, this tool lets you quickly compute subnet details, split networks, visualize ranges, and keep track of previous results.

It is designed mainly for beginners in networking as well as developers who want a simple subnet utility with a clean UI.

---

# Features

##  Subnet Calculator

You can enter an IP address along with its CIDR value, and the tool will calculate:

* Network Address
* Broadcast Address
* Total number of usable hosts

---

##  Subnet Splitter

If you have a network (for example `/24`) and want to divide it into smaller subnets (like `/26`), this feature will:

* Split the network into multiple subnet blocks
* Show the first and last usable host
* Display the broadcast address for each subnet

---

##  Visualization

To make things easier to understand, the app includes graphical charts that represent subnet sizes and ranges. This helps especially when you're learning how subnetting works.

---

##  History (Redis)

All calculations are stored in Redis (Upstash cloud database), so you can:

* View previous subnet calculations
* Check previously split networks

---

##  Export

You can export your history data in:

* JSON format
* CSV format

---

#  Tech Stack

### Frontend

* React (using Vite)
* Axios
* Chart.js

### Backend

* Node.js
* Express.js
* Redis client

### Database

* Upstash Redis (Cloud-based Redis)

---

#  Prerequisites

Before setting up the project, make sure you have the following installed:

## 🔹 Node.js

bash
node -v
npm -v


---

## 🔹 Code Editor

You can use any editor, but VS Code is recommended for better experience.

---

## 🔹 Upstash Redis Account

1. Create an account on Upstash
2. Create a Redis database
3. Copy your Redis connection URL

Example:

env
REDIS_URL=rediss://default:password@host:6379


---

#  Backend Setup

## Step 1: Navigate to backend folder

bash
cd backend


---

## Step 2: Install dependencies

bash
npm install express cors dotenv redis


### What these packages do:

* **express** → Handles API routes
* **cors** → Allows frontend to communicate with backend
* **dotenv** → Loads environment variables
* **redis** → Connects to Upstash database

---

## Step 3: Create `.env` file

env
REDIS_URL=your_upstash_url
PORT=5000


---

## Step 4: Start backend server

bash
npm start


The backend will run at: http://localhost:5000


---

#  Frontend Setup

## Step 1: Create Vite app (if not already created)

bash
npm create vite@latest frontend
cd frontend
npm install


Choose:

* React
* JavaScript

---

## Step 2: Install dependencies

bash
npm install axios react-router-dom chart.js react-chartjs-2


---

## Step 3: Start frontend

bash
npm run dev


Frontend runs at:


http://localhost:5173


---

#  API Endpoints

## POST `/calculate`

Request:

json
{
  "ip": "192.168.1.1",
  "cidr": 24
}


Response:

json
{
  "network": "192.168.1.0",
  "broadcast": "192.168.1.255",
  "hosts": 254
}


---

## POST `/subnets`

json
{
  "ip": "192.168.1.0",
  "oldCidr": 24,
  "newCidr": 26
}


---

## GET `/history`

Returns all stored calculations.

---

#  Core Logic (Simple Explanation)

## 🔹 Why convert IP to number?

Example:


192.168.1.1 → 3232235777


Computers work better with numbers than strings. Converting IPs allows us to use bitwise operations easily.

---

## 🔹 Subnet calculation

Network = IP & Mask
Broadcast = Network | ~Mask


* `&` finds the network portion
* `|` and `~` help compute the broadcast address

---

## 🔹 Subnet splitting


Total subnets = 2^(newCIDR - oldCIDR)

Each subnet size: 2^(32 - newCIDR)
---

## 🔹 Redis storage

Each operation is saved like this:

json
{
  "type": "split",
  "ip": "...",
  "oldCidr": 24,
  "newCidr": 26,
  "subnets": [],
  "time": "timestamp"
}


Stored using:

js
client.lPush("history", JSON.stringify(data))


---

#  How to Run the Project

1. Start backend

   bash
   cd backend
   npm start
   

2. Start frontend

   bash
   cd frontend
   npm run dev
   

3. Open in browser

   
   http://localhost:5173
   

---

# 📊 Example

Input:


192.168.10.0/24 → /26


Output:


Subnet 1: 192.168.10.0 - 192.168.10.63  
Subnet 2: 192.168.10.64 - 192.168.10.127  
Subnet 3: 192.168.10.128 - 192.168.10.191  
Subnet 4: 192.168.10.192 - 192.168.10.255  


---

# ⚠️ Common Issues

### 500 Error

* Check Redis connection
* Make sure routes are async

---

### Redis not saving data

* Ensure you're using the correct (default) Redis user

---

### History is empty

* Perform at least one calculation before checking history

---

This project is a good mix of networking concepts and full-stack development. It can also be extended further by adding authentication, advanced subnet visualization, or IPv6 support.
