import React from 'react';
import Icon from '@material-ui/core/Icon';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';

import Link from '../components-generic/Link';

import { makeStyles } from '@material-ui/core/styles';
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Avatar from '@material-ui/core/Avatar';
import { makeImageUrl } from '../components-generic/imageProvider';

const useStyles = makeStyles({
    list: {
        width: 250,
    },
    fullList: {
        width: 'auto',
    },
});

const paddingRight = { paddingRight: '16px' };
const headerStyle = { backgroundColor: 'black', color: 'white' };

export default function SwipeableTemporaryDrawer({ menu, isOpen, onClose, onClick, pathname,
    menuLinkClass, menuLinkActiveClass, name, avatar,
    iconActiveClass, iconInactiveClass }) {
    const classes = useStyles();
    const avatarUrl = makeImageUrl(avatar, 40, 40);

    const handleKey = (event) => {
        if (event && event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
            return;
        }
        onClose()
    };

    const list = (menu) => (
        menu.map((menuItem, i) => (
            <ListItem button key={i} onClick={onClick(menuItem.action)}
                selected={(pathname === menuItem.href)}>
                {(menuItem.href) ?
                    <Link href={menuItem.href} className={menuLinkClass}>
                        <ListItemIcon>
                            <Icon fontSize="small" className={iconInactiveClass}>
                                {menuItem.icon}
                            </Icon>
                        </ListItemIcon>
                        <ListItemText primary={menuItem.text}
                            style={paddingRight} />
                    </Link>
                    :
                    <>
                        <ListItemIcon>
                            <Icon fontSize="small" className={
                                (pathname === menuItem.href) ?
                                    iconActiveClass
                                    : iconInactiveClass
                            }>{menuItem.icon}</Icon>
                        </ListItemIcon>
                        <ListItemText primary={menuItem.text}
                            style={paddingRight} />
                    </>
                }
            </ListItem>
        ))
    );

    return (
        <SwipeableDrawer
            anchor='left'
            open={isOpen}
            onClose={onClose}
            onOpen={onClose}
        >
            <div
                className={classes.list}
                role="presentation"
                onClick={onClose}
                onKeyDown={handleKey}
            >
                <ListItem style={headerStyle} divider>
                    <ListItemIcon>
                        <Avatar src={avatarUrl} />
                    </ListItemIcon>
                    <ListItemText primary={name} />
                </ListItem>
                <List>
                    {list(menu)}
                </List>
            </div>
        </SwipeableDrawer>
    );
}


// const NavMenu = ({ menu, onClick, onClose, anchorEl, menuLinkClass, menuLinkActiveClass, pathname,
//     iconActiveClass, iconInactiveClass }) => (