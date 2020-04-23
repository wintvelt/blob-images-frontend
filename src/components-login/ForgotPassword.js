import React, { useState, useContext } from 'react';
import { UserContext } from '../UserContext';
import { useRouter } from 'next/router';
import { Auth } from "aws-amplify";
import { makeStyles, createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';

import { Field, useFields, validateForm, validateField, newPasswordValidations } from '../FormField';

const useStyles = makeStyles(theme => ({
    signupForm: {
        position: 'relative',
        marginTop: theme.spacing(12),
        marginBottom: '-40px',
        padding: theme.spacing(4),
        marginLeft: '20%',
        marginRight: '20%',
        backgroundColor: theme.palette.background.white,
        color: theme.palette.secondary.dark,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'stretch',
        justifyContent: 'flex-start'
    },
    submit: {
        marginTop: theme.spacing(2),
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

const theme = createMuiTheme({
    palette: {
        primary: { main: '#46344e' },
        secondary: { main: '#faed26' },
        text: {
            primary: '#551b8b', // lighter purple
        },
    },
});

const formFields = {
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
    password: {
        autoComplete: 'new-password', type: 'password', label: 'Your new password',
        validations: newPasswordValidations,
    },
    confirmation: {
        autoComplete: 'none', type: 'tel', label: 'verification code',
        validations: [{
            text: 'check your email for verification code',
            validate: (val) => (!!val),
        }],
    },
};

const ForgotPasswordForm = (props) => {
    const { code, email } = props;
    const router = useRouter();
    const classes = useStyles();
    const userContext = useContext(UserContext);
    const [fields, setFields] = useFields({
        ...formFields,
        email: { ...formFields.email, value: email },
        confirmation: { ...formFields.confirmation, value: code }
    });
    const [loading, setLoading] = useState({ state: false });

    const onChange = (fieldName) => (e) => {
        setFields(fieldName)(e);
    }

    const onSubmit = async (e) => {
        e.preventDefault();
        if (!validateForm(fields)) {
            setFields('showValidation')('all');
        } else {
            e.preventDefault();
            setLoading({ state: true });

            try {
                const { email, password, confirmation } = fields;
                await Auth.forgotPasswordSubmit(
                    email.value,
                    confirmation.value,
                    password.value
                );
                const user = await Auth.signIn(email.value, password.value);
                userContext.setUser({
                    profile: user.attributes,
                    isAuthenticated: true,
                    isAuthenticating: false,
                });
                router.push("/");
            } catch (e) {
                console.log(e)
                const message = (e.code) ?
                    'Something went wrong'
                    : 'Something went wrong'
                setLoading({
                    state: false,
                    message,
                });
            }
        }
    }

    const formTitle = 'Reset your password';
    const formSubtitle = 'Check the verification code you received by mail, ' +
        'choose a new password, ' +
        'and you\'re good to go!';

    const submitText = (loading.state) ?
        <CircularProgress size='1.5rem' color='inherit' />
        : 'Set new password';

    const resendText = (loading.state) ?
        <CircularProgress size='1.5rem' color='inherit' />
        : 'Request new code';

    return (
        <ThemeProvider theme={theme}>
            <form name='signup-form' noValidate>
                <Paper className={classes.signupForm}>
                    <Typography component="h1" variant="h4" color="inherit"
                        align='center' gutterBottom>
                        {formTitle}
                    </Typography>
                    <Typography variant='subtitle1' gutterBottom>
                        {formSubtitle}
                    </Typography>
                    {Object.keys(formFields).map(fieldName =>
                        <Field key={fieldName}
                            fieldName={fieldName}
                            field={fields[fieldName]}
                            onChange={onChange(fieldName)}
                            showValidation={fields.showValidation &&
                                (fields.showValidation === 'all' ||
                                    fields.showValidation === fieldName)} />
                    )}
                    {loading.message &&
                        <Typography variant='body2' className={classes.info}>
                            {loading.message}
                        </Typography>
                    }
                    <Button type='submit' variant='contained' color='secondary' className={classes.submit}
                        disabled={loading.state}
                        onClick={onSubmit}>
                        {submitText}
                    </Button>
                </Paper>
            </form>
        </ThemeProvider>
    )
};

export default ForgotPasswordForm;