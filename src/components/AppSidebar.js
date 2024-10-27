import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { NavLink, useNavigate } from 'react-router-dom';
import { CBadge, CNavItem, CNavGroup, CCollapse, CButton, CFooter } from '@coreui/react';
import navigation from '../_nav';
import './Sidebar.css'; 
import 'boxicons/css/boxicons.min.css';
import LogoImage from '../img/LogoSidebar.png'; // Caminho da imagem

const SidebarMenu = ({ isSidebarClosed, toggleSidebar }) => {
  const dispatch = useDispatch();
  const [openGroups, setOpenGroups] = useState({});
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('authToken'); // Remove o token
    navigate('/login'); // Redireciona para a página de login
  };

  const toggleGroup = (groupId) => {
    setOpenGroups((prevState) => ({
      ...prevState,
      [groupId]: !prevState[groupId],
    }));
  };

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleSidebarToggle = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <>
      {/* Sidebar para Desktop */}
      {!isMobile && (
        <nav className={`sidebar ${isSidebarClosed ? 'close' : ''}`} style={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
          <header>
            <i className='bx bx-chevron-right toggle' onClick={toggleSidebar}></i>
            <div className='LogoVox'>
              <img src={LogoImage} alt="Logo Vox" style={{ width: '50px', height: '50px' }} />
              {/* Renderiza o nome apenas se a sidebar estiver aberta */}
              {!isSidebarClosed && (
                <h1 className="logo-title">
                  <span>Vox </span>
                  <span>Tecnologia</span>  
                </h1>
              )}
            </div>
          </header>

          <div className="flex-grow-1">
            <ul className="">
              {navigation.map((item, index) => {
                if (item.component === CNavItem) {
                  return (
                    <li className="textMenu" key={index}>
                      <CButton className="w-100 text-start d-flex align-items-center buttonMenu">
                        <NavLink to={item.to} className="d-flex align-items-center">
                          <span className="me-2">
                            {item.icon}
                          </span> 
                          <span className="text nav-text">
                            {item.name}
                          </span>
                        </NavLink>
                      </CButton>
                    </li>
                  );
                }

                if (item.component === CNavGroup) {
                  return (
                    <li className="textMenu" key={index}>
                      <CButton
                        onClick={() => toggleGroup(item.name)}
                        className="w-100 text-start d-flex align-items-center buttonMenu"
                      >
                        <span className="me-2">
                          {item.icon}
                        </span>
                        <span className="text nav-text">    
                          {item.name}
                        </span>
                      </CButton>

                      <CCollapse visible={openGroups[item.name]}>
                        <ul className="submenu">
                          {item.items.map((subItem, subIndex) => (
                            <li className="o" key={subIndex}>
                              <NavLink to={subItem.to} className="d-flex align-items-center">
                                <span className="me-2">
                                  {subItem.icon}
                                </span>
                                <span className="o">{subItem.name}</span>
                              </NavLink>
                            </li>
                          ))}
                        </ul>
                      </CCollapse>
                    </li>
                  );
                }
 
                return null;
              })}
            </ul>
          </div>
          
          <div className="sidebar-footer">
            <CButton onClick={handleLogout} className="w-100 text-start d-flex align-items-center buttonMenu">
              <span className="">
                <i className='bx bx-log-out iconMenuSair'></i> {/* Ícone de logout */}
              </span>
              <span className="text nav-text">Sair</span>
            </CButton>
          </div>
        </nav>
      )}

      {/* Sidebar Móvel */}
      {isMobile && (
        <>
          <i className='bx bx-menu toggle' onClick={handleSidebarToggle}></i>
          <div className={`mobile-sidebar ${isSidebarOpen ? 'open' : ''}`}>
            <div className="sidebar-header">
              <img src={LogoImage} alt="Logo Vox" style={{ width: '50px', height: '50px' }} />
              <h1 className="logo-title">
                <span>Vox </span>
                <span>Tecnologia</span>  
              </h1>
              <i className='bx bx-x close' onClick={handleSidebarToggle}></i>
            </div>
            <ul className="menu-links">
              {navigation.map((item, index) => {
                if (item.component === CNavItem) {
                  return (
                    <li className="textMenu" key={index}>
                      <CButton className="w-100 text-start d-flex align-items-center buttonMenu">
                        <NavLink to={item.to} className="d-flex align-items-center">
                          <span className="me-2">
                            {item.icon}
                          </span> 
                          <span className="text nav-text">
                            {item.name}
                          </span>
                        </NavLink>
                      </CButton>
                    </li>
                  );
                }

                if (item.component === CNavGroup) {
                  return (
                    <li className="textMenu" key={index}>
                      <CButton
                        onClick={() => toggleGroup(item.name)}
                        className="w-100 text-start d-flex align-items-center buttonMenu"
                      >
                        {item.icon}
                        <span className="text nav-text">{item.name}</span>
                        <i className={`bx ${openGroups[item.name] ? 'bx-chevron-up' : 'bx-chevron-down'} ms-auto`}></i>
                      </CButton>
                      <CCollapse visible={openGroups[item.name]}>
                        <ul className="submenu">
                          {item.items.map((subItem, subIndex) => (
                            <li className="o" key={subIndex}>
                              <NavLink to={subItem.to} onClick={handleSidebarToggle}>
                                {subItem.icon}
                                <span className="text nav-text">{subItem.name}</span>
                              </NavLink>
                            </li>
                          ))}
                        </ul>
                      </CCollapse>
                    </li>
                  );
                }

                return null;
              })}
            </ul>
            <div className="sidebar-footer">
              <CButton onClick={handleLogout} className="w-100 text-start d-flex align-items-center buttonMenu">
                <span className="">
                  <i className='bx bx-log-out iconMenu'></i> {/* Ícone de logout */}
                </span>
                <span className="text nav-text">Sair</span>
              </CButton>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default SidebarMenu;
