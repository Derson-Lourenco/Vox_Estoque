import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { CBadge, CNavItem, CNavGroup } from '@coreui/react';
import navigation from '../_nav';
import './Sidebar.css';
import 'boxicons/css/boxicons.min.css';

const SidebarMenu = ({ isSidebarClosed, toggleSidebar }) => {
  const dispatch = useDispatch();
  const [openGroups, setOpenGroups] = useState({});
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false); // Estado para controlar a sidebar móvel

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
    setIsSidebarOpen(!isSidebarOpen); // Alterna a visibilidade da sidebar móvel
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
          <div className="menu">
            <li className="search-box" onClick={() => toggleSidebar()}>
              <i className='bx bx-search icon'></i>
              <input type="text" placeholder="Search..." />
            </li>

            <ul className="menu-links">
              {navigation.map((item, index) => {
                if (item.component === CNavItem) {
                  return (
                    <li className="nav-link" key={index}>
                      <NavLink to={item.to}>
                        {item.icon}
                        <span className="text nav-text">{item.name}</span>
                        {item.badge && <CBadge color={item.badge.color}>{item.badge.text}</CBadge>}
                      </NavLink>
                    </li>
                  );
                }

                if (item.component === CNavGroup) {
                  return (
                    <li className="nav-group" key={index}>
                      <div onClick={() => toggleGroup(item.name)} style={{ cursor: 'pointer' }}>
                        <NavLink to={item.to}>
                          {item.icon}
                          <span className="text nav-text">{item.name}</span>
                        </NavLink>
                      </div>
                      {openGroups[item.name] && (
                        <ul className="submenu">
                          {item.items.map((subItem, subIndex) => (
                            <li className="nav-link" key={subIndex}>
                              <NavLink to={subItem.to}>
                                {subItem.icon}
                                <span className="text nav-text">{subItem.name}</span>
                                {subItem.badge && <CBadge color={subItem.badge.color}>{subItem.badge.text}</CBadge>}
                              </NavLink>
                            </li>
                          ))}
                        </ul>
                      )}
                    </li>
                  );
                }

                return null;
              })}
            </ul>
          </div>
        </nav>
      )}

      {/* Sidebar Móvel */}
      {isMobile && (
        <>
          <header>
            <i className='bx bx-menu toggle' onClick={handleSidebarToggle}></i>
          </header>

          {/* Sidebar lateral */}
          <div className={`mobile-sidebar ${isSidebarOpen ? 'open' : ''}`}>
            <div className="sidebar-header">
              <h2>Logo</h2>
              <i className='bx bx-x close' onClick={handleSidebarToggle}></i>
            </div>
            <ul className="menu-links">
              {navigation.map((item, index) => {
                if (item.component === CNavItem) {
                  return (
                    <li className="nav-link" key={index}>
                      <NavLink to={item.to} onClick={handleSidebarToggle}>
                        {item.icon}
                        <span className="text nav-text">{item.name}</span>
                        {item.badge && <CBadge color={item.badge.color}>{item.badge.text}</CBadge>}
                      </NavLink>
                    </li>
                  );
                }

                if (item.component === CNavGroup) {
                  return (
                    <li className="nav-group" key={index}>
                      <div onClick={() => toggleGroup(item.name)} style={{ cursor: 'pointer' }}>
                        <NavLink to={item.to} onClick={handleSidebarToggle}>
                          {item.icon}
                          <span className="text nav-text">{item.name}</span>
                        </NavLink>
                      </div>
                      {openGroups[item.name] && (
                        <ul className="submenu">
                          {item.items.map((subItem, subIndex) => (
                            <li className="nav-link" key={subIndex}>
                              <NavLink to={subItem.to} onClick={handleSidebarToggle}>
                                {subItem.icon}
                                <span className="text nav-text">{subItem.name}</span>
                                {subItem.badge && <CBadge color={subItem.badge.color}>{subItem.badge.text}</CBadge>}
                              </NavLink>
                            </li>
                          ))}
                        </ul>
                      )}
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
