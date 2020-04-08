import React from 'react'
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
    const { url, title, subTitle, linkText, linkUrl } = props;
    const safeUrl = encodeURI(url);
    const classes = useStyles();

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
                    label='Your name' />
                <TextField variant='outlined' color='secondary' size='small' margin='dense'
                    label='Your Email' type='email' />
                <TextField variant='outlined' color='secondary' size='small' margin='dense'
                    label='Name of your group' />
                <TextField variant='outlined' color='secondary' size='small' margin='dense'
                    label='Password' type='password' />
                <TextField variant='outlined' color='secondary' size='small' margin='dense'
                    label='Repeat password' type='password' />
                <FormControlLabel
                    control={<Checkbox name="checkedC" color='secondary' />}
                    label={<span>
                        I agree to the{' '}
                        <Link href='#' color='secondary' style={{ fontWeight: 'bold' }}>
                            terms and conditions
                                    </Link>
                    </span>}
                />
                <Button variant='contained' color='primary' className={classes.submit}>
                    Become a member
                </Button>
            </Paper>
        </ThemeProvider>
    )
};

export default SignupForm