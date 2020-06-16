import React, { useState } from 'react';
import Button from '@material-ui/core/Button';

import { useUser } from '../data/userData';
import Form from '../components-generic/Form';

const fieldConfig = {
    email: {
        autoComplete: 'email', type: 'email', label: 'Your email',
        validations: [{
            text: 'enter a valid email address',
            validate: (val) => (
                val &&
                val.split('@')[1] && !!val.split('@')[1].split('.')[1]
            )
        }],
    },
};

const ForgotPswForm = (props) => {
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
        const { email } = fields;
        await userData.forgotPassword(email);
    });

    const onLogin = (fields) => {
        setIsLoading(true);
        userData.setPath('/login');
    };
    const onSignup = (fields) => {
        setIsLoading(true);
        userData.setPath('/signup');
    };

    const Message = () => (
        <>
            Hmm, we could not log you in. <br />
            {'errormessage'}<br />
            {true && <span>
                Maybe you need to
                <Button onClick={onVerify} style={{
                    padding: 0,
                    margin: '0 8px',
                    fontWeight: 400,
                    textTransform: 'none'
                }} color='primary'>
                    Confirm your email
                 </Button>
                 ?
            </span>}
        </>
    );
    return <Form
        title={title || 'Forgot password'}
        subtitle={subtitle || 'Leave your email to reset your password'}
        formFields={fieldConfig}
        initialValues={[{ email: user.profile?.email }]}
        isLoading={isLoading}
        onSubmit={onSubmit}
        submitText='Reset password'
        smallButtons={[
            { onClick: onLogin, text: 'Log in' },
            { onClick: onSignup, text: 'Sign up' },
        ]}
        messageComponent={(user.error) ? Message : null}
        noPaper
    />
};

export default ForgotPswForm;