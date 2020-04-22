import React, { useContext, useState } from 'react';
import { Auth } from "aws-amplify";

import { makeStyles, createMuiTheme, ThemeProvider } from '@material-ui/core/styles'
import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';

import Link from './Link';
import { Field, useFields, validateForm } from './FormField';
import { UserContext } from './UserContext';

const useStyles = makeStyles(theme => ({
    loginForm: {
        position: 'relative',
        marginTop: theme.spacing(10),
        marginRight: theme.spacing(8),
        padding: theme.spacing(4),
        marginLeft: '20%',
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
        marginBottom: theme.spacing(2)
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
                userContext.setUser({ profile: user.attributes });
                setLoading({ state: false });
            } catch (e) {
                setLoading({
                    state: false,
                    message: e.message
                })
            }
        }
    }

    const onForgotPsw = async (e) => {
        e.preventDefault();
        setLoading({ state: true });
        try {
            await Auth.forgotPassword(fields.email.value);
            setLoading({ state: false });
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
                        {loading.message}
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
                            <Button onClick={onForgotPsw} color='textPrimary'>
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