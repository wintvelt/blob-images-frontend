import React, { useState, useEffect } from 'react';
import { useSnackbar } from 'notistack';

import Form from '../components-generic/Form';
import { newPasswordValidations } from '../components-generic/FormField';
import { useUser } from '../data/userData';


const fieldConfig = {
    email: {
        autoComplete: 'email',
        type: 'email',
        label: 'email',
        hidden: true,
    },
    oldPassword: {
        autoComplete: 'none',
        type: 'password',
        label: 'huidig wachtwoord',
        validations: [{
            text: 'voer je huidige wachtwoord in',
            validate: (val) => (!!val)
        }],
    },
    newPassword: {
        autoComplete: 'new-password', type: 'password', label: 'nieuw wachtwoord',
        validations: newPasswordValidations,
    },
};


const PasswordForm = (props) => {
    const { user, changePassword } = useUser();
    const { enqueueSnackbar } = useSnackbar();
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        if (user.error) {
            enqueueSnackbar(user.error.message || user.error, { variant: 'error' })
        };
    }, [user.error]);

    const onSubmit = async (fields) => {
        setIsLoading(true);
        const { oldPassword, newPassword } = fields;
        await changePassword(oldPassword, newPassword);
        setIsLoading(false);
    };

    return (
        <Form
            formFields={fieldConfig}
            isLoading={isLoading}
            submitText='Wachtwoord veranderen'
            onSubmit={onSubmit}
        />
    )
};

export default PasswordForm