import React from 'react';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/styles';

const useStyles = makeStyles(theme => ({
    header: {
        padding: theme.spacing(3),
        color: 'white'
    }
}));

const Header = ({children}) => {
    const classes = useStyles();
    return <Typography variant='h5' component='h2' className={classes.header}>
        {children}
    </Typography>
}

export default Header;