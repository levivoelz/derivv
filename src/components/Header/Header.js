import React from 'react'
import { IndexLink, Link } from 'react-router'
import AppBar from 'material-ui/AppBar';
import classes from './Header.scss'

export const Header = () => (
  <AppBar
    title="Derivv"
    iconClassNameRight="muidocs-icon-navigation-expand-more"
    showMenuIconButton={false} />
)

export default Header
