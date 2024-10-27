import React from 'react';
import { CFooter } from '@coreui/react';
import '../css/style.css';

const AppFooter = ({ isDarkMode }) => {
  return (
    <CFooter className="FooterDev">
      <div>
        <span className="cap">Vox</span>
        <span className="dev">Tec</span>
        <span className="ms-1 Vox2024">&copy; 2024 </span>
        <a href="https://capivaradev.netlify.app/" target="_blank" rel="noopener noreferrer">
          <span className="cap">Capivara</span> <span className="dev">Dev</span>
        </a>
      </div>
    </CFooter>
  );
};

export default React.memo(AppFooter);
