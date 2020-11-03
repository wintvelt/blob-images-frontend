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
            text: 'vul je email adres in',
            validate: (val) => (val && val.split('@')[1] && !!val.split('@')[1].split('.')[1]),
        }],
    },
    password: {
        autoComplete: 'current-password',
        type: 'password',
        label: 'wachtwoord',
        validations: [{
            text: 'je hebt je wachtwoord nodig om binnen te komen',
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

    const Message = ({ error }) => {
        return <>
            Hmm, inloggen is helaas mislukt.{' '}<br />
            {(error.code === 'UserNotConfirmedException') && <span>
                Waarschijnlijk moet je voor lidmaatschap je
                <Button onClick={onVerify} style={buttonStyle} color='primary'>
                    email bevestigen 
                 </Button>
                 om de registratie af te maken
            </span>}
        </>
    };

    let smallButtons = [
        { onClick: onForgotPsw, text: 'wachtwoord vergeten' },
    ];
    if (allowSignup) smallButtons.push({ onClick: onSignup, text: 'account aanmaken' });

    return <Form
        title={title || 'Welkom!'}
        subtitle={subtitle || 'Log in met je email en wachtwoord'}
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