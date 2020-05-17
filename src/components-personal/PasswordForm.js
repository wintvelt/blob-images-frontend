import React, { useState } from 'react';
import { Auth } from 'aws-amplify';

import { makeStyles } from '@material-ui/core/styles'
import Paper from '@material-ui/core/Paper'
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import CircularProgress from '@material-ui/core/CircularProgress';

import { Field, useFields, validateForm, newPasswordValidations } from '../components-generic/FormField';

const useStyles = makeStyles(theme => ({
    form: {
        position: 'relative',
        padding: theme.spacing(3, 4, 4, 4),
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
    oldPassword: {
        autoComplete: 'current-password',
        type: 'password',
        label: 'current password',
        validations: [{
            text: 'please enter your current password',
            validate: (val) => (!!val)
        }],
    },
    newPassword: {
        autoComplete: 'new-password', type: 'password', label: 'new password',
        validations: newPasswordValidations,
    },
};


const PasswordForm = (props) => {
    const classes = useStyles();
    const [fields, setFields] = useFields(fieldConfig);
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
                const { oldPassword, newPassword } = fields;
                const authUser = await Auth.currentAuthenticatedUser();
                await Auth.changePassword(
                    authUser,
                    oldPassword.value,
                    newPassword.value
                );
                setLoading({ success: 'successfully changed your password', isLoading: false });
            } catch (e) {
                setLoading({ isLoading: false, error: e.message || 'password change failed' });
            }
        }
    }

    const saveButtonContent = loading.isLoading ? <CircularProgress size='1.5rem' color='secondary' />
        : 'Change password';
    return (
        <form name='password-change-form' noValidate>
            <Paper className={classes.form}>
                <input type='text' name='username' autoComplete='username' style={{ display: 'none' }} />
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

export default PasswordForm