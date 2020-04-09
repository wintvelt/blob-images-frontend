import React, { useState } from 'react'
import { makeStyles, createMuiTheme, ThemeProvider } from '@material-ui/core/styles'
import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField'
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Link from './Link';

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
        type: 'light',
        secondary: {
            other: '#46344e',
            main: '#46344e',
        },
        primary: { main: '#faed26' },
    },
});

const SignupForm = (props) => {
    const classes = useStyles();
    const [fields, setFields] = useState({});

    const onChange = (fieldName) => (e) => {
        const newValue = (e.target.checked) ? e.target.checked : e.target.value;
        const newFields = { ...fields, [fieldName]: newValue };
        const passwordNotValidated = newFields.password2 && newFields.password2 !== newFields.password;
        const validated = (newFields.name && newFields.email && newFields.groupName
            && newFields.password && newFields.password2
            && !passwordNotValidated
            && newFields.optin)
        setFields({ ...newFields, validated });
    }

    return (
        <ThemeProvider theme={theme}>

            <Paper className={classes.signupForm}>
                <Typography component="h1" variant="h4" color="inherit"
                    align='center' gutterBottom>
                    Sign up today
                            </Typography>
                <Typography paragraph variant='subtitle1'>
                    Enter your info, then invite friends and family,
                    and share your first photos!
                            </Typography>
                <TextField variant='outlined' color='secondary' size='small' margin='dense'
                    label='Your name'
                    onChange={onChange('name')} value={fields.name} />
                <TextField variant='outlined' color='secondary' size='small' margin='dense'
                    label='Your Email' type='email'
                    onChange={onChange('email')} value={fields.email} />
                <TextField variant='outlined' color='secondary' size='small' margin='dense'
                    label='Name of your group'
                    onChange={onChange('groupName')} value={fields.groupName} />
                <TextField variant='outlined' color='secondary' size='small' margin='dense'
                    label='Password' type='password'
                    onChange={onChange('password')} value={fields.password} />
                <TextField variant='outlined' color='secondary' size='small' margin='dense'
                    label='Repeat password' type='password'
                    onChange={onChange('password2')} value={fields.password2} />
                <FormControlLabel
                    control={<Checkbox name="checkedC" color='secondary'
                        onChange={onChange('optin')} checked={fields.optin} />}
                    label={<span>
                        I agree to the{' '}
                        <Link href='#' color='secondary' style={{ fontWeight: 'bold' }}>
                            terms and conditions
                        </Link>
                    </span>}
                />
                <Button variant='contained' color='primary' className={classes.submit}
                    disabled={!fields.validated}>
                    Become a member
                </Button>
            </Paper>
        </ThemeProvider>
    )
};

export default SignupForm