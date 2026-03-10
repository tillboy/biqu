const express = require('express');
const cors = require('cors');
const { createProxyMiddleware } = require('http-proxy-middleware');
const axios = require('axios');
const app = express();
const port = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

// Device DNS Names 
const DEVICES = {
    PWR: 'pandapwr.local',
    TOUCH: 'pandatouch.local',
    STATUS: 'pandastatus.local',
    BREATH: 'pandabreath.local',
    KNOMI: 'pandaknomi.local'
};

// --- Panda PWR ---
app.get('/api/pwr/data', async (req, res) => {
    try {
        const response = await axios.get(`http://${DEVICES.PWR}/update_ele_data`, { timeout: 5000 });
        res.json(response.data);
    } catch (error) {
        res.status(500).json({ error: error.message, offline: true });
    }
});

app.post('/api/pwr/set', async (req, res) => {
    try {
        const data = Object.keys(req.body).map(key => `${key}=${req.body[key]}`).join('&');
        const response = await axios.post(`http://${DEVICES.PWR}/set`, data, { timeout: 5000 });
        res.json({ success: true, data: response.data });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// --- Simple Proxies for other devices ---
app.use('/api/touch', createProxyMiddleware({
    target: `http://${DEVICES.TOUCH}`,
    changeOrigin: true,
    pathRewrite: { '^/api/touch': '' },
}));

app.use('/api/status', createProxyMiddleware({
    target: `http://${DEVICES.STATUS}`,
    changeOrigin: true,
    pathRewrite: { '^/api/status': '' },
}));

app.use('/api/breath', createProxyMiddleware({
    target: `http://${DEVICES.BREATH}`,
    changeOrigin: true,
    pathRewrite: { '^/api/breath': '' },
}));

app.use('/api/knomi', createProxyMiddleware({
    target: `http://${DEVICES.KNOMI}`,
    changeOrigin: true,
    pathRewrite: { '^/api/knomi': '' },
}));

app.get('/api/health', (req, res) => res.json({ status: 'ok' }));

const path = require('path');
app.use(express.static(path.join(__dirname, '../client/dist')));

// Fallback for React router
app.use((req, res) => {
    res.sendFile(path.join(__dirname, '../client/dist/index.html'));
});

app.listen(port, "0.0.0.0", () => {
    console.log(`Bambu Panda Integration Server running on port ${port}`);
});
