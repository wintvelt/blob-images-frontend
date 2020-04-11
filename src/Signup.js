import React, { useState } from 'react'
import { makeStyles, createMuiTheme, ThemeProvider } from '@material-ui/core/styles'
import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField'
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Link from './Link';
import Icon from '@material-ui/core/Icon';
import IconButton from '@material-ui/core/IconButton';
import InputAdornment from '@material-ui/core/InputAdornment';

const useStyles = makeStyles(theme => ({
    signupForm: {
        position: 'relative',
        marginTop: theme.spacing(12),
        marginRight: theme.spacing(8),
        marginBottom: '-80px',
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
        fieldName: 'name', autoComplete: 'name', type: 'text', label: 'Your name',
        validation: (val) => {
            if (!val) return 'please fill out your name';
            return '';
        }
    },
    {
        fieldName: 'email', autoComplete: 'email', type: 'email', label: 'Your email',
        validation: (val) => {
            if (!val) return 'email is needed to sign up';
            if (!val.split('@')[1] || !val.split('@')[1].split('.')[1]) return (
                'please enter a valid email address'
            )
            return '';
        }
    },
    {
        fieldName: 'groupName', autoComplete: 'chrome-off', type: 'text', label: 'Name of your group',
        validation: (val) => {
            if (!val) return 'please name your first group, you can change this later';
            return '';
        }
    },
    {
        fieldName: 'password', autoComplete: 'password', type: 'password', label: 'Your new password',
        validation: (val) => {
            if (!val || val.length < 8) return 'minimum of 8 characters, just to be sure';
            return '';
        }
    },
];

const PasswordField = (props) => {
    const { config, value, onChange, showValidation } = props;
    const validationResult = showValidation ?
        config.validation(value) : '';
    const [visibility, setVisibility] = useState(false);
    const handleClickShowPassword = () => {
        setVisibility(!visibility);
    };
    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };
    return (
        <TextField variant='outlined' color='secondary' size='small' margin='dense'
            type={(visibility ? 'text' : 'password')}
            label={config.label} autoComplete={config.autoComplete}
            helperText={validationResult || ''}
            error={!!validationResult}
            onChange={onChange} value={value || ''}
            InputProps={{
                style: { paddingRight: 0 },
                endAdornment: <InputAdornment position="end">
                    <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowPassword}
                        onMouseDown={handleMouseDownPassword}
                    >
                        <Icon>{visibility ? 'visibility_off' : 'visibility'}</Icon>
                    </IconButton>
                </InputAdornment>
            }}
        />
    )
}

const Field = ({ config, value, onChange, showValidation }) => {
    const validationResult = showValidation ?
        config.validation(value) : '';
    return (config.type === 'password') ?
        <PasswordField {...props} />
        : <TextField variant='outlined' color='secondary' size='small' margin='dense'
            type={config.type}
            label={config.label} autoComplete={config.autoComplete}
            helperText={validationResult}
            error={!!validationResult}
            onChange={onChange} value={value || ''} />
}

const SignupForm = (props) => {
    const classes = useStyles();
    const [fields, setFields] = useState({});

    const onChange = (fieldName) => (e) => {
        const newValue = (e.target.checked) ? e.target.checked : e.target.value;
        const newFields = { ...fields, [fieldName]: newValue };
        const validated = (newFields.name && newFields.email && newFields.groupName
            && newFields.password
            && newFields.optin);
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
                        Sign up today
                            </Typography>
                    <Typography paragraph variant='subtitle1'>
                        Enter your info, then invite friends and family,
                        and share your first photos!
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
                        label={<span>
                            I agree to the{' '}
                            <Link href='#' color='textPrimary'>
                                terms and conditions
                            </Link>
                        </span>}
                    />
                    {fields.showValidation && !fields.optin &&
                        <Typography variant='caption' color='error' style={{ marginLeft: '12px' }}>
                            to register, you have to agree to the terms and conditions
                        </Typography>
                    }
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