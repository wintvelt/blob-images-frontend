import React, { useContext } from 'react';
import { UserContext } from './components-generic/UserContext';
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

const useStyles = makeStyles((theme) => ({
    nav: {
        backgroundColor: 'rgba(90,85,96,.5)',
        color: 'white',
        zIndex: theme.zIndex.drawer + 1,
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
    const userContext = useContext(UserContext);
    const { user } = userContext;

    return (
        <HideOnScroll {...props}>
            <AppBar className={classes.nav} elevation={0}>
                <Toolbar>
                    <Grid container spacing={1} alignItems='center' justify='center'>
                        <Grid item md={2} xs={6}>
                            <Link href='/' className={classes.homeLink}>
                                <img src='/img/logo_new3.png' width='60%' />
                            </Link>
                            <Hidden smDown><img src='/img/payoff.png' width='40%' /></Hidden>
                        </Grid>
                        <Grid item xs />
                        {/* {[
                            { text: 'Features', href: '/#features' },
                            { text: 'Pricing', href: '/#pricing' },
                            { text: 'Support', href: '#' },
                            { text: 'About', href: '#' },
                        ].map((props) => (
                            <Grid key={props.text} item xs={1}
                                style={{ display: 'flex', justifyContent: 'center' }}>
                                <NavLink {...props} />
                            </Grid>
                        ))} */}
                        {!user.isAuthenticated &&
                            <Grid item md={1} xs={4}
                                style={{ display: 'flex', justifyContent: 'center' }}>
                                <NavLink text='Sign up' href='/' outlined>sign up</NavLink>
                            </Grid>
                        }
                        {(user.isAuthenticated) && <Grid item md={1} xs={1}
                            style={{ display: 'flex', justifyContent: 'center' }}>
                            <NavLogin path='/login' />
                        </Grid>}
                    </Grid>
                </Toolbar>
            </AppBar>
        </HideOnScroll>
    );
}
