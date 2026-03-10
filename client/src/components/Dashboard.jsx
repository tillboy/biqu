import React from 'react';
import { Layers, MonitorPlay, Wind, ActivitySquare, Settings } from 'lucide-react';
import PandaPWR from './PandaPWR';
import IframeWidget from './IframeWidget';

const Dashboard = () => {
  return (
    <>
      <header className="header">
        <Layers className="header-icon" size={40} />
        <h1 className="header-title">Bambu Panda Hub</h1>
      </header>

      <div className="dashboard-grid">
        {/* Panda PWR has native API controls */}
        <PandaPWR />

        {/* Panda Touch has a web admin page on 80/8080 */}
        <IframeWidget
          title="Panda Touch"
          icon={MonitorPlay}
          url="/api/touch"
          externalUrl="http://192.168.8.215"
        />

        {/* Panda Status UI */}
        <IframeWidget
          title="Panda Status"
          icon={ActivitySquare}
          url="/api/status"
          externalUrl="http://192.168.8.194"
        />

        {/* Panda Breath UI */}
        <IframeWidget
          title="Panda Breath"
          icon={Wind}
          url="/api/breath"
          externalUrl="http://192.168.8.192"
        />

        {/* Panda Knomi UI */}
        <IframeWidget
          title="Panda Knomi"
          icon={Settings}
          url="/api/knomi"
          externalUrl="http://192.168.8.132"
        />
      </div>
    </>
  );
};

export default Dashboard;
