import React from 'react';
import Dialog from '@material-ui/core/Dialog';

import AuthForms from './AuthForms';
import { useUser, isInAuth } from '../data/userData';

export default function LoginDialog({ groupName }) {
    const userData = useUser();
    const { user } = userData;
    const userPath = user.path;
    const onClose = () => userData.setPath('');
    return (
        <Dialog open={isInAuth(userPath)} onClose={onClose} aria-labelledby="auth-dialog"
            fullWidth>
            <AuthForms groupName={groupName} path={userPath} />
        </Dialog>
    );
}
