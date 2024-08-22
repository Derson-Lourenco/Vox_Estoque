import React, { useEffect, useRef } from 'react';
import { CContainer, CHeaderNav, useColorModes } from '@coreui/react';
import CIcon from '@coreui/icons-react';
import { cilMoon, cilSun } from '@coreui/icons';

const TemaCor = () => {
  const headerRef = useRef();
  const { colorMode, setColorMode } = useColorModes('coreui-free-react-admin-template-theme');

  useEffect(() => {
    document.addEventListener('scroll', () => {
      headerRef.current &&
        headerRef.current.classList.toggle('shadow-sm', document.documentElement.scrollTop > 0);
    });
  }, []);

  const toggleTheme = () => {
    setColorMode(colorMode === 'dark' ? 'light' : 'dark');
  };

  return (
    <CContainer fluid>
      <CHeaderNav>
        <button 
          onClick={toggleTheme} 
          style={{ background: 'none', border: 'none', cursor: 'pointer' }}
        >
          <CIcon 
            icon={colorMode === 'dark' ? cilMoon : cilSun} 
            size="lg" 
            className="text-white" // Adiciona a classe para definir a cor como branca
          />
        </button>
      </CHeaderNav>
    </CContainer>
  );
};

export default TemaCor;
