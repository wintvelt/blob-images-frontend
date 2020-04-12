import React, { useState } from 'react'
import { makeStyles, createMuiTheme, ThemeProvider } from '@material-ui/core/styles'
import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button';
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';

import Link from './Link';
import { Field } from './FormField';

const useStyles = makeStyles(theme => ({
    signupForm: {
        position: 'relative',
        marginTop: theme.spacing(12),
        marginRight: theme.spacing(8),
        marginBottom: theme.spacing(4),
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

const fieldConfig = [
    {
        fieldName: 'email', autoComplete: 'email', type: 'email', label: 'email',
        validation: (val) => {
            if (!val) return 'email is needed to sign up';
            if (!val.split('@')[1] || !val.split('@')[1].split('.')[1]) return (
                'please enter your email address'
            )
            return '';
        }
    },
    {
        fieldName: 'password', autoComplete: 'password', type: 'password', label: 'password',
        validation: (val) => {
            if (!val) return 'please enter your password';
            return '';
        }
    },
];


const LoginForm = (props) => {
    const classes = useStyles();
    const [fields, setFields] = useState({});

    const onChange = (fieldName) => (e) => {
        const newValue = (e.target.checked) ? e.target.checked : e.target.value;
        const newFields = { ...fields, [fieldName]: newValue };
        const validations = fieldConfig.map(field => {
            return field.validation(newFields[field.fieldName])
        });
        const validated = validations[0].length === 0 && validations[1].length === 0;
        setFields({ ...newFields, validated, showValidation: false });
    }

    const onSubmit = () => {
        // TODO: check email exists
        if (!fields.validated) {
            setFields({ ...fields, showValidation: true })
        }

    }

    return (
        <ThemeProvider theme={theme}>
            <form name='signup-form' noValidate>
                <Paper className={classes.signupForm}>
                    <Typography component="h1" variant="h4" color="inherit"
                        align='center' gutterBottom>
                        Welcome back!
                    </Typography>
                    <Typography paragraph variant='subtitle1'>
                        Please log in with your email and password
                    </Typography>
                    {fieldConfig.map(field =>
                        <Field key={field.fieldName}
                            config={field} value={fields[field.fieldName]}
                            onChange={onChange(field.fieldName)}
                            showValidation={fields.showValidation} />
                    )}
                    <FormControlLabel
                        control={<Checkbox name="optin" color='secondary'
                            onChange={onChange('optin')} checked={!!fields.optin} />}
                        label='remember me for 30 days'
                    />
                    <Button variant='contained' color='primary' className={classes.submit}
                        onClick={onSubmit}>
                        Login
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