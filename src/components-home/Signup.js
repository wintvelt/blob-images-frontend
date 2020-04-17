import React, { useContext } from 'react'
import { makeStyles, createMuiTheme, ThemeProvider } from '@material-ui/core/styles'
import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button';

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

const EmailHelper = () => (
    <span>
        This email address already has an account. Did you
        {' '}<Link href='#' color='textPrimary'>forget your password?</Link>
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
                val.split('@')[1] && !! val.split('@')[1].split('.')[1]
            )
        }],
    },
    // groupName: {
    //     autoComplete: 'chrome-off', type: 'text', label: 'Name of your group',
    //     validations: [{
    //         text: 'name your first group, you can change this later',
    //         validate: (val) => (!!val),
    //     }],
    // },
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
    const [fields, setFields] = useFields(fieldConfig);

    const onChange = (fieldName) => (e) => {
        setFields(fieldName)(e);
    }

    const onSubmit = () => {
        // TODO: check email exists
        if (!validateForm(fields)) {
            setFields('showValidation')(true);
        }
    }

    return (
        <ThemeProvider theme={theme}>
            <form name='signup-form' noValidate>
                <Paper className={classes.signupForm}>
                    <Typography component="h1" variant="h4" color="inherit"
                        align='center' gutterBottom>
                        Sign up today
                            </Typography>
                    <Typography variant='subtitle1'>
                        Enter your info, then invite friends and family,
                        and share your first photos!
                    </Typography>
                    {Object.keys(fieldConfig).map(fieldName =>
                        <Field key={fieldName}
                            fieldName={fieldName}
                            field={fields[fieldName]}
                            onChange={onChange(fieldName)}
                            showValidation={fields.showValidation} />
                    )}
                    <></>
                    <Button variant='contained' color='primary' className={classes.submit}
                        onClick={onSubmit}>
                        Become a member
                    </Button>
                </Paper>
            </form>
        </ThemeProvider>
    )
};

export default SignupForm