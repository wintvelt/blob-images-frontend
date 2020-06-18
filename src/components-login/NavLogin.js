import React, { useState } from 'react';
import { useRouter } from 'next/router';

import Avatar from '@material-ui/core/Avatar';
import Icon from '@material-ui/core/Icon';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import Hidden from '@material-ui/core/Hidden';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';

import { makeImageUrl } from '../components-generic/imageProvider';
import { useUser, isInAuth } from '../data/userData';
import NavMenu from './NavLogin-Menu';
import NavDrawer from './NavLogin-Drawer';

const userMenu = [
    { icon: 'group', text: 'Groups', href: '/personal/groups' },
    { icon: 'mail_outline', text: 'Invitations' },
    { icon: 'photo_library', text: 'My photos', href: '/personal/photos' },
    { icon: 'settings', text: 'My account', href: '/personal/profile' },
    { icon: 'exit_to_app', text: 'Logout', action: 'logout' },
];

const useStyles = makeStyles((theme) => ({
    userButton: {
        marginBottom: '3px',
        textTransform: 'none',
        color: theme.palette.primary.contrastText,
    },
    navLink: {
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
        color: 'inherit',
        '&:hover': {
            textDecoration: 'none'
        }
    },
    menuLinkActive: {
        display: 'flex',
        alignItems: 'center',
        '&:hover': {
            textDecoration: 'none'
        }
    },
    active: { color: theme.palette.primary.main },
}));

export default function NavLogin(props) {
    const classes = useStyles();
    const { user, logout, setPath } = useUser();
    const router = useRouter();
    const isAuthPath = isInAuth(router.pathname);
    const { name, email, avatar } = user.profile || {};
    const avatarSrc = makeImageUrl(avatar, 40, 40);
    const [menuAnchor, setMenuAnchor] = useState(null);
    const handleClick = (e) => {
        setMenuAnchor(e.target)
    };
    const handleClose = () => {
        setMenuAnchor(null);
    }
    const handleLogout = () => {
        logout();
        setMenuAnchor(null);
    }
    const handleMenuClick = (action) => {
        if (action === 'logout') return handleLogout;
        return handleClose;
    }

    return (
        <>
            {user.isAuthenticated &&
                <>
                    <Hidden smDown>
                        <Button className={classes.userButton}
                            aria-controls="simple-menu" aria-haspopup="true"
                            onClick={handleClick}
                            endIcon={<Icon>expand_more</Icon>}
                        >
                            <Avatar className={classes.avatar}
                                alt={'user name'} src={avatarSrc} />
                            <Typography noWrap>{name || email}</Typography>
                        </Button>
                    </Hidden>
                    <Hidden smDown>
                        <NavMenu menu={userMenu}
                            onClick={handleMenuClick} onClose={handleClose} isOpen={!!menuAnchor}
                            anchor={menuAnchor}
                            menuLinkActiveClass={classes.menuLinkActive} menuLinkClass={classes.menuLink}
                            iconActiveClass={classes.active} iconInactiveClass={classes.inActive}
                            pathname={router.pathname} />
                    </Hidden>
                    <Hidden mdUp>
                        <IconButton
                            aria-controls="simple-menu" aria-haspopup="true"
                            onClick={handleClick}
                        >
                            <Icon>menu</Icon>
                        </IconButton>
                    </Hidden>
                    <Hidden mdUp>
                        <NavDrawer menu={userMenu} pathname={router.pathname}
                            avatar={avatar} name={name}
                            isOpen={!!menuAnchor} onClose={handleClose} onClick={handleMenuClick}
                            menuLinkActiveClass={classes.menuLinkActive} menuLinkClass={classes.menuLink}
                            iconActiveClass={classes.active} iconInactiveClass={classes.inActive} />
                    </Hidden>
                </>
            }
            {
                (!user.isAuthenticated && !isAuthPath) &&
                <Button disableElevation
                    variant='contained'
                    disabled={!!user.path || user.isAuthenticating}
                    onClick={() => setPath('/login')}>
                    Login
                </Button>
            }
        </>
    );
}
