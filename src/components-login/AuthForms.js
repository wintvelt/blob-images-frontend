import React from 'react';

import { makeStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Icon from '@material-ui/core/Icon';

import LoginForm from './LoginForm';
import SignupForm from './SignupForm';
import VerifyForm from './VerifyForm';
import ForgotPswForm from './ForgotPswForm';
import ResetPswForm from './ResetPswForm';
import CompletePswForm from './CompletePswForm';

const allowSignup = false; // for beta purposes

const useStyles = makeStyles(theme => ({
    paper: {
        position: 'relative',
        padding: theme.spacing(3, 4, 4, 4),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center'
    },
}));

const InviteOnlyMessage = () => {
    const classes = useStyles();
    return <Paper className={classes.paper}>
        <Typography variant='h5' gutterBottom>Alleen voor leden</Typography>
        <Icon fontSize='large' color='primary'>drafts</Icon>
        <Typography variant='h5' gutterBottom>Uitsluitend op uitnodiging</Typography>
        <Typography variant='body1'>
            Sorry zeg, deze website is momenteel alleen voor leden, en alleen op uitnodiging.
        </Typography>
    </Paper>
}

export default function AuthForms({ path, groupName, isPage }) {
    const groupText = (groupName) ? (' van ' + groupName) : '';
    return (<>
        {(path === '/login') && <LoginForm
            title={groupText ? 'Log in om aan lid te worden' + groupText : 'Log in om door te gaan'}
            allowSignup={allowSignup}
        />}
        {(path === '/signup' && (allowSignup || !isPage)) && <SignupForm
            title={'Schrijf je in om lid te worden' + groupText}
            subtitle={'Voltooi je registratie' + ((groupName) ? ' om deze uitnodiging te accepeteren' : '')}
        />}
        {(path === '/signup' && (!allowSignup && isPage)) &&
            <InviteOnlyMessage />
        }
        {(path === '/forgotpsw') && <ForgotPswForm
            title='Wachtwoord vergeten'
            subtitle='Vul je email in om je wachtwoord opnieuw in te stellen'
            allowSignup={allowSignup}
        />}
        {(path === '/confirmpsw') && <ResetPswForm
            title='Voer een nieuw wachtwoord in'
        />}
        {(path === '/completepsw') && <CompletePswForm
            title='Maak een nieuw wachtwoord'
        />}
        {(path === '/verifysignup') && <VerifyForm
            title={'Bevestig je registratie om lid te worden' + groupText}
            subtitle='Check je email inbox voor de registratiecode'
        />}
    </>
    );
}
