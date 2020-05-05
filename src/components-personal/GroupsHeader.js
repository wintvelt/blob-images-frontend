import React from 'react';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/styles';

const useStyles = makeStyles(theme => ({
    header: {
        padding: theme.spacing(3),
        color: 'white'
    }
}));

const GroupsHeader = () => {
    const classes = useStyles();
    return <Typography variant='h5' component='h2' className={classes.header}>
        Your Groups
    </Typography>
}

export default GroupsHeader;