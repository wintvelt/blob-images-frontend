import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { useSnackbar } from 'notistack';

import Button from '@material-ui/core/Button';

import { useUser } from '../data/userData';
import Form from '../components-generic/Form';

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

const buttonStyle = {
    padding: 0,
    margin: '0px 4px 2px 4px',
    fontWeight: 400,
    textTransform: 'none'
};

const VerifyForm = (props) => {
    const { title, subtitle } = props;
    const { enqueueSnackbar } = useSnackbar();
    const userData = useUser();
    const { user } = userData;
    const router = useRouter();
    const pathEmail = router.query?.email;
    const userEmail = user.profile?.email;
    const email = pathEmail || userEmail;
    const pathCode = router.query?.code;
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        if (user.error) setIsLoading(false);
    }, [user.error]);

    const onSubmit = async (fields) => {
        setIsLoading(true);
        const { email, confirmation } = fields;
        await userData.confirmSignup(email, confirmation);
    };

    const toLogin = () => {
        setIsLoading(true);
        userData.setPath('/login');
    };

    const onResend = async (fields) => {
        setIsLoading(true);
        const { email } = fields;
        await userData.requestVerify(email);
        enqueueSnackbar('New confirmation code was sent, check your inbox');
    };

    const Message = ({ error }) => (
        <>
            Something went wrong. {' '}{error.message}<br />
            {(error.code === 'CodeMismatchException') && <span>
                You could ask for a new code (see below)
            </span>}
            {(error.message && error.message.includes('CONFIRMED')) && <span>
                This means you can already
                <Button onClick={toLogin} style={buttonStyle} color='primary'>
                    Log in
                 </Button>
                 to your account
            </span>}
        </>
    );
    const formSubtitle = (pathEmail && pathCode && !user.error) ? 'Click "Confirm" to confirm your account'
        : subtitle || 'Please check your email. If you signed up with this address, ' +
        'you\'ll receive a new verification code';
    const smallButtons = [
        { onClick: onResend, text: 'Send email with new code' },
        { onClick: toLogin, text: 'Log in' },
    ];
    const initialValues = { email, confirmation: pathCode };

    return <Form
        title={title || 'Confirm your account'}
        subtitle={formSubtitle}
        formFields={fieldConfig}
        initialValues={initialValues}
        isLoading={isLoading}
        onSubmit={onSubmit}
        submitText='Confirm'
        smallButtons={smallButtons}
        Message={(user.error) ? <Message error={user.error} /> : null}
        noPaper
    />
};

export default VerifyForm;