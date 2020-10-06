import React, { useState, useEffect } from 'react';
import { useSnackbar } from 'notistack';

import Form from '../components-generic/Form';
import { useUser } from '../../src/data/userData';

const fieldConfig = {
    email: {
        autoComplete: 'email',
        type: 'email',
        label: 'email (cannot be changed)',
        disabled: true,
    },
    name: {
        autoComplete: 'name',
        type: 'text',
        label: 'name',
        validations: [{
            text: 'sharing your name or a name is the least you could do',
            validate: (val) => (!!val),
        }],
    },
    avatar: {
        autoComplete: 'avatar',
        type: 'image',
        isAvatar: true,
        label: 'profile picture',
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
            submitText='Save profile'
            onSubmit={onSubmit}
        />
    )
};

export default ProfileForm