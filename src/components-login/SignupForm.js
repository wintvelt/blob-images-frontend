import React, { useState, useEffect } from 'react';
import Button from '@material-ui/core/Button';

import { useUser } from '../data/userData';
import Form from '../components-generic/Form';
import { newPasswordValidations } from '../components-generic/FormField';
import { errorLog } from '../helpers/errorLog';
import TermsLink from './TermsLink';
import { useRouter } from 'next/router';

const fieldConfig = {
    name: {
        autoComplete: 'name', type: 'text', label: 'Naam',
        validations: [{
            text: 'vul je naam in',
            validate: (val) => (!!val),
        }],
    },
    email: {
        autoComplete: 'email', type: 'email', label: 'Your email',
        validations: [{
            text: 'geef een geldig email adres op',
            validate: (val) => (
                val &&
                val.split('@')[1] && !!val.split('@')[1].split('.')[1]
            )
        }],
    },
    password: {
        autoComplete: 'new-password', type: 'password', label: 'Jouw geheime wachtwoord',
        validations: newPasswordValidations,
    },
    optin: {
        type: 'checkbox',
        label: <span>
            Ik ga akkoord met de{' '}<TermsLink />
        </span>,
        validations: [{
            text: 'om lid te worden moet je dit ok vinden',
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
    const router = useRouter();
    const inviteId = router.query?.inviteid;
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        if (user.error) setIsLoading(false);
    }, [user.error]);

    const onSubmit = async (fields) => {
        setIsLoading(true);
        const { name, email, password } = fields;
        await userData.signup(email, password, name, inviteId);
    };

    const onLogin = () => {
        setIsLoading(true);
        userData.setPath('/login');
    };

    const onVerify = () => {
        setIsLoading(true);
        userData.setPath('/verifysignup');
    };

    const Message = ({ error }) => {
        errorLog(error);
        return <>
            Hmm, er ging hier iets mis<br />
            {(error.code === 'UsernameExistsException') && <span>
                Misschien moet je voor registratie nog je
                <Button onClick={onVerify} style={buttonStyle} color='primary'>
                    email bevestigen
                 </Button>
                 ?
            </span>}
        </>
    };
    const formSubtitle = subtitle || 'Meld je aan, deel foto\'s in groepen en albums, ' +
        'en nodig je vrienden en familie uit!';

    return <Form
        title={title || 'Inschrijving om lid te worden'}
        subtitle={formSubtitle}
        formFields={fieldConfig}
        initialValues={[{ email: user.profile?.email }]}
        isLoading={isLoading}
        onSubmit={onSubmit}
        submitText='Sign up'
        smallButtons={[
            { onClick: onLogin, text: 'Al lid? Log in' },
        ]}
        Message={(user.error) ? <Message error={user.error} /> : null}
        noPaper
    />
};

export default SignupForm;