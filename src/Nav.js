import React from 'react';
import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import useScrollTrigger from '@material-ui/core/useScrollTrigger';
import Slide from '@material-ui/core/Slide';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    nav: {
        background: 'none',
        color: 'white',
    },
    title: {
        fontSize: '100%',
        fontWeight: 'light'
    },
    avatar: {
        width: theme.spacing(4),
        height: theme.spacing(4),
    },
    logo: {
        height: '24px',
        marginRight: theme.spacing(2),
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

export default function HideAppBar(props) {
    const classes = useStyles();
    return (
        <HideOnScroll {...props}>
            <AppBar className={classes.nav} elevation={0}>
                <Toolbar>
                    <Avatar alt="Photo duck icon" src="/duck icon.png" className={classes.avatar} />
                    <img src='duck logo.png' className={classes.logo} />
                    <Typography variant="button" component='h1'>Photo sharing for teams</Typography>
                </Toolbar>
            </AppBar>
        </HideOnScroll>
    );
}
