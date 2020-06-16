import React, { useState, useEffect } from 'react';
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
    const { user, saveProfile } = useUser();
    const [isLoading, setIsLoading] = useState(false);
    const { enqueueSnackbar } = useSnackbar();

    const initialValues = { ...props, avatar: { image: props.avatar } };

    useEffect(() => {
        if (user.error) enqueueSnackbar(user.error.message, { variant: 'error' });
    }, [user.error]);

    const onSubmit = async (fields) => {
        setIsLoading(true);
        const { name, avatar } = fields;
        const imageUrl = avatar.image;
        await saveProfile(name, imageUrl);
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