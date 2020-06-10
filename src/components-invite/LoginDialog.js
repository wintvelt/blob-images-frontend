import React from 'react';
import Dialog from '@material-ui/core/Dialog';
import Typography from '@material-ui/core/Typography';

import LoginForm from '../components-login/LoginForm';
import Link from '../components-generic/Link';

const LoginTitle = () => (<Typography component="h1" variant="h4"
    align='center' gutterBottom>
    Login or{' '}<Link href='/'>Sign up here</Link>{' '}to join
</Typography>)

export default function LoginDialog({ open, onClose, onLogin }) {
    return (
        <Dialog open={open} onClose={onClose} aria-labelledby="login-dialog"
            fullWidth maxWidth='sm'>
            <LoginForm
                TitleComponent={<LoginTitle />}
                onLogin={onLogin}
            />
        </Dialog>
    );
}
