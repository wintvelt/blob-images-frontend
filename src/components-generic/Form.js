import React, { useEffect } from 'react';

import { makeStyles } from '@material-ui/core/styles'
import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography'

import { Field, useFields, validateForm } from '../components-generic/FormField';
import FormButton from '../components-generic/FormButton';

const useStyles = makeStyles(theme => ({
    form: {
        position: 'relative',
        padding: theme.spacing(3, 4, 4, 4),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'stretch',
        justifyContent: 'flex-start'
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

const getValues = (fields) => {
    let result = {}
    Object.keys(fields).forEach(fieldName => {
        result[fieldName] = fields[fieldName].value;
    });
    return result;
}

const Form = ({ title, subtitle, formFields, initialValues, loading, onSubmit, onDelete,
    submitText, deleteText }) => {
    const { isLoading, success, error } = loading || {};
    const classes = useStyles();
    const [fields, setFields] = useFields(formFields);

    useEffect(() => {
        if (initialValues) {
            setFields('MULTI')(initialValues);
        }
    }, [initialValues])

    const onChange = (fieldName) => (e) => {
        setFields(fieldName)(e);
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validateForm(fields)) {
            setFields('showValidation')(true);
        } else {
            onSubmit(getValues(fields));
        }
    }

    return (
        <form name='form' noValidate>
            <Paper className={classes.form}>
                <Typography component="h1" variant="h4"
                    align='left' gutterBottom>
                    {title}
                </Typography>
                {subtitle && <Typography paragraph variant='subtitle1'>
                    {subtitle}
                </Typography>}
                {Object.keys(formFields).map(fieldName =>
                    <Field key={fieldName}
                        fieldName={fieldName}
                        field={fields[fieldName]}
                        onChange={onChange(fieldName)}
                        showValidation={fields.showValidation} />
                )}
                {(error || success) &&
                    <Typography variant='body2' className={classes.info} color={(error) ? 'error' : 'inherit'}>
                        {error || success}
                    </Typography>
                }
                <FormButton type='submit' isLoading={isLoading} onClick={handleSubmit}>
                    {submitText}
                </FormButton>
                {onDelete && <FormButton type='delete' isLoading={isLoading} onClick={onDelete}>
                    {deleteText}
                </FormButton>}
            </Paper>
        </form>
    )
};

export default Form