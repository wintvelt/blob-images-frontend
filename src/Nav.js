import React from 'react';
import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import useScrollTrigger from '@material-ui/core/useScrollTrigger';
import Slide from '@material-ui/core/Slide';
import { makeStyles } from '@material-ui/core/styles';

import Link from './Link';
import NavLogin from './NavLogin';

const useStyles = makeStyles((theme) => ({
    nav: {
        backgroundColor: 'rgba(70,52,78,.9)',
        color: 'white',
    },
    title: {
        fontSize: '100%',
        fontWeight: 'light',
    },
    avatar: {
        width: theme.spacing(4),
        height: theme.spacing(4),
    },
    homeLink: {
        display: 'flex',
        alignItems: 'center'
    },
    logo: {
        height: '24px',
        marginRight: theme.spacing(2),
        marginBottom: '2px',
    },
    navMenu: {
        flexGrow: 1,
        display: 'flex',
        justifyContent: 'flex-end',
        paddingRight: theme.spacing(2),
    },
    navLink: {
        ...theme.typography.overline,
        color: theme.palette.secondary.contrastText,
        marginLeft: theme.spacing(2),
        marginRight: theme.spacing(2),
    },
    outlined: {
        ...theme.typography.button,
        color: theme.palette.secondary.contrastText,
        marginLeft: theme.spacing(1),
        marginRight: theme.spacing(1),
        padding: theme.spacing(0.5, 2),
        borderWidth: '1px',
        borderStyle: 'solid',
        borderColor: theme.palette.secondary.contrastText,
        borderRadius: '4px',
    }
}));


function HideOnScroll(props) {
    const { children, window } = props;
    // Note that you normally won't need to set the window ref as useScrollTrigger
    // will default to window.
    // This is only being set here because the demo is in an iframe.
    const trigger = useScrollTrigger({
        target: window ? window() : undefined,
        threshold: 64
    });

    return (
        <Slide appear={false} direction="down" in={!trigger}>
            {children}
        </Slide>
    );
}

HideOnScroll.propTypes = {
    children: PropTypes.element.isRequired,
};

const NavLink = (props) => {
    const { text, href, outlined, hash } = props;
    const classes = useStyles();
    return <Link href={href} className={outlined ? classes.outlined : classes.navLink}
        activeClassName={classes.navLinkActive} hash={props.hash}>
        {text}
    </Link>
}

export default function HideAppBar(props) {
    const classes = useStyles();

    return (
        <HideOnScroll {...props}>
            <AppBar className={classes.nav} elevation={0}>
                <Toolbar>
                    <Link href='/' className={classes.homeLink}>
                        <Avatar alt="Photo duck icon" src="/duck icon.png" className={classes.avatar} />
                        <img src='duck logo.png' className={classes.logo} />
                    </Link>
                    <Typography variant="overline" component='h1' className={classes.title}>
                        Photo sharing for teams
                    </Typography>
                    <div className={classes.navMenu}>
                        {[
                            { text: 'Features', href: '/#features' },
                            { text: 'Pricing', href: '/#pricing' },
                            { text: 'Support', href: '#' },
                            { text: 'About', href: '#' },
                        ].map((props) => <NavLink key={props.text} {...props} />)}
                    </div>
                    <NavLink text='Sign up' href='/' outlined>sign up</NavLink>
                    <NavLogin path='/login' />
                </Toolbar>
            </AppBar>
        </HideOnScroll>
    );
}
