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

import Link from '../components-generic/Link';
import { UserContext } from '../components-generic/UserContext';
import { Auth } from 'aws-amplify';

const userMenu = [
    { icon: 'group', text: 'Groups', href: '/personal/groups' },
    { icon: 'mail_outline', text: 'Invitations' },
    { icon: 'photo_library', text: 'My photos' },
    { icon: 'settings', text: 'My account' },
    { icon: 'exit_to_app', text: 'Logout', action: 'logout' },
];

const useStyles = makeStyles((theme) => ({
    userButton: {
        marginBottom: '3px',
        padding: '2px',
        textTransform: 'none',
        color: theme.palette.primary.contrastText,
    },
    navLink: {
        marginLeft: theme.spacing(1),
        ...theme.typography.button,
        color: theme.palette.primary.contrastText,
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
        color: theme.palette.primary.main,
        textDecorationColor: theme.palette.primary.main,
        '&:hover': {
            textDecoration: 'none'
        }
    },
    menuLinkActive: {
        display: 'flex',
        alignItems: 'center',
        color: theme.palette.secondary.main,
        textDecorationColor: theme.palette.secondary.main,
        '&:hover': {
            textDecoration: 'none'
        }
    },
    active: { color: theme.palette.secondary.main },
    inActive: { color: theme.palette.primary.light },
}));

export default function NavLogin(props) {
    const { path } = props;
    const classes = useStyles();
    const userContext = useContext(UserContext);
    const router = useRouter();
    const { user, setUser } = userContext;
    const name = user.profile['custom:name'];
    const avatarUrl = user.profile['custom:avatarUrl'];
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
        router.push('/');
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
                                            <Icon fontSize="small" className={
                                                (router.pathname === menuItem.href) ?
                                                    classes.active
                                                    : classes.inActive
                                            }>
                                                {menuItem.icon}
                                            </Icon>
                                        </ListItemIcon>
                                        <ListItemText primary={menuItem.text}
                                            style={{ paddingRight: '16px' }} />
                                    </Link>
                                    :
                                    <div className={
                                        (router.pathname === menuItem.href) ?
                                            classes.menuLinkActive
                                            : classes.menuLink}>
                                        <ListItemIcon>
                                            <Icon fontSize="small" className={
                                                (router.pathname === menuItem.href) ?
                                                    classes.active
                                                    : classes.inActive
                                            }>{menuItem.icon}</Icon>
                                        </ListItemIcon>
                                        <ListItemText primary={menuItem.text}
                                            style={{ paddingRight: '16px' }} />
                                    </div>
                                }
                            </MenuItem>
                        ))}
                    </Menu>
                </>
            }
            {
                !user.isAuthenticated &&
                <Link className={classes.navLink}
                    href={path}>
                    Login
                </Link>
            }
        </>
    );
}
