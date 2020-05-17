import React, { useState } from 'react';

import { makeStyles } from '@material-ui/core/styles'
import Paper from '@material-ui/core/Paper'
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import CircularProgress from '@material-ui/core/CircularProgress';

import { Field, useFields, validateForm } from '../components-generic/FormField';
import { useUser } from '../../src/components-generic/UserContext';

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

const initialFieldConfig = (entity) => {
    let outConfig = { ...fieldConfig };
    Object.keys(entity).forEach(key => {
        if (outConfig[key]) {
            outConfig[key].value = entity[key];
        }
    });
    return outConfig;
}


const ProfileForm = (props) => {
    const classes = useStyles();
    const { saveProfile } = useUser(true);
    const initialValues = { ...props, avatar: { image: props.avatar } }
    const [fields, setFields] = useFields(initialFieldConfig(initialValues));
    const [loading, setLoading] = useState({ isLoading: false });

    const onChange = (fieldName) => (e) => {
        setFields(fieldName)(e);
    }

    const onSubmit = async (e) => {
        e.preventDefault();
        if (!validateForm(fields)) {
            setFields('showValidation')(true);
        } else {
            setLoading({ isLoading: true });
            try {
                const { name, avatar } = fields;
                const imageUrl = avatar.value.image;
                await saveProfile(name.value, imageUrl);
                setLoading({ success: 'profile update saved', isLoading: false });
            } catch (e) {
                setLoading({ error: e.message, isLoading: false });
            }
        }
    }

    const saveButtonContent = loading.isLoading ? <CircularProgress size='1.5rem' color='secondary' />
        : 'Save changes';
    return (
        <form name='profile-edit-form' noValidate>
            <Paper className={classes.form}>
                {Object.keys(fieldConfig).map(fieldName =>
                    <Field key={fieldName}
                        fieldName={fieldName}
                        field={fields[fieldName]}
                        onChange={onChange(fieldName)}
                        showValidation={fields.showValidation} />
                )}
                {(loading.error || loading.success) &&
                    <Typography variant='body2' className={classes.info} color={(loading.error) ? 'error' : 'inherit'}>
                        {loading.error || loading.success}
                    </Typography>
                }
                <Button type='submit' variant='contained' color='secondary' className={classes.submit}
                    disabled={loading.isLoading}
                    onClick={onSubmit}>
                    {saveButtonContent}
                </Button>
            </Paper>
        </form>
    )
};

export default ProfileForm