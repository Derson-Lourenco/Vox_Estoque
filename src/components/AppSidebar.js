import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { CBadge, CNavItem, CNavGroup, CCollapse, CButton, CCardFooter } from '@coreui/react';
import navigation from '../_nav';
import './Sidebar.css'; 
import 'boxicons/css/boxicons.min.css';

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
        <nav className={`sidebar ${isSidebarClosed ? 'close' : ''}`}>
          <header>
            <i className='bx bx-chevron-right toggle' onClick={toggleSidebar}></i>
            <h2>Logo</h2>
          </header>
          <div className="">
      
            <ul className="menu-links">
              {navigation.map((item, index) => {
                if (item.component === CNavItem) {
                  return (
                    <li className="textMenu" key={index}>
                      <CButton className="w-100 text-start d-flex align-items-center buttonMenu">
                        <NavLink to={item.to}>
                          {/* {item.icon}
                          {item.badge && <CBadge color={item.badge.color}>{item.badge.text}</CBadge>} */}
                          {item.icon}
                          <span className="text nav-text">{item.name}</span>
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
                        <span className="h">{item.icon}
                        <span className="text nav-text">{item.name}</span></span>
                      </CButton>
                      <CCollapse visible={openGroups[item.name]}>
                        <ul className="submenu">
                          {item.items.map((subItem, subIndex) => (
                            <li className="o" key={subIndex}>
                              <NavLink to={subItem.to}>
                                {subItem.icon}
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
          <button onClick={handleLogout}>Sair</button>
        </nav>
      )}

      {/* Sidebar Móvel */}
      {isMobile && (
        <>
          <header>
            <i className='bx bx-menu toggle' onClick={handleSidebarToggle}></i>
          </header>

          <div className={`mobile-sidebar ${isSidebarOpen ? 'open' : ''}`}>
            <div className="sidebar-header">
              <h2>Logo</h2>
              <i className='bx bx-x close' onClick={handleSidebarToggle}></i>
            </div>
            <ul className="menu-links">
              {navigation.map((item, index) => {
                if (item.component === CNavItem) {
                  return (
                    <li className="textMenu" key={index}>
                      <NavLink to={item.to} onClick={handleSidebarToggle}>
                        {item.icon}
                        <span className="text nav-text">{item.name}</span>
                      </NavLink>
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
          </div>
        </>
      )}
    </>
  );
};

export default SidebarMenu;
