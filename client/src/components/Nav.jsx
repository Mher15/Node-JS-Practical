import React, { useEffect } from 'react'
import { useNavigate } from "react-router-dom";
import { AuthData } from "../App";
import { Button } from './Button'
import styles from '../styles/nav.module.scss'

export const Nav = () => {
  const { LogOut, user } = AuthData();
  const navigate = useNavigate();

  const onLogOut = () => {
    LogOut()
    return navigate("/auth");
  }

  return (
    <nav className={styles.nav}>
      <div className={styles.log_out_section}>
        <Button label='Log out' onclick={onLogOut} />
      </div>
    </nav>
  )
}
