// DefaultLayout.jsx
import React, { useState } from 'react';
import { AppContent, AppSidebar, AppFooter } from '../components/index';
import './DefaultLayout.css'; // Importar o CSS do layout

const DefaultLayout = () => {
  const [isSidebarClosed, setIsSidebarClosed] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarClosed(prev => !prev);
  };

  return (
    <div className={`app-container`}>
      <AppSidebar isSidebarClosed={isSidebarClosed} toggleSidebar={toggleSidebar} />
      <div className={`wrapper d-flex flex-column min-vh-100 ${isSidebarClosed ? 'content-closed' : 'content-open'}`}>
        <div className="body flex-grow-1">
          <AppContent />
        </div>
        {/* <AppFooter /> */}
      </div>
    </div>
  );
};

export default DefaultLayout;
