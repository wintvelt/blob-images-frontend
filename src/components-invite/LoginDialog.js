import React from 'react';
import Dialog from '@material-ui/core/Dialog';
import Typography from '@material-ui/core/Typography';

import LoginForm from '../components-login/LoginForm';

export default function LoginDialog({ open, onClose, onLogin }) {
    return (
        <Dialog open={open} onClose={onClose} aria-labelledby="login-dialog"
            fullWidth maxWidth='sm'>
            <LoginForm
                title='Login to your account'
                onLogin={onLogin}
            />
        </Dialog>
    );
}
