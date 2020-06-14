import React from 'react';
import Dialog from '@material-ui/core/Dialog';

import LoginForm from '../components-login/LoginForm';
import SignupForm from '../components-login/Signup';
import SignupVerify from '../components-login/SignupVerify';

export default function LoginDialog({ open, onClose, groupName, user }) {
    const groupText = (groupName) ? (' ' + groupName) : '';
    return (
        <Dialog open={open} onClose={onClose} aria-labelledby="login-dialog"
            fullWidth maxWidth='sm'>
            {(user.showLogin) && <LoginForm
                title={'Login to join' + groupText}
            />}
            {(user.showSignup) && <SignupForm
                title={'Sign up to join' + groupText}
                subtitle='Complete your registration to accept this invite'
            />}
            {(user.showVerify) && <SignupVerify
                title={'Sign up to join' + groupText}
                email={user.profile && user.profile.email}
                subtitle='Complete your registration to accept this invite'
            />}
        </Dialog>
    );
}
