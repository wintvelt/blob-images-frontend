import React, { useState } from 'react';
import { Auth } from "aws-amplify";
import { useRouter } from 'next/router';
import { makeStyles, createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';

import Link from '../Link';
import { Field, useFields, newPasswordValidations, validateForm } from '../FormField';

const useStyles = makeStyles(theme => ({
    signupForm: {
        position: 'relative',
        marginTop: theme.spacing(12),
        marginBottom: '-120px',
        padding: theme.spacing(4),
        marginLeft: '10%',
        marginRight: '30%',
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
        padding: theme.spacing(.5, 1),
        margin: theme.spacing(1, 0),
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

const EmailHelper = (props) => (
    <span>
        {props.message}<br />
        Did you{' '}<Link href='#' color='textPrimary'>forget your password?</Link><br />
        Or would you like to{' '}
        <Link href={'/verifysignup?email=' + encodeURIComponent(props.email)}
            color='textPrimary'>verify your account?</Link>
    </span>
);

const fieldConfig = {
    name: {
        autoComplete: 'name', type: 'text', label: 'Your name',
        validations: [{
            text: 'fill out your name',
            validate: (val) => (!!val),
        }],
    },
    email: {
        autoComplete: 'email', type: 'email', label: 'Your email',
        validations: [{
            text: 'enter a valid email address',
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
    optin: {
        type: 'checkbox',
        label: <span>
            I agree to the{' '}
            <Link href='#' color='textPrimary'>
                terms and conditions
            </Link>
        </span>,
        validations: [{
            text: 'to register, you have to agree',
            validate: (val) => (!!val),
        }]
    }
};

const SignupForm = (props) => {
    const classes = useStyles();
    const router = useRouter();
    const { title, subtitle } = props;
    const [fields, setFields] = useFields(fieldConfig);
    const [loading, setLoading] = useState({ state: false });

    const onChange = (fieldName) => (e) => {
        setFields(fieldName)(e);
    }

    const onSubmit = async (e) => {
        e.preventDefault();
        if (!validateForm(fields)) {
            setFields('showValidation')(true);
        } else {
            setLoading({ state: true });
            try {
                await Auth.signUp({
                    username: fields.email.value,
                    password: fields.password.value,
                    attributes: {
                        name: fields.name.value,
                    },
                });
                router.push('/verifysignup?email=' + encodeURIComponent(fields.email.value));
            } catch (e) {
                setLoading({
                    state: false,
                    message: e.message
                });
            }
        }
    }

    const formTitle = title || 'Sign up today';
    const formSubtitle = subtitle || 'Enter your info, then invite friends and family, ' +
        'and share your first photos!';

    const buttonContent = (loading.state) ?
        <CircularProgress size='1.5rem' color='inherit' />
        : 'Become a member';

    return (
        <ThemeProvider theme={theme}>
            <form name='signup-form' noValidate>
                <Paper className={classes.signupForm}>
                    <Typography component="h1" variant="h4" color="inherit"
                        align='center' gutterBottom>
                        {formTitle}
                    </Typography>
                    <Typography variant='subtitle1'>
                        {formSubtitle}
                    </Typography>
                    {Object.keys(fieldConfig).map(fieldName =>
                        <Field key={fieldName}
                            fieldName={fieldName}
                            field={fields[fieldName]}
                            onChange={onChange(fieldName)}
                            showValidation={fields.showValidation} />
                    )}
                    {loading.message &&
                        <Typography variant='body2' className={classes.info} color='error'>
                            <EmailHelper message={loading.message} email={fields.email.value} />
                        </Typography>
                    }
                    <Button variant='contained' color='secondary' className={classes.submit}
                        disabled={loading.state}
                        onClick={onSubmit}>
                        {buttonContent}
                    </Button>
                </Paper>
            </form>
        </ThemeProvider>
    )
};

export default SignupForm