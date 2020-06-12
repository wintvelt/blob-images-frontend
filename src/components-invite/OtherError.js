import React from 'react';

import { makeStyles } from '@material-ui/core/styles'
import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography'

const useStyles = makeStyles(theme => ({
    root: {
        position: 'relative',
        padding: theme.spacing(4),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'flex-start'
    },
}));

const OtherErrorCard = ({ invite }) => {
    const classes = useStyles();

    return (
        <Paper className={classes.root}>
            <Typography component="h1" variant="h4" color='error'
                align='center' gutterBottom>
                You may be invited
            </Typography>
            <img src='/img/invite_divider.png' alt='divider' width={64} />
            <Typography paragraph variant='subtitle1' color='error'>
                But at this time the invite is unavailable
            </Typography>
            <Typography variant='body1' align='center' gutterBottom>
                Possible reasons could be<br />
                <br />
                    ‣ The invite was accepted or declined before<br />
                    ‣ The invite has expired (invites are valid for 30 days)<br />
                    ‣ Our service may be unreachable<br />
                    ‣ The link is not correct, you could try again from the invite mail<br />
                <br />
                Maybe try again later?
            </Typography>
            <img src='/img/invite_divider.png' alt='divider' width={64} />
        </Paper>
    )
};

export default OtherErrorCard;