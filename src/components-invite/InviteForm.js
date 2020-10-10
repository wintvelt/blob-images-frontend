import React from 'react';

import { makeStyles } from '@material-ui/core/styles'
import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';

import { expireDate } from '../components-generic/helpers';
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

const alignCenter = { textAlign: 'center' };
const gutterTop = { marginTop: '16px' };

const InviteForm = ({ invite, isLoading, isSaving, onAccept, onDecline, profile, isAlreadyMember }) => {
    const classes = useStyles();
    const isWaiting = isLoading || isSaving;
    const { fromEmail, fromName, toName, toEmail, message, group } = invite || {};
    const isToDifferentEmail = profile && profile.email && profile.email !== toEmail;

    const onSubmit = (e) => {
        e.preventDefault();
        onAccept();
    };

    const handleDecline = (e) => {
        e.preventDefault();
        onDecline();
    };

    const submitButtonContent = isWaiting ? <CircularProgress size='1.5rem' color='secondary' />
        : (isAlreadyMember) ?
            'Bevestig lidmaatschap'
            : 'Accepteer uitnodiging';
    const declineButtonContent = isWaiting ? <CircularProgress size='1.5rem' color='secondary' />
        : 'afwijzen';

    return (
        <form name='invite-accept-form' noValidate>
            <Paper className={classes.inviteForm}>
                <Typography component="h1" variant="h4" color="inherit"
                    align='center' gutterBottom>
                    Je bent gevraagd
                    {isAlreadyMember && ' (opnieuw)'}
                    !
                    </Typography>
                {(!isLoading) && <div style={alignCenter}>
                    <TextSkeleton isLoading={isLoading}>
                        <Typography variant='h5' align='center' gutterBottom>
                            {fromName}{' '}
                            nodigt
                            {' '}{toName}<br />
                            uit om lid te worden van "{group && group.name}"
                        </Typography>
                    </TextSkeleton>
                    <img src='/img/invite_divider.png' alt='divider' width={64} />
                    <Typography variant='body1' align='center' gutterBottom>
                        {message.split('\n').map((line, i) => (
                            <React.Fragment key={i}>{line}<br /></React.Fragment>
                        ))}
                    </Typography>
                    <img src='/img/invite_divider.png' alt='divider' width={64} />
                    <em><Typography variant='body1' align='center' gutterBottom style={gutterTop}>
                        Deze uitnodiging is geldig tot{' '}{expireDate(invite.createdAt)}
                    </Typography></em>
                    {isToDifferentEmail && <Typography variant='body2' align='center' gutterBottom style={gutterTop}>
                        Oorspronkelijk gericht aan{' '}{toEmail} <br />
                        Het zou wel beleefd zijn om deze alleen te accepteren als jij dit bent
                    </Typography>}
                    {isAlreadyMember && <Typography variant='body2' align='center' gutterBottom>
                        Je bent al lid <br />
                        Klik hieronder om te bevestigen
                    </Typography>}
                </div>}
                <Button type='submit' variant='contained' color='secondary' className={classes.button}
                    disabled={isWaiting}
                    onClick={onSubmit}>
                    {submitButtonContent}
                </Button>
                {!isAlreadyMember && <Button variant='outlined' className={classes.button}
                    disabled={isWaiting}
                    onClick={handleDecline}>
                    {declineButtonContent}
                </Button>}
            </Paper>
        </form>
    )
};

export default InviteForm