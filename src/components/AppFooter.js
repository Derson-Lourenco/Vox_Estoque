import React from 'react';
import { CFooter } from '@coreui/react';
import '../css/style.css';

const AppFooter = ({ isDarkMode }) => {
  return (
    <CFooter className={`px-4 ${isDarkMode ? 'footer-dark' : ''}`}>
      <div>
        <span className="cap">Vox</span>
        <span className="dev">{isDarkMode ? 'Tec' : 'Tec'}</span>
        <span className="ms-1">&copy; 2024. Desenvolvido por </span>
        <a href="https://capivaradev.netlify.app/" target="_blank" rel="noopener noreferrer">
          <span className="cap">Capivara</span> <span className="dev">Dev</span>
        </a>
      </div>
    </CFooter>
  );
};

export default React.memo(AppFooter);
