import React, { useState } from 'react';
import { Auth } from "aws-amplify";
import { useRouter } from 'next/router';

import { makeStyles } from '@material-ui/core/styles'
import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button';

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

const ForOtherCard = ({onLogout}) => {
    const classes = useStyles();

    return (
        <Paper className={classes.root}>
            <Typography component="h1" variant="h4"
                align='center' gutterBottom>
                You may be invited
            </Typography>
            <img src='/img/invite_divider.png' alt='divider' width={64} />
            <Typography paragraph variant='subtitle1'>
                But this may not be the invite you are looking for
            </Typography>
            <Typography variant='body1' align='center'>
                The invite we tried to retrieve is addressed to an existing account<br />
                But not the account you are currently logged in to<br />
                <br />
                You could try to {' '}
                <Button type='submit' variant='contained' color='secondary' size='small' disableElevation
                    onClick={onLogout}>
                    Log out
                </Button>{' '}and log back in to a different account<br />
                <br />
                Or contact the person who invited you.
            </Typography>
            <img src='/img/invite_divider.png' alt='divider' width={64} />
        </Paper>
    )
};

export default ForOtherCard;