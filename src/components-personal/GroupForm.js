import React, { useState } from 'react';

import { makeStyles } from '@material-ui/core/styles'
import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';

import Link from '../components-generic/Link';
import { Field, useFields, validateForm } from '../FormField';

const useStyles = makeStyles(theme => ({
    form: {
        position: 'relative',
        padding: theme.spacing(4),
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
    deleteButton: {
        color: theme.palette.error.main,
        borderColor: theme.palette.error.main,
        marginTop: theme.spacing(2),
        marginBottom: theme.spacing(2)
    }
}));

const fieldConfig = {
    groupName: {
        autoComplete: 'group-name',
        type: 'text',
        label: 'group name',
        validations: [{
            text: 'please enter a name for this group',
            validate: (val) => (!!val),
        }],
    },
    groupDescription: {
        autoComplete: 'group-description',
        type: 'text',
        label: 'group description',
    },
    groupDate: {
        autoComplete: 'group-date',
        type: 'date',
        label: 'group date',
    }
};


const GroupForm = (props) => {
    const { id, albumid } = props;
    const isNew = albumid && (albumid === 'new');
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
                setIsLoading(false);
            } catch (e) {
                setLoginFailed(true);
            }
        }
    }

    const saveButtonContent = isLoading ? <CircularProgress size='1.5rem' color='secondary' />
        : (isNew) ? 'Create album'
            : 'Save changes';
    const deleteButtonContent = isLoading ? <CircularProgress size='1.5rem' color='secondary' />
        : 'Delete this album';
    const title = (isNew) ? 'Create a new group' : `${groupName} `;
    const subtitle = '';
    // const subtitle = (isNew) ? 'Hit save to create the group'
    //     : 'Save your changes after you have made your edits';

    return (
        <form name='login-form' noValidate>
            <Paper className={classes.form}>
                <Typography component="h1" variant="h4"
                    align='left' gutterBottom color='inherit'>
                    {title}
                </Typography>
                <Typography paragraph variant='subtitle1' color='inherit'>
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
                    {saveButtonContent}
                </Button>
                {!isNew && <Button variant='outlined' className={classes.deleteButton}
                    disabled={isLoading}
                    onClick={onSubmit}>
                    {deleteButtonContent}
                </Button>}
            </Paper>
        </form>
    )
};

export default GroupForm