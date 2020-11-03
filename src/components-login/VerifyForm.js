import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { useSnackbar } from 'notistack';

import Button from '@material-ui/core/Button';

import { useUser } from '../data/userData';
import Form from '../components-generic/Form';
import { errorLog } from '../helpers/errorLog';
import { useActiveInvite } from '../data/invite-Data';
import { useSetLoadingPath } from '../data/loadingData';

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
        enqueueSnackbar('Nieuwe registratiecode verzonden, check je mail');
        setIsLoading(false);
    };

    const Message = ({ error }) => {
        return <>
            Iets ging mis.<br />
            {(error.code === 'CodeMismatchException') && <span>
                Je zou een nieuwe code kunnen opvragen (zie hieronder)
            </span>}
            {(error.message && error.message.includes('CONFIRMED')) && <span>
                Je kunt gewoon
                <Button onClick={toLogin} style={buttonStyle} color='primary'>
                    Inloggen
                 </Button>
                 als lid
            </span>}
        </>
    };
    const formSubtitle = (pathEmail && pathCode && !user.error) ? 'Klik "Bevestigen" om je lidmaatschap te voltooien'
        : subtitle || 'Check je mailbox. Als je met dit email-adres geregistreerd bent, ' +
        'dan ontvang je een nieuwe registratiecode';
    const smallButtons = [
        { onClick: onResend, text: 'Nieuwe code opvragen' },
        { onClick: toLogin, text: 'Al lid? Log in' },
    ];
    const initialValues = { email, confirmation: pathCode };

    return <Form
        title={title || 'Voltooi je lidmaatschap'}
        subtitle={formSubtitle}
        formFields={fieldConfig}
        initialValues={initialValues}
        isLoading={isLoading}
        onSubmit={onSubmit}
        submitText='Bevestigen'
        smallButtons={smallButtons}
        Message={(user.error) ? <Message error={user.error} /> : null}
        noPaper
    />
};

export default VerifyForm;