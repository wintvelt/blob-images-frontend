import React from 'react';
import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import useScrollTrigger from '@material-ui/core/useScrollTrigger';
import Slide from '@material-ui/core/Slide';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    nav: {
        backgroundColor: 'rgba(255,255,255,0.2)',
    },
}));


function HideOnScroll(props) {
    const { children, window } = props;
    // Note that you normally won't need to set the window ref as useScrollTrigger
    // will default to window.
    // This is only being set here because the demo is in an iframe.
    const trigger = useScrollTrigger({ target: window ? window() : undefined });

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
            <AppBar className={classes.nav}>
                <Toolbar>
                    <Typography variant="h6">Scroll to Hide App Bar</Typography>
                </Toolbar>
            </AppBar>
        </HideOnScroll>
    );
}
