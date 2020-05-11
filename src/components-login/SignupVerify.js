import React, { useState, useContext } from 'react';
import { UserContext } from '../components-generic/UserContext';
import { useRouter } from 'next/router';
import { Auth } from "aws-amplify";
import { makeStyles, createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';

import { Field, useFields, validateForm, validateField } from '../components-generic/FormField';

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
    confirmation: {
        autoComplete: 'none', type: 'tel', label: 'confirmation code',
        validations: [{
            text: 'check your email for verification code',
            validate: (val) => (!!val),
        }],
    },
};

const VerifySignupForm = (props) => {
    const { code, email } = props;
    const userContext = useContext(UserContext);
    const router = useRouter();
    const classes = useStyles();
    const [fields, setFields] = useFields({
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
                const { email, confirmation } = fields;
                await Auth.confirmSignUp(email.value, confirmation.value);
                if (userContext.user.profile && userContext.user.profile.email === email.value) {
                    console.log('auto logging in');
                    const user = await Auth.signIn(email.value, userContext.user.profile.password);
                    userContext.setUser({
                        profile: user.attributes,
                        isAuthenticated: true,
                        isAuthenticating: false,
                    });
                }
                router.push('/');
            } catch (e) {
                console.log(e);
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

    const onResend = async (e) => {
        e.preventDefault();
        if (!validateField(fields.email)) {
            setFields('showValidation')('email');
        } else {
            e.preventDefault();
            setLoading({ state: true });

            try {
                await Auth.resendSignUp(fields.email.value);
                setLoading({
                    state: false,
                    message: 'Please check your email. If you signed up with this address, ' +
                        'you\'ll receive a new verification code.',
                })
            } catch (e) {
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

    const formTitle = (email && email === userContext.user.profile.email)? 
        'Check your inbox'
        :'Validate your account';
    const formSubtitle = 'Just one more step. ' +
        'Complete your email address and the verification code you received by mail. ' +
        'Then you\'re good to go!';

    const submitText = (loading.state) ?
        <CircularProgress size='1.5rem' color='inherit' />
        : 'Confirm membership';

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
                    <Button color='primary' className={classes.submit}
                        disabled={loading.state}
                        onClick={onResend}>
                        {resendText}
                    </Button>
                </Paper>
            </form>
        </ThemeProvider>
    )
};

export default VerifySignupForm;