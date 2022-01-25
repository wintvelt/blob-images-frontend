import React from 'react';
import PropTypes from 'prop-types';

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import useScrollTrigger from '@material-ui/core/useScrollTrigger';
import Slide from '@material-ui/core/Slide';
import Grid from '@material-ui/core/Grid';
import Hidden from '@material-ui/core/Hidden';
import { makeStyles } from '@material-ui/core/styles';

import Link from './components-generic/Link';
import NavLogin from './components-login/NavLogin';
import { useInitialUser } from './data/userData';
import { resetLoadingPath } from './data/loadingData';
import Announcement from './NavAlert';

const gridStyle = { display: 'flex', justifyContent: 'flex-end' };
const gridStyle2 = { display: 'flex', justifyContent: 'center' };

const isDevelopmentBranch = (process.env.NEXT_PUBLIC_BRANCH !== 'master');

const useStyles = makeStyles((theme) => ({
    nav: {
        backgroundColor: (isDevelopmentBranch) ? 'rgb(255,69,0)' : 'rgba(90,85,96,.5)',
        color: 'white',
        zIndex: theme.zIndex.drawer + 1,
    },
    homeLink: {
        maxHeight: theme.spacing(8),
    },
    navLink: {
        ...theme.typography.overline,
        color: theme.palette.primary.contrastText,
    },
    outlined: {
        ...theme.typography.button,
        color: theme.palette.primary.contrastText,
        padding: theme.spacing(0.5, 2),
        width: '100%',
        textAlign: 'center',
        borderWidth: '1px',
        borderStyle: 'solid',
        borderColor: theme.palette.primary.contrastText,
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
        activeClassName={classes.navLinkActive} hash={hash}>
        {text}
    </Link>
}

export default function HideAppBar(props) {
    const classes = useStyles();
    useInitialUser();
    resetLoadingPath();

    const branch = process.env.NEXT_PUBLIC_BRANCH || process.env.NODE_ENV || 'local';

    return (
        <HideOnScroll {...props}>
            <AppBar className={classes.nav} elevation={0}>
                <Toolbar>
                    <Announcement />
                    <Grid container spacing={1} alignItems='center' justifyContent='center'>
                        <Grid item md={3} xs={6}>
                            <Link href='/'>
                                <img src='/img/logo_fresh.png' height='40px' className={classes.homeLink} />
                            </Link>
                            <Hidden smDown><img src='/img/name.png' height='40px' /></Hidden>
                        </Grid>
                        <Grid item xs>
                            {isDevelopmentBranch &&
                                branch.toUpperCase() + ' versie'
                            }
                        </Grid>
                        {/* {[
                            { text: 'Features', href: '/#features' },
                            { text: 'Pricing', href: '/#pricing' },
                            { text: 'Support', href: '#' },
                            { text: 'About', href: '#' },
                        ].map((props) => (
                            <Grid key={props.text} item xs={1}
                                style={gridStyle2}>
                                <NavLink {...props} />
                            </Grid>
                        ))} */}
                        {/* {!user.isAuthenticated &&
                            <Grid item md={2} xs={3}
                                style={gridStyle2}>
                                <NavLink text='Sign up' href='/' outlined>sign up</NavLink>
                            </Grid>
                        } */}
                        <Grid item md={2} xs={3}
                            style={gridStyle}>
                            <NavLogin />
                        </Grid>
                    </Grid>
                </Toolbar>
            </AppBar>
        </HideOnScroll>
    );
}
