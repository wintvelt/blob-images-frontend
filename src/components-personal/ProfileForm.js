import React, { useState } from 'react';
import { useSnackbar } from 'notistack';

import { makeStyles } from '@material-ui/core/styles'
import Form from '../components-generic/Form';
import { useUser } from '../../src/data/userData';

const useStyles = makeStyles(theme => ({
    form: {
        position: 'relative',
        padding: theme.spacing(3, 4, 4, 4),
        // backgroundColor: theme.palette.background.white,
        // color: theme.palette.text.secondary,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'stretch',
        justifyContent: 'flex-start'
    },
    submit: {
        marginTop: theme.spacing(4)
    },
    info: {
        textAlign: 'center',
        color: 'white',
        padding: theme.spacing(1, 2),
        margin: theme.spacing(2, 0),
        backgroundColor: 'cornflowerblue',
        borderRadius: theme.spacing(1)
    }
}));

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
    const classes = useStyles();
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