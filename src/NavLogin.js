import React, { useContext, useState } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Icon from '@material-ui/core/Icon';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import { makeStyles } from '@material-ui/core/styles';

import Link from './Link';
import { UserContext } from './UserContext';
import { Auth } from 'aws-amplify';

const userMenu = [
    { icon: 'move_to_inbox', text: 'Inbox' },
    { icon: 'photo_library', text: 'Photos' },
    { icon: 'group', text: 'Groups' },
    { icon: 'settings', text: 'Profile' },
    { icon: 'exit_to_app', text: 'Logout', action: 'logout' },
];

const useStyles = makeStyles((theme) => ({
    userButton: {
        marginLeft: theme.spacing(1),
        textTransform: 'none'
    },
    navLink: {
        marginLeft: theme.spacing(1),
        ...theme.typography.button,
        color: theme.palette.secondary.contrastText,
        marginLeft: theme.spacing(2),
        marginRight: theme.spacing(2),
    },
    avatar: {
        height: theme.spacing(2),
        width: theme.spacing(2),
        marginRight: theme.spacing(1),
    },
}));

export default function NavLogin(props) {
    const { path } = props;
    const classes = useStyles();
    const userContext = useContext(UserContext);
    const { user, setUser } = userContext;
    const { userName, avatarUrl } = user;
    const [anchorEl, setAnchorEl] = useState(null);
    const handleClick = (e) => {
        setAnchorEl(e.currentTarget)
    };
    const handleClose = () => {
        setAnchorEl(null);
    }
    const handleLogout = async () => {
        Auth.signOut();
        setAnchorEl(null);
        setUser({ user: false })
    }
    const handleMenuClick = (action) => {
        if (action === 'logout') return handleLogout;
        return handleClose;
    }

    return (
        <>
            {user.user &&
                <>
                    <Button className={classes.userButton}
                        aria-controls="simple-menu" aria-haspopup="true"
                        onClick={handleClick}
                        endIcon={<Icon>arrow_drop_down</Icon>}
                    >
                        <Avatar className={classes.avatar}
                            alt={userName} src={avatarUrl} />
                        Hi there {userName}
                    </Button>
                    <Menu
                        id='user-menu'
                        anchorEl={anchorEl}
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
                        open={!!anchorEl}
                        onClose={handleClose}
                    >
                        {userMenu.map((menuItem, i) => (
                            <MenuItem onClick={handleMenuClick(menuItem.action)} key={i}>
                                <ListItemIcon>
                                    <Icon fontSize="small">{menuItem.icon}</Icon>
                                </ListItemIcon>
                                <ListItemText primary={menuItem.text} style={{ paddingRight: '16px' }} />
                            </MenuItem>
                        ))}
                    </Menu>
                </>
            }
            {!user.user &&
                <Link className={classes.navLink}
                    href={path}>
                    Login
                </Link>
            }
        </>
    );
}
