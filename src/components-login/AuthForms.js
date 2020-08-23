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
        <Typography variant='p'>
            Sorry zeg, deze website is momenteel alleen voor leden, en alleen op uitnodiging.
        </Typography>
    </Paper>
}

export default function AuthForms({ path, groupName, isPage }) {
    const groupText = (groupName) ? (' ' + groupName) : '';
    return (<>
        {(path === '/login') && <LoginForm
            title={groupText ? 'Login to join' + groupText : 'Login to continue'}
            allowSignup={allowSignup}
        />}
        {(path === '/signup' && (allowSignup || !isPage)) && <SignupForm
            title={'Sign up to join' + groupText}
            subtitle={'Complete your registration ' + ((groupName) ? 'to accept this invite' : '')}
        />}
        {(path === '/signup' && (!allowSignup && isPage)) &&
            <InviteOnlyMessage />
        }
        {(path === '/forgotpsw') && <ForgotPswForm
            title='Forgot password'
            subtitle='Provide your email to reset your password'
            allowSignup={allowSignup}
        />}
        {(path === '/confirmpsw') && <ResetPswForm
            title='Set your new password'
        />}
        {(path === '/verifysignup') && <VerifyForm
            title={'Confirm your account to join' + groupText}
            subtitle='Check your inbox for the confirmation code'
        />}
    </>
    );
}
