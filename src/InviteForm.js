import React, { useContext, useState } from 'react';
import { UserContext } from './UserContext';
import { Auth } from "aws-amplify";

import { makeStyles } from '@material-ui/core/styles'
import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';

import Link from './Link';
import { Field, useFields, validateForm } from './FormField';

const useStyles = makeStyles(theme => ({
    inviteForm: {
        position: 'relative',
        padding: theme.spacing(4),
        margin: theme.spacing(0, 12),
        [theme.breakpoints.down('sm')]: {
            margin: 0,
        },
        backgroundColor: theme.palette.background.white,
        color: theme.palette.text.secondary,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'stretch',
        justifyContent: 'flex-start'
    },
    submit: {
        marginTop: theme.spacing(4)
    },
    declineButton: {
        marginTop: theme.spacing(2),
        marginBottom: theme.spacing(2)
    }
}));

const fieldConfig = {
    message: {
        autoComplete: 'message',
        type: 'text',
        label: 'your message (optional)',
        multiline: true,
        rows: 3,
        rowsMax: 8
    }
};


const InviteForm = (props) => {
    const { id, invitorName, albumid } = props;
    const isNew = albumid && (albumid === 'new');
    const userContext = useContext(UserContext);
    const isLoggedIn = userContext.user && userContext.user.isAuthenticated;
    const classes = useStyles();
    const [fields, setFields] = useFields(fieldConfig);
    const [saveFailed, setSaveFailed] = useState(false);
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

    const submitButtonContent = isLoading ? <CircularProgress size='1.5rem' color='secondary' />
        : 'Accept invite';
    const declineButtonContent = isLoading ? <CircularProgress size='1.5rem' color='secondary' />
        : 'Respectfully decline';
    const title = (isNew) ? 'Invite a friend' : 'Will you join?';
    const subtitle = (isNew) ? 'Best to personalize your invite'
        : `Send a response to ${invitorName}`;

    return (
        <form name='login-form' noValidate>
            <Paper className={classes.inviteForm}>
                <Typography component="h1" variant="h4" color="inherit"
                    align='left' gutterBottom>
                    {title}
                </Typography>
                <Typography paragraph variant='subtitle1'>
                    {subtitle}
                </Typography>
                {Object.keys(fieldConfig).map(fieldName =>
                    <Field key={fieldName}
                        fieldName={fieldName}
                        field={fields[fieldName]}
                        onChange={onChange(fieldName)}
                        showValidation={fields.showValidation} />
                )}
                {saveFailed && <Typography variant='body2' color='error' >
                    Hmm, we could not log you in. <br />Did you{' '}
                    <Link href='#' color='textPrimary'>
                        Forget your password
                        </Link>
                        ?
                    </Typography>}
                <Button type='submit' variant='contained' color='secondary' className={classes.submit}
                    disabled={isLoading}
                    onClick={onSubmit}>
                    {submitButtonContent}
                </Button>
                {!isNew && <Button variant='outlined' className={classes.declineButton}
                    disabled={isLoading}
                    onClick={onSubmit}>
                    {declineButtonContent}
                </Button>}
            </Paper>
        </form>
    )
};

export default InviteForm