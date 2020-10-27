import React, { useState } from 'react';
import { useRouter } from 'next/router';

import { useUser } from '../data/userData';
import Form from '../components-generic/Form';
import { newPasswordValidations } from '../components-generic/FormField';
import Link from '@material-ui/core/Link';

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
    name: {
        autoComplete: 'name', type: 'text', label: 'Naam',
        validations: [{
            text: 'vul je naam ook in',
            validate: (val) => (!!val),
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
    optin: {
        type: 'checkbox',
        label: <span>
            Ik ga akkoord met de{' '}
            <Link href='/about' color='primary'>
                algemene voorwaarden
            </Link>
        </span>,
        validations: [{
            text: 'om lid te worden moet je dit ok vinden',
            validate: (val) => (!!val),
        }]
    }
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
        const { email, name, tmpPassword, password } = fields;
        await userData.completePassword(email, name, tmpPassword, password);
    });

    const Message = ({ error }) => (
        <>
            Something went wrong.{' '}{error.message}
        </>
    );

    const formSubtitle = subtitle || 'Voer het tijdelijke wachtwoord in (via mail gestuurd), ' +
        'met je naam en een nieuw wachtwoord, en je bent binnen!';

    return <Form
        title={title || 'Account aanmaken'}
        subtitle={formSubtitle}
        formFields={fieldConfig}
        initialValues={{ email }}
        isLoading={isLoading}
        onSubmit={onSubmit}
        submitText='Maak me lid'
        Message={(user.error) ? <Message error={user.error} /> : null}
        noPaper
    />
};

export default CompletePswForm;