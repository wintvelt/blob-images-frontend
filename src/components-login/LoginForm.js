import React, { useState, useEffect } from 'react';
import Button from '@material-ui/core/Button';

import { useUser } from '../data/userData';
import Form from '../components-generic/Form';

const fieldConfig = {
    email: {
        autoComplete: 'email',
        type: 'email',
        label: 'email',
        validations: [{
            text: 'please enter your email address',
            validate: (val) => (val && val.split('@')[1] && !!val.split('@')[1].split('.')[1]),
        }],
    },
    password: {
        autoComplete: 'current-password',
        type: 'password',
        label: 'password',
        validations: [{
            text: 'please enter your password',
            validate: (val) => (!!val)
        }],
    },
};

const buttonStyle = {
    padding: 0,
    margin: '0px 4px 2px 4px',
    fontWeight: 400,
    textTransform: 'none'
};

const LoginForm = (props) => {
    const { title, subtitle, allowSignup } = props;
    const userData = useUser();
    const { user } = userData;
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        if (user.error) setIsLoading(false);
    }, [user.error])

    const onSubmit = async (fields) => {
        setIsLoading(true);
        const { email, password } = fields;
        await userData.login(email, password);
    };

    const onForgotPsw = (fields) => {
        setIsLoading(true);
        userData.setPath('/forgotpsw');
    };

    const onVerify = (fields) => {
        setIsLoading(true);
        userData.setPath('/verifysignup');
    };

    const onSignup = (fields) => {
        setIsLoading(true);
        userData.setPath('/signup');
    };

    const Message = ({ error }) => (
        <>
            Hmm, we could not log you in.{' '}
            {error.message}<br />
            {(error.code === 'UserNotConfirmedException') && <span>
                You probably need to
                <Button onClick={onVerify} style={buttonStyle} color='primary'>
                    Confirm your email
                 </Button>
                 to complete the signup
            </span>}
        </>
    );

    let smallButtons = [
        { onClick: onForgotPsw, text: 'forgot password' },
    ];
    if (allowSignup) smallButtons.push({ onClick: onSignup, text: 'sign up' });

    return <Form
        title={title || 'Welcome back!'}
        subtitle={subtitle || 'Please log in with your email and password'}
        formFields={fieldConfig}
        initialValues={[{ email: user.profile?.email }]}
        isLoading={isLoading}
        onSubmit={onSubmit}
        submitText='Log in'
        smallButtons={smallButtons}
        Message={(user.error) ? <Message error={user.error} /> : null}
        noPaper
    />
};

export default LoginForm;