import React, { useState } from 'react';

import { makeStyles } from '@material-ui/core/styles'
import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';

import Link from '../components-generic/Link';
import { useUser } from '../components-generic/UserContext';
import { expireDate } from '../components-generic/helpers';

const useStyles = makeStyles(theme => ({
    inviteForm: {
        position: 'relative',
        padding: theme.spacing(4),
        backgroundColor: theme.palette.background.white,
        color: theme.palette.text.secondary,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'stretch',
        justifyContent: 'flex-start'
    },
    submit: {
        marginTop: theme.spacing(4)
    },
    declineButton: {
        marginTop: theme.spacing(2),
        marginBottom: theme.spacing(2)
    }
}));

const InviteForm = ({ invite, isLoading }) => {
    const user = useUser();
    const { profile } = user;
    const classes = useStyles();
    const [isSaving, setIsSaving] = useState(false);
    const isWaiting = isLoading || isSaving;
    const { invitation } = invite || {};
    const { group } = invite || {};
    const { from } = invitation || {};

    const onSubmit = (e) => {
        e.preventDefault();
        setIsSaving(true);
        alert('saving');
        setIsSaving(false);
    };

    const onDecline = (e) => {
        e.preventDefault();
        setIsSaving(true);
        alert('declining');
        setIsSaving(false);
    };

    const submitButtonContent = isWaiting ? <CircularProgress size='1.5rem' color='secondary' />
        : 'Accept invite';
    const declineButtonContent = isWaiting ? <CircularProgress size='1.5rem' color='secondary' />
        : 'Respectfully decline';

    return (
        <form name='invite-accept-form' noValidate>
            <Paper className={classes.inviteForm}>
                <div style={{ textAlign: 'center' }}>
                    <Typography component="h1" variant="h4" color="inherit"
                        align='center' gutterBottom>
                        You are invited!
                    </Typography>
                    <Typography variant='h5' align='center'>
                        {from && from.name}{' '}
                        cordially invites
                        {' '}{invite?.user?.name}
                    </Typography>
                    <Typography variant='h5' align='center' gutterBottom>
                        to join "{group && group.name}"
                    </Typography>
                    <img src='/img/invite_divider.png' alt='divider' width={64} />
                    {invitation && invitation.message.split('\n').map((line, i) => (
                        <Typography key={i} variant='body1' align='center'>
                            {line || '\u00A0'}
                        </Typography>
                    ))}
                    <img src='/img/invite_divider.png' alt='divider' width={64} />
                    <em><Typography variant='body1' align='center' gutterBottom style={{ marginTop: '16px' }}>
                        This invite is valid until{' '}{expireDate(invite.createdAt)}
                    </Typography></em>
                </div>
                <Button type='submit' variant='contained' color='secondary' className={classes.submit}
                    disabled={isWaiting}
                    onClick={onSubmit}>
                    {submitButtonContent}
                </Button>
                <Button variant='outlined' className={classes.declineButton}
                    disabled={isWaiting}
                    onClick={onSubmit}>
                    {declineButtonContent}
                </Button>
            </Paper>
        </form>
    )
};

export default InviteForm