import React, { useContext, useState } from 'react';
import { useRouter } from 'next/router';
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
    { icon: 'group', text: 'Groups', href: '/personal/groups' },
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
    menuLink: {
        display: 'flex',
        alignItems: 'center',
        color: theme.palette.secondary.contrastText,
        textDecorationColor: theme.palette.secondary.contrastText,
        '&:hover': {
            textDecoration: 'none'
        }
    },
    menuLinkActive: {
        display: 'flex',
        alignItems: 'center',
        color: theme.palette.primary.main,
        textDecorationColor: theme.palette.primary.main,
        '&:hover': {
            textDecoration: 'none'
        }
    }
}));

export default function NavLogin(props) {
    const { path } = props;
    const classes = useStyles();
    const userContext = useContext(UserContext);
    const router = useRouter();
    const { user, setUser } = userContext;
    const { name, avatarUrl } = user.profile || {};
    const [anchorEl, setAnchorEl] = useState(null);
    const handleClick = (e) => {
        setAnchorEl(e.currentTarget)
    };
    const handleClose = () => {
        setAnchorEl(null);
    }
    const handleLogout = async () => {
        Auth.signOut();
        setUser({ profile: false, isAuthenticated: false })
        setAnchorEl(null);
        router.replace('/');
    }
    const handleMenuClick = (action) => {
        if (action === 'logout') return handleLogout;
        return handleClose;
    }

    return (
        <>
            {user.isAuthenticated &&
                <>
                    <Button className={classes.userButton}
                        aria-controls="simple-menu" aria-haspopup="true"
                        onClick={handleClick}
                        endIcon={<Icon>arrow_drop_down</Icon>}
                    >
                        <Avatar className={classes.avatar}
                            alt={'user name'} src={avatarUrl} />
                        {name}
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
                            <MenuItem key={i}
                                onClick={handleMenuClick(menuItem.action)} >
                                {(menuItem.href) ?
                                    <Link href={menuItem.href} className={
                                        (router.pathname === menuItem.href) ?
                                            classes.menuLinkActive
                                            : classes.menuLink
                                    }>
                                        <ListItemIcon>
                                            <Icon fontSize="small" color={
                                                (router.pathname === menuItem.href) ?
                                                    'primary'
                                                    : 'inherit'
                                            }>
                                                {menuItem.icon}
                                            </Icon>
                                        </ListItemIcon>
                                        <ListItemText primary={menuItem.text}
                                            style={{ paddingRight: '16px' }} />
                                    </Link>
                                    :
                                    <>
                                        <ListItemIcon>
                                            <Icon fontSize="small">{menuItem.icon}</Icon>
                                        </ListItemIcon>
                                        <ListItemText primary={menuItem.text}
                                            style={{ paddingRight: '16px' }} />
                                    </>
                                }
                            </MenuItem>
                        ))}
                    </Menu>
                </>
            }
            {!user.isAuthenticated &&
                <Link className={classes.navLink}
                    href={path}>
                    Login
                </Link>
            }
        </>
    );
}
