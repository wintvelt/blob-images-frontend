import React, { useState } from 'react';

import { makeStyles } from '@material-ui/core/styles'
import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';

import { expireDate } from '../components-generic/helpers';
import { useApiDataValue } from '../data/apiData';
import { TextSkeleton } from '../components-generic/Skeleton';

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
    button: {
        marginTop: theme.spacing(1),
        marginBottom: theme.spacing(1)
    }
}));

const InviteForm = ({ invite, isLoading, profile }) => {
    const classes = useStyles();
    const [isSaving, setIsSaving] = useState(false);
    const isWaiting = isLoading || isSaving;
    const { invitation, group } = invite || {};
    const { from } = invitation || {};
    const groupData = useApiDataValue('group', `/groups/${group?.id}`);
    const isAlreadyMember = (!groupData.isLoading && !groupData.isError);
    const toEmail = invite?.user?.email;
    const isToDifferentEmail = profile.email && profile.email !== toEmail;

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
        : (isAlreadyMember) ?
            'Clear invite'
            : 'Accept invite';
    const declineButtonContent = isWaiting ? <CircularProgress size='1.5rem' color='secondary' />
        : 'Respectfully decline';

    return (
        <form name='invite-accept-form' noValidate>
            <Paper className={classes.inviteForm}>
                <Typography component="h1" variant="h4" color="inherit"
                    align='center' gutterBottom>
                    You are invited
                    {isAlreadyMember && ' (again)'}
                    !
                    </Typography>
                {(!isLoading) && <div style={{ textAlign: 'center' }}>
                    <TextSkeleton isLoading={isLoading}>
                        <Typography variant='h5' align='center' gutterBottom>
                            {from && from.name}{' '}
                            cordially invites
                            {' '}{invite?.user?.name}<br />
                            to join "{group && group.name}"
                        </Typography>
                    </TextSkeleton>
                    <img src='/img/invite_divider.png' alt='divider' width={64} />
                    <Typography variant='body1' align='center' gutterBottom>
                        {invitation && invitation.message.split('\n').map((line, i) => (
                            <React.Fragment key={i}>{line}<br /></React.Fragment>
                        ))}
                    </Typography>
                    <img src='/img/invite_divider.png' alt='divider' width={64} />
                    <em><Typography variant='body1' align='center' gutterBottom style={{ marginTop: '16px' }}>
                        This invite is valid until{' '}{expireDate(invite.createdAt)}
                    </Typography></em>
                    {isToDifferentEmail && <Typography variant='body2' align='center' gutterBottom style={{ marginTop: '16px' }}>
                        Originally addressed to{' '}{toEmail} <br />
                        It would be decent to only accept if this is you
                    </Typography>}
                    {isAlreadyMember && <Typography variant='body2' align='center' gutterBottom>
                        You are already a member <br />
                        Click below to confirm, and to clear the invite
                    </Typography>}
                </div>}
                <Button type='submit' variant='contained' color='secondary' className={classes.button}
                    disabled={isWaiting}
                    onClick={onSubmit}>
                    {submitButtonContent}
                </Button>
                {!isAlreadyMember && <Button variant='outlined' className={classes.button}
                    disabled={isWaiting}
                    onClick={onSubmit}>
                    {declineButtonContent}
                </Button>}
            </Paper>
        </form>
    )
};

export default InviteForm