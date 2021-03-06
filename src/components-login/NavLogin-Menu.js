import React from 'react';
import Icon from '@material-ui/core/Icon';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';

import Link from '../components-generic/Link';

const paddingRight = { paddingRight: '16px' };

const NavMenu = ({ menu, onClick, onClose, isOpen, anchor, menuLinkClass, menuLinkActiveClass, pathname,
    iconActiveClass, iconInactiveClass }) => (
        <Menu
            id='user-menu'
            anchorEl={anchor}
            getContentAnchorEl={null}
            anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
            }}
            transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
            }}
            keepMounted
            open={!!isOpen}
            onClose={onClose}
        >
            {menu.map((menuItem, i) => (
                <MenuItem key={i}
                    onClick={onClick(menuItem.action)} >
                    {(menuItem.href) ?
                        <Link href={menuItem.href}
                            className={(pathname === menuItem.href) ?
                                menuLinkActiveClass
                                : menuLinkClass
                            }
                            style={(menuItem.isRed) ? { color: 'red' } : {}}>
                            <ListItemIcon>
                                <Icon fontSize="small"
                                    className={(pathname === menuItem.href) ?
                                        iconActiveClass
                                        : iconInactiveClass
                                    }
                                    style={(menuItem.isRed) ? { color: 'red' } : {}}>
                                    {menuItem.icon}
                                </Icon>
                            </ListItemIcon>
                            <ListItemText primary={menuItem.text}
                                style={paddingRight} />
                        </Link>
                        :
                        <div className={
                            (pathname === menuItem.href) ?
                                menuLinkActiveClass
                                : menuLinkClass}>
                            <ListItemIcon>
                                <Icon fontSize="small"
                                    className={(pathname === menuItem.href) ?
                                        iconActiveClass
                                        : iconInactiveClass
                                    }
                                    style={(menuItem.isRed) ? { color: 'red' } : {}}>
                                    {menuItem.icon}</Icon>
                            </ListItemIcon>
                            <ListItemText primary={menuItem.text}
                                style={paddingRight} />
                        </div>
                    }
                </MenuItem>
            ))}
        </Menu>
    )

export default NavMenu;
