import React, { useState } from 'react';
import { useRouter } from 'next/router';

import { useUser } from '../data/userData';
import Form from '../components-generic/Form';
import { newPasswordValidations } from '../components-generic/FormField';

const fieldConfig = {
    email: {
        autoComplete: 'email', type: 'email', label: 'email',
        validations: [{
            text: 'voer je email adres in',
            validate: (val) => (
                val &&
                val.split('@')[1] && !!val.split('@')[1].split('.')[1]
            )
        }],
    },
    tmpPassword: {
        autoComplete: 'temp-password', type: 'password', label: 'je tijdelijke wachtwoord',
        validations: [{
            text: 'tijdelijke wachtwoord nodig om een nieuwe te maken',
            validate: (val) => (!!val)
        }],
    },
    password: {
        autoComplete: 'new-password', type: 'password', label: 'je nieuwe wachtwoord',
        validations: newPasswordValidations,
    },
};

const CompletePswForm = (props) => {
    const { title, subtitle } = props;
    const userData = useUser();
    const { user } = userData;
    const router = useRouter();
    const pathEmail = router.query?.email;
    const userEmail = user.profile?.email;
    const email = pathEmail || userEmail;
    const [isLoading, setIsLoading] = useState(false);

    const handler = async (lambda) => {
        setIsLoading(true);
        await lambda();
        setIsLoading(false);
    };

    const onSubmit = (fields) => handler(async () => {
        const { email, tmpPassword, password } = fields;
        await userData.completePassword(email, tmpPassword, password);
    });

    const onForgotPsw = (fields) => {
        setIsLoading(true);
        userData.setPath('/forgotpsw');
    };

    const Message = ({ error }) => (
        <>
            Something went wrong.{' '}{error.message}
        </>
    );

    const formSubtitle = subtitle || 'Voer het tijdelijke wachtwoord in (via mail gestuurd), ' +
        'kies een nieuw wachtwoord, en je bent binnen!';

    return <Form
        title={title || 'Nieuw wachtwoord instellen'}
        subtitle={formSubtitle}
        formFields={fieldConfig}
        initialValues={{ email }}
        isLoading={isLoading}
        onSubmit={onSubmit}
        submitText='nieuw wachtwoord opslaan'
        Message={(user.error) ? <Message error={user.error} /> : null}
        noPaper
    />
};

export default CompletePswForm;