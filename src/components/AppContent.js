// AppContent.jsx
import React, { Suspense } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import { CContainer, CSpinner } from '@coreui/react';
import routes from '../routes';
import './AppContent.css';

const AppContent = ({ isSidebarClosed }) => {
  return (
    <CContainer className={`app-content ${isSidebarClosed ? 'content-closed' : ''}`} fluid>
      <Suspense fallback={<CSpinner color="primary" />}>
        <Routes>
          {routes.map((route, idx) => (
            route.element && (
              <Route
                key={idx}
                path={route.path}
                element={<route.element />}
              />
            )
          ))}
          <Route path="/" element={<Navigate to="dashboard" replace />} />
        </Routes>
      </Suspense>
    </CContainer>
  );
};

export default React.memo(AppContent);
