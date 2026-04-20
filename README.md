🌐 Subnetting & IP Planning Tool

A full-stack web application that simplifies subnet calculations, network splitting, and visualization.

🔗 Live Demo: https://subnet-tool.onrender.com

🚀 Features
🧮 Subnet Calculator
Calculate Network Address
Calculate Broadcast Address
Compute Total Usable Hosts
🔀 Subnet Splitter
Split networks (e.g., /24 → /26)
View Subnet Ranges
First and Last Usable IP
Broadcast Address
📊 Visualization
Graphical charts using Chart.js
Easy understanding of subnet sizes
☁️ History (Cloud Storage)
Stored in Upstash Redis
View previous calculations
Track subnet splits
📁 Export
Export data as:
JSON
CSV
🛠️ Tech Stack
Frontend
React (Vite)
Axios
Chart.js
Backend
Node.js
Express.js
Database
Upstash Redis (Serverless)
🚀 Deployment
Frontend and Backend: Render
Database: Upstash Redis
⚙️ Setup Instructions (Run Locally)
1. Clone the Repository

git clone <your-repo-link>
cd SUBNET

🔧 Backend Setup

cd backend
npm install

Create a .env file inside backend folder:

REDIS_URL=your_upstash_url
PORT=5000

Start backend:

npm start

Backend runs at:
http://localhost:5000

🎨 Frontend Setup

cd ../frontend/latest
npm install
npm run dev

Frontend runs at:
http://localhost:5173

🔗 API Endpoints
📌 Calculate Subnet

POST /calculate

Request:
{
"ip": "192.168.1.1",
"cidr": 24
}

📌 Split Subnets

POST /subnets

Request:
{
"ip": "192.168.1.0",
"oldCidr": 24,
"newCidr": 26
}

📌 Get History

GET /history

Returns stored calculations from Redis.

🧠 Core Logic
IP Conversion

Convert IP address to integer for bitwise operations

Subnet Calculation

Network = IP & Mask
Broadcast = Network | ~Mask

Subnet Splitting

Number of subnets = 2^(newCIDR - oldCIDR)
Subnet size = 2^(32 - newCIDR)

📌 Example

Input:
192.168.10.0/24 → /26

Output:
Subnet 1: 192.168.10.0 - 192.168.10.63
Subnet 2: 192.168.10.64 - 192.168.10.127
Subnet 3: 192.168.10.128 - 192.168.10.191
Subnet 4: 192.168.10.192 - 192.168.10.255

⚠️ Common Issues & Fixes
500 Error
Check Redis connection
Verify REDIS_URL
History Empty
Perform a calculation first
Check backend logs
CORS Error

Add this in backend:

const cors = require("cors");
app.use(cors());

💡 Quick Start
Clone project

git clone <your-repo-link>

Start backend

cd backend
npm install
npm start

Start frontend

cd ../frontend/latest
npm install
npm run dev
