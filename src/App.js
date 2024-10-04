import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { CContainer } from '@coreui/react';
import PrivateRoute from './components/PrivateRoute';
import routes from './routes';
import './scss/style.scss';

const App = () => {
  return (
    <Router>
      <CContainer>
        <Routes>
          {routes.map((route, index) => {
            const { element, ...rest } = route;
            const Element = element;

            if (route.path === '/dashboard') {
              return (
                <Route
                  key={index}
                  {...rest}
                  element={<PrivateRoute><Element /></PrivateRoute>} // Protege a rota do dashboard
                />
              );
            }

            return <Route key={index} {...rest} element={<Element />} />;
          })}
        </Routes>
      </CContainer>
    </Router>
  );
};

export default App;
