import React from 'react'
import { NavLink } from 'react-router-dom'
import classes from './header.module.scss'

const Header = () => {
  return (
    <header className={classes.Header}>
      <nav className={classes.HeaderNav}>
        <ul className={classes.HeaderNavList}>
          <li className={classes.HeaderNavListItem}>
            <NavLink to='/'>main</NavLink>
          </li>
          <li className={classes.HeaderNavListItem}>
            <NavLink to='/statistics'>statistics</NavLink>
          </li>
        </ul>
      </nav>
    </header>
  )
}

export default Header
