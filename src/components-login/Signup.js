import React, { useState } from 'react';
import { Auth } from "aws-amplify";
import { useRouter } from 'next/router';
import { useUser } from '../components-generic/UserContext';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';

import Link from '../components-generic/Link';
import { Field, useFields, newPasswordValidations, validateForm } from '../components-generic/FormField';

const useStyles = makeStyles(theme => ({
    signupForm: {
        position: 'relative',
        marginBottom: '-80px',
        padding: theme.spacing(4),
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
    },
    smallButton: {
        padding: theme.spacing(0),
        margin: '0 3px 2px 0',
        fontWeight: 400,
        textTransform: 'none'
    },
}));

const EmailHelper = (props) => (
    <span>
        {props.message}<br />
        Did you{' '}
        <Button onClick={props.onForgotPsw} className={props.className}>
            Forget your password
        </Button>?
        <br />
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
            <Link href='#' color='primary'>
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
    const { signup } = useUser(true);
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
                await signup(fields.email.value, fields.password.value, fields.name.value);
                router.push('/verifysignup?email=' + encodeURIComponent(fields.email.value));
            } catch (e) {
                console.log(e);
                setLoading({
                    state: false,
                    message: e.message
                });
            }
        }
    }

    const onForgotPsw = async (e) => {
        e.preventDefault();
        setLoading({ state: true });
        try {
            await Auth.forgotPassword(fields.email.value);
            router.push(`/resetpassword?email=${encodeURIComponent(fields.email.value)}`);
        } catch (e) {
            setLoading({
                state: false,
                message: e.message
            });
        }
    }

    const FormTitle = () => <Typography component="h1" variant="h4"
        align='center' gutterBottom>
        {title || 'Sign up today!'}
    </Typography>;

    const formSubtitle = subtitle || 'Enter your info, then invite friends and family, ' +
        'and share your first photos!';

    const buttonContent = (loading.state) ?
        <CircularProgress size='1.5rem' color='inherit' />
        : 'Become a member';

    return (
        <form name='signup-form' noValidate>
            <Paper className={classes.signupForm}>
                <FormTitle />
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
                        <EmailHelper message={loading.message}
                            onForgotPsw={onForgotPsw}
                            email={fields.email.value}
                            className={classes.smallButton} />
                    </Typography>
                }
                <Button variant='contained' color='secondary' className={classes.submit}
                    disabled={loading.state}
                    onClick={onSubmit}>
                    {buttonContent}
                </Button>
            </Paper>
        </form>
    )
};

export default SignupForm