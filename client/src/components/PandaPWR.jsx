import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Power, Activity, Zap, RefreshCw } from 'lucide-react';

const PandaPWR = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchData = async () => {
    try {
      const response = await axios.get('/api/pwr/data');
      if (response.data.offline) {
        setError('Device Offline or Unreachable');
      } else {
        setData(response.data);
        setError(null);
      }
    } catch (err) {
      setError('Connection Error');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
    const interval = setInterval(fetchData, 5000); // Poll every 5 seconds
    return () => clearInterval(interval);
  }, []);

  const togglePower = async (newState) => {
    // Optimistic update
    setData(prev => ({ ...prev, power_state: newState ? 1 : 0 }));
    try {
      await axios.post('/api/pwr/set', { power: newState ? 1 : 0 });
      fetchData(); // Refresh actual data
    } catch (err) {
      setError('Failed to toggle power');
      fetchData(); // Revert on fail
    }
  };

  const isOnline = !error && data;

  return (
    <div className="glass-panel">
      <div className="panel-header">
        <h2 className="panel-title">
          <Power size={24} color="var(--accent-color)" />
          Panda PWR
        </h2>
        <div className={`status-badge ${isOnline ? 'status-online' : 'status-offline'}`}>
          {isOnline ? 'Online' : 'Offline'}
        </div>
      </div>

      {loading && !data ? (
        <div style={{ display: 'flex', justifyContent: 'center', padding: '2rem' }}>
          <RefreshCw className="loading-spinner" size={32} color="var(--text-secondary)" />
        </div>
      ) : (
        <>
          <div className="metrics-grid">
            <div className="metric-card">
              <span className="metric-label"><Activity size={16} /> Power Draw</span>
              <div>
                <span className="metric-value">{data?.power || 0}</span>
                <span className="metric-unit"> W</span>
              </div>
            </div>
            <div className="metric-card">
              <span className="metric-label"><Zap size={16} /> Voltage</span>
              <div>
                <span className="metric-value">{data?.voltage || 0}</span>
                <span className="metric-unit"> V</span>
              </div>
            </div>
            <div className="metric-card">
              <span className="metric-label">Current</span>
              <div>
                <span className="metric-value">{data?.current ? data.current.toFixed(2) : 0}</span>
                <span className="metric-unit"> A</span>
              </div>
            </div>
            <div className="metric-card">
              <span className="metric-label">Energy</span>
              <div>
                <span className="metric-value">{data?.ele ? data.ele.toFixed(2) : 0}</span>
                <span className="metric-unit"> kWh</span>
              </div>
            </div>
          </div>

          <div className="toggle-wrapper">
            <span className="toggle-label">Main Power</span>
            <label className="switch">
              <input 
                type="checkbox" 
                checked={data?.power_state === 1} 
                onChange={(e) => togglePower(e.target.checked)}
                disabled={!isOnline}
              />
              <span className="slider"></span>
            </label>
          </div>
          
          {error && <div style={{ color: 'var(--danger-color)', marginTop: '1rem', fontSize: '0.9rem' }}>{error}</div>}
        </>
      )}
    </div>
  );
};

export default PandaPWR;
