import React from 'react';
import Icon from '@material-ui/core/Icon';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';

import Link from '../components-generic/Link';

import { makeStyles } from '@material-ui/core/styles';
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
import Button from '@material-ui/core/Button';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';

const useStyles = makeStyles({
    list: {
        width: 250,
    },
    fullList: {
        width: 'auto',
    },
});

export default function SwipeableTemporaryDrawer({ isOpen, onClose }) {
    const classes = useStyles();

    const handleKey = (event) => {
        if (event && event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
            return;
        }
        onClose()
    };

    const list = (anchor) => (
        <div
            className={classes.list}
            role="presentation"
            onClick={onClose}
            onKeyDown={handleKey}
        >
            <List>
                {['Inbox', 'Starred', 'Send email', 'Drafts'].map((text) => (
                    <ListItem button key={text}>
                        <ListItemIcon>
                            <Icon>inbox</Icon>
                        </ListItemIcon>
                        <ListItemText primary={text} />
                    </ListItem>
                ))}
            </List>
        </div>
    );

    return (
        <SwipeableDrawer
            anchor='left'
            open={isOpen}
            onClose={onClose}
            onOpen={onClose}
        >
            {list('left')}
        </SwipeableDrawer>
    );
}


// const NavMenu = ({ menu, onClick, onClose, anchorEl, menuLinkClass, menuLinkActiveClass, pathname,
//     iconActiveClass, iconInactiveClass }) => (