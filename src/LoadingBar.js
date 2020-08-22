import React from 'react';

import LinearProgress from '@material-ui/core/LinearProgress';
import Fade from '@material-ui/core/Fade';
import { makeStyles } from '@material-ui/core';

import { useLoadingValue } from './data/loadingData';

const useStyles = makeStyles(theme => ({
    root: {
        position: 'fixed',
        top: 0,
        width: '100%',
        zIndex: theme.zIndex.drawer+10,
    }
}));

const LoadingBar = () => {
    const isLoading = useLoadingValue();
    const classes = useStyles();
    return <Fade
        in={isLoading}
        style={{
            transitionDelay: isLoading ? '800ms' : '0ms',
        }}
        unmountOnExit
    >
        <LinearProgress className={classes.root} />
    </Fade>
};

export default LoadingBar;
