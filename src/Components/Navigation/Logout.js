import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { authOperations, authSelectors } from '../../redux/auth';
import { Button } from '@material-ui/core';
import s from './Navigation.module.css';

function Logout() {
  const name = useSelector(authSelectors.getUsername);
  const avatar = useSelector(authSelectors.getAvatar);

  const dispatch = useDispatch();

  return (
    <div className={s.mainLogout}>
      <span className={s.nameUser}>Welcome, {name}</span>
      <img src={avatar} alt="avatar" width="40px" />
      <Button
        variant="contained"
        color="primary"
        style={{ marginLeft: 10 }}
        onClick={() => dispatch(authOperations.logoutUser())}
      >
        Logout
      </Button>
    </div>
  );
}

export default Logout;
