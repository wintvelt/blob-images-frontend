import React from 'react';

import LoginForm from './LoginForm';
import SignupForm from './SignupForm';
import VerifyForm from './VerifyForm';
import ForgotPswForm from './ForgotPswForm';
import ResetPswForm from './ResetPswForm';

export default function AuthForms({ path, groupName }) {
    const groupText = (groupName) ? (' ' + groupName) : '';
    return (<>
        {(path === '/login') && <LoginForm
            title={groupText ? 'Login to join' + groupText : 'Login to continue'}
        />}
        {(path === '/signup') && <SignupForm
            title={'Sign up to join' + groupText}
            subtitle={'Complete your registration ' + ((groupName) ? 'to accept this invite' : '')}
        />}
        {(path === '/forgotpsw') && <ForgotPswForm
            title='Forgot password'
            subtitle='Provide your email to reset your password'
        />}
        {(path === '/confirmpsw') && <ResetPswForm
            title='Set your new password'
        />}
        {(path === '/verifysignup') && <VerifyForm
            title={'Sign up to join' + groupText}
            subtitle='Check your inbox for the confirmation code'
        />}
    </>
    );
}
