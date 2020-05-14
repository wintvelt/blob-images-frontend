import React, { useContext, useState } from 'react';
import { useRouter } from 'next/router';
import { UserContext } from '../components-generic/UserContext';
import { Auth } from 'aws-amplify';

import Avatar from '@material-ui/core/Avatar';
import Icon from '@material-ui/core/Icon';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import Hidden from '@material-ui/core/Hidden';
import { makeStyles } from '@material-ui/core/styles';

import Link from '../components-generic/Link';
import NavMenu from './NavLogin-Menu';
import NavDrawer from './NavLogin-Drawer';

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
        // color: theme.palette.primary.contrastText,
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
        // color: theme.palette.primary.main,
        // textDecorationColor: theme.palette.primary.main,
        '&:hover': {
            textDecoration: 'none'
        }
    },
    menuLinkActive: {
        display: 'flex',
        alignItems: 'center',
        // color: theme.palette.secondary.main,
        // textDecorationColor: theme.palette.secondary.main,
        '&:hover': {
            textDecoration: 'none'
        }
    },
    active: { color: theme.palette.primary.main },
    // inActive: { color: theme.palette.primary.light },
}));

export default function NavLogin(props) {
    const { path } = props;
    const classes = useStyles();
    const userContext = useContext(UserContext);
    const router = useRouter();
    const { user, setUser } = userContext;
    const name = user.profile['custom:name'];
    const avatarUrl = user.profile['custom:avatarUrl'];
    const [menuAnchor, setMenuAnchor] = useState(null);
    const handleClick = (e) => {
        setMenuAnchor(e.target)
    };
    const handleClose = () => {
        setMenuAnchor(null);
    }
    const handleLogout = async () => {
        Auth.signOut();
        setUser({ profile: false, isAuthenticated: false })
        setMenuOpen(null);
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
                    <Hidden smDown>
                        <Button className={classes.userButton}
                            aria-controls="simple-menu" aria-haspopup="true"
                            onClick={handleClick}
                            endIcon={<Icon>expand_more</Icon>}
                        >
                            <Avatar className={classes.avatar}
                                alt={'user name'} src={avatarUrl} />
                            {name}
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
                            avatarUrl={avatarUrl} name={name}
                            isOpen={!!menuAnchor} onClose={handleClose} onClick={handleMenuClick}
                            menuLinkActiveClass={classes.menuLinkActive} menuLinkClass={classes.menuLink}
                            iconActiveClass={classes.active} iconInactiveClass={classes.inActive} />
                    </Hidden>
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
