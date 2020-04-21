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
        padding: theme.spacing(4),
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
        primary: { main: '#faed26' },
        secondary: {
            other: '#46344e',
            main: '#46344e',
        },
        text: {
            primary: '#551b8b', // lighter purple
        },
    },
});

const fieldConfig = {
    albumName: {
        autoComplete: 'album-name',
        type: 'text',
        label: 'album name',
        validations: [{
            text: 'please enter a name for this album',
            validate: (val) => (!!val),
        }],
    },
    albumDescription: {
        autoComplete: 'album-description',
        type: 'text',
        label: 'album description',
    },
    albumDate: {
        autoComplete: 'album-date',
        type: 'text',
        label: 'album date',
    }
};


const LoginForm = (props) => {
    const userContext = useContext(UserContext);
    const classes = useStyles();
    const [fields, setFields] = useFields(fieldConfig);
    const [loginFailed, setLoginFailed] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const onChange = (fieldName) => (e) => {
        setFields(fieldName)(e);
    }

    const onSubmit = async (e) => {
        e.preventDefault();
        if (!validateForm(fields)) {
            setFields('showValidation')(true);
        } else {
            setIsLoading(true);
            try {
                const { email, password } = fields;
                const user = await Auth.signIn(email.value, password.value);
                userContext.setUser({ user: user.attributes });
                setIsLoading(false);
            } catch (e) {
                setLoginFailed(true);
            }
        }
    }

    const loginButtonContent = isLoading ? <CircularProgress size='1.5rem' color='secondary' />
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
                    {loginFailed && <Typography variant='body2' color='error' >
                        Hmm, we could not log you in. <br />Did you{' '}
                        <Link href='#' color='textPrimary'>
                            Forget your password
                        </Link>
                        ?
                    </Typography>}
                    <Button type='submit' variant='contained' color='primary' className={classes.submit}
                        disabled={isLoading}
                        onClick={onSubmit}>
                        {loginButtonContent}
                    </Button>
                    <div style={{
                        display: 'flex',
                        justifyContent: 'space-between'
                    }}>
                        <Typography variant='caption' gutterBottom>
                            <Link href='#' color='textPrimary'>
                                Forgot password
                            </Link>
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