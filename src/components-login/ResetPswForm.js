import React, { useState } from 'react';
import Button from '@material-ui/core/Button';

import { useUser } from '../data/userData';
import Form from '../components-generic/Form';
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
    password: {
        autoComplete: 'new-password', type: 'password', label: 'Your new password',
        validations: newPasswordValidations,
    },
    confirmation: {
        autoComplete: 'none', type: 'tel', label: 'verification code',
        validations: [{
            text: 'check your email for verification code',
            validate: (val) => (!!val),
        }],
    },
};

const ResetPswForm = (props) => {
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
        const { email, password, confirmation } = fields;
        await userData.confirmPassword(email, password, confirmation);
    });

    const onForgotPsw = (fields) => {
        setIsLoading(true);
        userData.setPath('/forgotpsw');
    };

    const Message = ({ text }) => (
        <>
            Hmm, we could not log you in. <br />
            {text}<br />
            {true && <span>
                Maybe you need to
                <Button onClick={onVerify} style={{
                    padding: 0,
                    margin: '0px 4px 2px 4px',
                    fontWeight: 400,
                    textTransform: 'none'
                }} color='primary'>
                    Confirm your email
                 </Button>
                 ?
            </span>}
        </>
    );

    const formSubtitle = subtitle || 'Check the verification code you received by mail, ' +
        'choose a new password, and you\'re good to go!';

    return <Form
        title={title || 'Set new password'}
        subtitle={formSubtitle}
        formFields={fieldConfig}
        initialValues={[{ email: user.profile?.email }]}
        isLoading={isLoading}
        onSubmit={onSubmit}
        submitText='Save new password'
        smallButtons={[
            { onClick: onForgotPsw, text: 'Send me another code' },
        ]}
        Message={(user.error) ? <Message text={user.error?.message} /> : null}
        noPaper
    />
};

export default ResetPswForm;