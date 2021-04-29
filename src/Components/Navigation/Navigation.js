import React from 'react';
import { AppBar, Toolbar } from '@material-ui/core';
import routes from '../../routes';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { authSelectors } from '../../redux/auth';

import AuthNav from './AuthNav';
import Logout from './Logout';
import s from './Navigation.module.css';

function Navigation() {
  const isAuthenticated = useSelector(authSelectors.getIsAuthenticated);

  return (
    <AppBar position="sticky">
      <Toolbar className={s.mainNav}>
        <div>
          <NavLink
            to={routes.home}
            exact
            className={s.mainLink}
            activeClassName={s.mainLinkActive}
          >
            Home
          </NavLink>
          {isAuthenticated && (
            <NavLink
              to={routes.lists}
              className={s.mainLink}
              activeClassName={s.mainLinkActive}
            >
              Lists
            </NavLink>
          )}
          {isAuthenticated && (
            <NavLink
              to={routes.items}
              className={s.mainLink}
              activeClassName={s.mainLinkActive}
            >
              Items
            </NavLink>
          )}
        </div>
        {isAuthenticated ? <Logout /> : <AuthNav />}
      </Toolbar>
    </AppBar>
  );
}

export default Navigation;
