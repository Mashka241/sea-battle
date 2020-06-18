import React from 'react'
import classes from './header.module.scss'

const Header = () => {
  return (
    <header className={classes.Header}>
      <nav className={classes.HeaderNav}>
        <ul className={classes.HeaderNavList}>
          <li>game</li>
          <li>statistics</li>
        </ul>
      </nav>
    </header>
  )
}

export default Header
