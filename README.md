# Bambu Panda Command Center

A unified control system and dashboard for integrating and managing Bambu Lab 3D printers and BTT Panda accessories. 

## Device Integration List

This system connects to the following local devices:
- **Bambu Labs P1S**
- **BTT Panda Touch**
- **BTT Panda PWR**
- **BTT Panda Status**
- **BTT Panda Knomi**
- **BTT Panda Breath**

## Prerequisites

- Local Network access to the devices with configured Static IP / DNS assignments.
- Node.js (v20+ recommended)
- Optional: Proxmox/LXC setup or Linux host for daemonized backend.

## Structure

- `/server`: Node.js Express backend acting as a unified API integration layer and proxy. 
- `/client`: React frontend built with Vite, serving as the user interface dashboard.

## Installation & Setup

1. **Clone the repository:**
   ```bash
   git clone <your-repository-url>
   cd Bambu_Panda
   ```

2. **Install Backend Dependencies:**
   ```bash
   cd server
   npm install
   ```

3. **Install Frontend Dependencies:**
   ```bash
   cd ../client
   npm install
   ```

## Running Locally for Development

1. **Start the Backend Server (Term 1):**
   ```bash
   cd server
   node index.js
   ```

2. **Start the Frontend Vite server (Term 2):**
   ```bash
   cd client
   npm run dev
   ```

## Production Deployment (e.g. on Proxmox LXC)

1. Build the frontend client for production:
   ```bash
   cd client
   npm run build
   ```

2. The server is configured to serve the static frontend bundle from `/client/dist` natively on port `3001`.

3. Start backend using a process manager like PM2:
   ```bash
   cd server
   npm install -g pm2
   pm2 start index.js --name bambupanda
   pm2 startup
   pm2 save
   ```
   
4. The dashboard will be accessible at: `http://<your-host-ip>:3001/`

## Configuration

Device hostnames and network addresses are configured in the backend file: `server/index.js`.
The backend uses local DNS names (e.g. `pandapwr.local`) to route API calls. Ensure your router resolves these cleanly.
