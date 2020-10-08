import React, { useState } from 'react';
import { useSnackbar } from 'notistack';
import { useUser } from '../data/userData';

import Form from '../components-generic/Form';
import { useSetLoadingPath } from '../data/loadingData';
import { Auth } from 'aws-amplify';
import DeleteDialog from '../components-generic/DeleteDialog';

const fieldConfig = {
    oldPassword: {
        autoComplete: 'none',
        type: 'password',
        label: 'je wachtwoord',
        validations: [{
            text: 'voer je huidige wachtwoord in',
            validate: (val) => (!!val)
        }],
    },
};
const initialValues = {};

const ProfileDeleteForm = (props) => {
    const { user, deleteUser } = useUser();
    const [isLoading, setIsLoading] = useState(false);
    const [dialogOpen, setDialogOpen] = useState(false);
    const { enqueueSnackbar } = useSnackbar();
    const setLoadingPath = useSetLoadingPath();

    const onClickDelete = async (fields) => {
        try {
            await Auth.signIn(user.profile.email, fields.oldPassword);
            setDialogOpen(true);
        } catch (_) {
            enqueueSnackbar('dit wachtwoord is niet ok', { variant: 'error' });
        }
    }

    const onDelete = async (fields) => {
        setIsLoading(true);
        try {
            await deleteUser();
            enqueueSnackbar('Je account en al jouw gegevens zijn verwijderd');
            setLoadingPath('/');
        } catch (_) {
            enqueueSnackbar('Niet gelukt om jou te verwijderen');
            setIsLoading(false);
        }
    }

    const onClose = () => setDialogOpen(false);

    return <>
        <Form
            formFields={fieldConfig}
            initialValues={initialValues}
            isLoading={isLoading}
            deleteText='Verwijder je account voorgoed'
            onDelete={onClickDelete}
            validateDelete={true}
        />
        <DeleteDialog open={dialogOpen} onClose={onClose} onDelete={onDelete}
            title='Wil je clubalmanac echt verlaten?'
            lines={[
                'Het verwijderen van je account is onomkeerbaar.',
                'Al je foto\'s en gegevens worden verwijderd en vergeten. Ook in groepen en albums van anderen.',
                'Je kunt dan niet meer inloggen. Een verwijderd account kan niet hersteld worden.'
            ]}
            abortText='OK, ik blijf toch'
            submitText='Zeker weten - verwijder mij voorgoed'
        />
    </>
};

export default ProfileDeleteForm;