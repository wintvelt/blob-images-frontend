import React from 'react';
import Dialog from '@material-ui/core/Dialog';

import AuthForms from './AuthForms';
import { useUser, isInAuth } from '../data/userData';

export default function LoginDialog({ groupName, noClose }) {
    const userData = useUser();
    const { user } = userData;
    const userPath = user.path;
    const onClose = () => userData.setPath('');
    return (
        <Dialog open={isInAuth(userPath)} onClose={(!noClose) ? onClose : null} aria-labelledby="auth-dialog"
            fullWidth>
            <AuthForms groupName={groupName} path={userPath} />
        </Dialog>
    );
}
