import React, { useState } from 'react';
import Button from '@material-ui/core/Button';

import { useUser } from '../data/userData';
import Form from '../components-generic/Form';
import Link from '../components-generic/Link';
import { newPasswordValidations } from '../components-generic/FormField';

const fieldConfig = {
    email: {
        autoComplete: 'email', type: 'email', label: 'Your email',
        validations: [{
            text: 'enter your email address',
            validate: (val) => (
                val &&
                val.split('@')[1] && !!val.split('@')[1].split('.')[1]
            )
        }],
    },
    confirmation: {
        autoComplete: 'none', type: 'tel', label: 'confirmation code',
        validations: [{
            text: 'check your email for verification code',
            validate: (val) => (!!val),
        }],
    },
};


const VerifyForm = (props) => {
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
        const { email, confirmation } = fields;
        await userData.confirmSignup(email, confirmation);
    });

    const onLogin = () => {
        setIsLoading(true);
        userData.setPath('/login');
    };

    const onResend = (fields) => handler(async () => {
        const { email } = fields;
        await userData.requestVerify(email);
    });

    const Message = () => (
        <>
            [placeholder] <br />
            {'errormessage'}<br />
            {true && <span>
                Maybe you need to
                <Button onClick={onResend} style={{
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
    const formSubtitle = subtitle || 'Please check your email. If you signed up with this address, ' +
    'you\'ll receive a new verification code.';

    return <Form
        title={title || 'Confirm your account'}
        subtitle={formSubtitle}
        formFields={fieldConfig}
        initialValues={{ email: user.profile?.email }}
        isLoading={isLoading}
        onSubmit={onSubmit}
        submitText='Sign up'
        smallButtons={[
            { onClick: onResend, text: 'Send email with new code' },
            { onClick: onLogin, text: 'Log in' },
        ]}
        messageComponent={(user.error) ? Message : null}
        noPaper
    />
};

export default VerifyForm;