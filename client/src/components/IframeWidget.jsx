import React from 'react';
import { ExternalLink } from 'lucide-react';

const IframeWidget = ({ title, icon: Icon, url, externalUrl }) => {
  return (
    <div className="glass-panel" style={{ display: 'flex', flexDirection: 'column' }}>
      <div className="panel-header" style={{ marginBottom: '1rem' }}>
        <h2 className="panel-title">
          <Icon size={24} color="var(--accent-color)" />
          {title}
        </h2>
        <div className="status-badge status-online">Connected</div>
      </div>
      
      <div className="iframe-container">
        <iframe src={url} title={title} sandbox="allow-scripts allow-same-origin allow-forms"></iframe>
        
        <div className="iframe-overlay">
          <a href={externalUrl} target="_blank" rel="noopener noreferrer" className="external-link-btn">
            Open Web App <ExternalLink size={18} />
          </a>
        </div>
      </div>
    </div>
  );
};

export default IframeWidget;
