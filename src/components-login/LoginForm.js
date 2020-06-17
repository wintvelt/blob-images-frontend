import React, { useState } from 'react';
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
    const { title, subtitle } = props;
    const userData = useUser();
    const { user } = userData;
    const [isLoading, setIsLoading] = useState(false);

    const handler = async (lambda) => {
        setIsLoading(true);
        await lambda();
        setIsLoading(false);
    };

    const onSubmit = (fields) => handler(async () => {
        const { email, password } = fields;
        await userData.login(email, password);
    });

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

    return <Form
        title={title || 'Welcome back!'}
        subtitle={subtitle || 'Please log in with your email and password'}
        formFields={fieldConfig}
        initialValues={[{ email: user.profile?.email }]}
        isLoading={isLoading}
        onSubmit={onSubmit}
        submitText='Log in'
        smallButtons={[
            { onClick: onForgotPsw, text: 'forgot password' },
            { onClick: onSignup, text: 'sign up' },
        ]}
        Message={(user.error) ? <Message error={user.error} /> : null}
        noPaper
    />
};

export default LoginForm;