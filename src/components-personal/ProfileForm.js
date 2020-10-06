import React, { useState, useEffect } from 'react';
import { useSnackbar } from 'notistack';

import Form from '../components-generic/Form';
import { useUser } from '../../src/data/userData';

const fieldConfig = {
    email: {
        autoComplete: 'email',
        type: 'email',
        label: 'email (kan je niet wijzigen)',
        disabled: true,
    },
    name: {
        autoComplete: 'name',
        type: 'text',
        label: 'naam',
        validations: [{
            text: 'je moet echt minstens je naam delen',
            validate: (val) => (!!val),
        }],
    },
    avatar: {
        autoComplete: 'avatar',
        type: 'image',
        isAvatar: true,
        label: 'profiel pic',
    },
};

const ProfileForm = (props) => {
    const { user, saveProfile } = useUser();
    const [isLoading, setIsLoading] = useState(false);
    const { enqueueSnackbar } = useSnackbar();

    const initialValues = { ...props, avatar: { url: props.photoUrl, photoId: props.photoId } };

    useEffect(() => {
        if (user.error) enqueueSnackbar(user.error.message, { variant: 'error' });
    }, [user.error]);

    const onSubmit = async (fields) => {
        setIsLoading(true);
        const { name, avatar } = fields;
        const { url, photoId } = avatar;
        enqueueSnackbar('Profiel bijgewerkt');
        await saveProfile(name, photoId, url);
        setIsLoading(false);
    }

    return (
        <Form
            formFields={fieldConfig}
            initialValues={initialValues}
            isLoading={isLoading}
            submitText='Profiel opslaan'
            onSubmit={onSubmit}
        />
    )
};

export default ProfileForm