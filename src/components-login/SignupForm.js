import React, { useState, useEffect } from 'react';
import Button from '@material-ui/core/Button';

import { useUser } from '../data/userData';
import Form from '../components-generic/Form';
import Link from '../components-generic/Link';
import { newPasswordValidations } from '../components-generic/FormField';

const fieldConfig = {
    name: {
        autoComplete: 'name', type: 'text', label: 'Your name',
        validations: [{
            text: 'fill out your name',
            validate: (val) => (!!val),
        }],
    },
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
    password: {
        autoComplete: 'new-password', type: 'password', label: 'Your new password',
        validations: newPasswordValidations,
    },
    optin: {
        type: 'checkbox',
        label: <span>
            I agree to the{' '}
            <Link href='#' color='primary'>
                terms and conditions
            </Link>
        </span>,
        validations: [{
            text: 'to register, you have to agree',
            validate: (val) => (!!val),
        }]
    }
};

const buttonStyle = {
    padding: 0,
    margin: '0px 4px 2px 4px',
    fontWeight: 400,
    textTransform: 'none'
};

const SignupForm = (props) => {
    const { title, subtitle } = props;
    const userData = useUser();
    const { user } = userData;
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        if (user.error) setIsLoading(false);
    },[user.error]);

    const onSubmit = async (fields) => {
        setIsLoading(true);
        const { name, email, password } = fields;
        await userData.signup(email, password, name);
    };

    const onLogin = () => {
        setIsLoading(true);
        userData.setPath('/login');
    };

    const onVerify = () => {
        setIsLoading(true);
        userData.setPath('/verifysignup');
    };

    const Message = ({ error }) => (
        <>
            {error.message}<br />
            {(error.code === 'UsernameExistsException') && <span>
                Maybe you need to
                <Button onClick={onVerify} style={buttonStyle} color='primary'>
                    Confirm your email
                 </Button>
                 ?
            </span>}
        </>
    );
    const formSubtitle = subtitle || 'Enter your info, then invite friends and family, ' +
        'and share your first photos!';

    return <Form
        title={title || 'Sign up today!'}
        subtitle={formSubtitle}
        formFields={fieldConfig}
        initialValues={[{ email: user.profile?.email }]}
        isLoading={isLoading}
        onSubmit={onSubmit}
        submitText='Sign up'
        smallButtons={[
            { onClick: onLogin, text: 'Log in' },
        ]}
        Message={(user.error) ? <Message error={user.error} /> : null}
        noPaper
    />
};

export default SignupForm;