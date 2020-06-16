import React, { useState } from 'react';
import { useSnackbar } from 'notistack';

import Form from '../components-generic/Form';
import { useUser } from '../../src/data/userData';

const fieldConfig = {
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
    const { saveProfile } = useUser();
    const [isLoading, setIsLoading] = useState(false);
    const { enqueueSnackbar } = useSnackbar();

    const initialValues = { ...props, avatar: { image: props.avatar } };

    const onSubmit = async (fields) => {
        setIsLoading(true);
        try {
            const { name, avatar } = fields;
            const imageUrl = avatar.image;
            await saveProfile(name, imageUrl);
            enqueueSnackbar('profile update saved', { variant: 'success' });
        } catch (e) {
            enqueueSnackbar('profile update failed', { variant: 'error' });
        }
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