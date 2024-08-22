import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  CSidebar,
  CSidebarBrand,
  CSidebarFooter,
  CSidebarHeader,
  CSidebarToggler,
} from '@coreui/react';
import { AppHeaderDropdown } from './header/index';
import { AppSidebarNav } from './AppSidebarNav';
import logo from '../img/logo.png';
import navigation from '../_nav';
import TemaCor from './TemaCor';

const AppSidebar = () => {
  const dispatch = useDispatch();
  const unfoldable = useSelector((state) => state.sidebarUnfoldable);
  const sidebarShow = useSelector((state) => state.sidebarShow);

  return (
    <CSidebar
      colorScheme="dark"
      position="fixed"
      unfoldable={unfoldable}
      visible={sidebarShow}
      onVisibleChange={(visible) => {
        dispatch({ type: 'set', sidebarShow: visible });
      }}
    >
      <CSidebarHeader className="d-flex align-items-center justify-content-between">
        <CSidebarBrand to="/" className="position-relative w-100">
          <TemaCor className="position-absolute top-0 start-0 m-2" />
          <img
            src={logo}
            alt="Desenvolvimento"
            style={{
              maxWidth: '80%',
              height: 'auto',
              display: 'block',
              margin: '0 auto',
            }}
          />
        </CSidebarBrand>
        <CSidebarToggler
          onClick={() => dispatch({ type: 'set', sidebarUnfoldable: !unfoldable })}
        />
      </CSidebarHeader>
      <AppSidebarNav items={navigation} />
      <CSidebarFooter className="d-none d-lg-flex">
        <AppHeaderDropdown />
        <div>
          <span className="cap">Vox</span>
          <span className="dev">Tec</span>
        </div>
      </CSidebarFooter>
    </CSidebar>
  );
};

export default React.memo(AppSidebar);
