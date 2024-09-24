// import React from 'react';
// import { useSelector, useDispatch } from 'react-redux';
// import {
//   CSidebar,
//   CSidebarBrand,
//   CSidebarFooter,
//   CSidebarHeader,
//   CSidebarToggler,
//   CSidebarNav,
// } from '@coreui/react';
// import logo from '../img/logo.png';
// import navigation from '../_nav';
// import TemaCor from './TemaCor';
// import Button from 'react-bootstrap/Button';
// import { NavLink } from 'react-router-dom';
// import SimpleBar from 'simplebar-react';
// import 'simplebar-react/dist/simplebar.min.css';
// import { CBadge, CNavLink } from '@coreui/react';

// const AppSidebar = () => {
//   const dispatch = useDispatch();
//   const unfoldable = useSelector((state) => state.sidebarUnfoldable);
//   const sidebarShow = useSelector((state) => state.sidebarShow);

//   const navLink = (name, icon, badge, indent = false) => {
//     return (
//       <>
//         {icon ? icon : indent && (
//           <span className="nav-icon">
//             <span className="nav-icon-bullet"></span>
//           </span>
//         )}
//         {name && name}
//         {badge && (
//           <CBadge color={badge.color} className="ms-auto">
//             {badge.text}
//           </CBadge>
//         )}
//       </>
//     );
//   };

//   const navItem = (item, index, indent = false) => {
//     const { component, name, badge, icon, ...rest } = item;
//     const Component = component;
//     return (
//       <Component as="div" key={index}>
//         {rest.to || rest.href ? (
//           <CNavLink {...(rest.to && { as: NavLink })} {...rest}>
//             {navLink(name, icon, badge, indent)}
//           </CNavLink>
//         ) : (
//           navLink(name, icon, badge, indent)
//         )}
//       </Component>
//     );
//   };

//   const navGroup = (item, index) => {
//     const { component, name, icon, items, to, ...rest } = item;
//     const Component = component;
//     return (
//       <Component compact as="div" key={index} toggler={navLink(name, icon)} {...rest}>
//         {item.items?.map((item, index) =>
//           item.items ? navGroup(item, index) : navItem(item, index, true),
//         )}
//       </Component>
//     );
//   };

//   return (
//     <CSidebar
//       colorScheme="dark"
//       position="fixed"
//       unfoldable={unfoldable}
//       visible={sidebarShow}
//       onVisibleChange={(visible) => {
//         dispatch({ type: 'set', sidebarShow: visible });
//       }}
//     >
//       <CSidebarHeader className="d-flex align-items-center justify-content-between">
//         <CSidebarBrand to="/" className="position-relative w-100">
//           <TemaCor className="position-absolute top-0 start-0 m-2" />
//           <img
//             src={logo}
//             alt="Desenvolvimento"
//             style={{
//               maxWidth: '80%',
//               height: 'auto',
//               display: 'block',
//               margin: '0 auto',
//             }}
//           />
//         </CSidebarBrand>
//         <CSidebarToggler
//           onClick={() => dispatch({ type: 'set', sidebarUnfoldable: !unfoldable })}
//         />
//       </CSidebarHeader>
//       <CSidebarNav as={SimpleBar}>
//         {navigation.map((item, index) =>
//           item.items ? navGroup(item, index) : navItem(item, index),
//         )}
//       </CSidebarNav>
//       <CSidebarFooter className="d-none d-lg-flex">
//         <Button variant="danger">SAIR</Button>
//       </CSidebarFooter>
//     </CSidebar>
//   );
// };

// export default React.memo(AppSidebar);
