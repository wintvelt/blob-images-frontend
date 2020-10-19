import React, { useState } from 'react';

import { useUser } from '../data/userData';
import Form from '../components-generic/Form';

const fieldConfig = {
    email: {
        autoComplete: 'email', type: 'email', label: 'Je email',
        validations: [{
            text: 'voer je email adres in',
            validate: (val) => (
                val &&
                val.split('@')[1] && !!val.split('@')[1].split('.')[1]
            )
        }],
    },
};

const ForgotPswForm = (props) => {
    const { title, subtitle, allowSignup } = props;
    const userData = useUser();
    const { user } = userData;
    const userEmail = user.profile?.email;

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

    const Message = (error) => (
        <>
            Oeps er ging iets mis. {' '}
            {error.message}
        </>
    );

    let smallButtons = [
        { onClick: onLogin, text: 'Log in' },
    ];
    if (allowSignup) smallButtons.push({ onClick: onSignup, text: 'sign up' });

    return <Form
        title={title || 'Wachtwoord vergeten'}
        subtitle={subtitle || 'Geef je email om een nieuw wachtwoord in te stellen'}
        formFields={fieldConfig}
        initialValues={{ email: userEmail }}
        isLoading={isLoading}
        onSubmit={onSubmit}
        submitText='Wachtwoord aanvraag versturen'
        smallButtons={smallButtons}
        Message={(user.error) ? <Message error={user.error} /> : null}
        noPaper
    />
};

export default ForgotPswForm;