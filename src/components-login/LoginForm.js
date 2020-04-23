import React, { useContext, useState } from 'react';
import { Auth } from "aws-amplify";
import { useRouter } from 'next/router';

import { makeStyles, createMuiTheme, ThemeProvider } from '@material-ui/core/styles'
import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';

import Link from '../Link';
import { Field, useFields, validateForm } from '../FormField';
import { UserContext } from '../UserContext';

const useStyles = makeStyles(theme => ({
    loginForm: {
        position: 'relative',
        marginTop: theme.spacing(10),
        marginRight: theme.spacing(8),
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
        marginBottom: theme.spacing(2)
    },
    smallButton: {
        fontSize: '12px',
        padding: theme.spacing(0),
        fontWeight: 400,
        textTransform: 'none'
    },
    verifyButton: {
        padding: theme.spacing(0),
        margin: theme.spacing(0, 1),
        fontWeight: 400,
        textTransform: 'none'
    },
    linkText: {
        color: '#551b8b',
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

const fieldConfig = {
    email: {
        autoComplete: 'email',
        type: 'email',
        label: 'email',
        validations: [{
            text: 'please enter your email address',
            validate: (val) => (val && val.split('@')[1] && !!val.split('@')[1].split('.')[1]),
        }],
    },
    password: {
        autoComplete: 'current-password',
        type: 'password',
        label: 'password',
        validations: [{
            text: 'please enter your password',
            validate: (val) => (!!val)
        }],
    },
};


const LoginForm = (props) => {
    const userContext = useContext(UserContext);
    const router = useRouter();
    const classes = useStyles();
    const [fields, setFields] = useFields(fieldConfig);
    const [loading, setLoading] = useState(false);

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
                const { email, password } = fields;
                const user = await Auth.signIn(email.value, password.value);
                userContext.setUser({
                    profile: user.attributes,
                    isAuthenticated: true,
                    isAuthenticating: false,
                });
                setLoading({ state: false });
            } catch (e) {
                console.log(e);
                setLoading({
                    state: false,
                    message: e.message,
                    unconfirmedUser: (e.code === 'UserNotConfirmedException')
                })
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

    const onVerify = async (e) => {
        e.preventDefault();
        setLoading({ state: true });
        try {
            await Auth.resendSignUp(fields.email.value);
            router.push('/verifysignup?email=' + encodeURIComponent(fields.email.value));
        } catch (e) {
            setLoading({
                state: false,
                message: e.message
            });
        }
    }

    const loginButtonContent = loading.state ? <CircularProgress size='1.5rem' color='secondary' />
        : 'Login';

    return (
        <ThemeProvider theme={theme}>
            <form name='login-form' noValidate>
                <Paper className={classes.loginForm}>
                    <Typography component="h1" variant="h4" color="inherit"
                        align='center' gutterBottom>
                        Welcome back!
                    </Typography>
                    <Typography paragraph variant='subtitle1'>
                        Please log in with your email and password
                    </Typography>
                    {Object.keys(fieldConfig).map(fieldName =>
                        <Field key={fieldName}
                            fieldName={fieldName}
                            field={fields[fieldName]}
                            onChange={onChange(fieldName)}
                            showValidation={fields.showValidation} />
                    )}
                    {loading.message && <Typography variant='body2' color='error' >
                        Hmm, we could not log you in. <br />
                        {loading.message}<br />
                        {loading.unconfirmedUser && <span>
                            Maybe you need to
                            <Button onClick={onVerify} className={classes.verifyButton}>
                                Confirm your email
                            </Button>?
                        </span>}
                    </Typography>}
                    <Button type='submit' variant='contained' color='secondary' className={classes.submit}
                        disabled={loading.state}
                        onClick={onSubmit}>
                        {loginButtonContent}
                    </Button>
                    <div style={{
                        display: 'flex',
                        justifyContent: 'space-between'
                    }}>
                        <Typography variant='caption' gutterBottom>
                            <Button onClick={onForgotPsw} className={classes.smallButton}>
                                Forgot password
                            </Button>
                        </Typography>
                        <Typography variant='caption' gutterBottom>
                            <Link href='#' color='textPrimary'>Sign up</Link>
                        </Typography>
                    </div>
                </Paper>
            </form>
        </ThemeProvider>
    )
};

export default LoginForm