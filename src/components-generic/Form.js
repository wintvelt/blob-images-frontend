import React, { useEffect, useRef } from 'react';

import { makeStyles } from '@material-ui/core/styles'
import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography'

import { Field, useFields, validateForm } from '../components-generic/FormField';
import FormButton from '../components-generic/FormButton';
import FormSmallButtons from '../components-generic/FormSmallButtons';
import FormMessage from '../components-generic/FormMessage';

const useStyles = makeStyles(theme => ({
    form: {
        position: 'relative',
        padding: theme.spacing(3, 4, 4, 4),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'stretch',
        justifyContent: 'flex-start'
    },
}));

const getValues = (fields) => {
    let result = {}
    Object.keys(fields).forEach(fieldName => {
        result[fieldName] = fields[fieldName].value;
    });
    return result;
}

const FormWrapper = ({ noPaper, children }) => {
    const classes = useStyles();
    return (noPaper) ?
        <form name='form' noValidate className={classes.form}>
            {children}
        </form>
        : <form name='form' noValidate>
            <Paper className={classes.form}>
                {children}
            </Paper>
        </form>
}

const Form = ({ title, subtitle, formFields, initialValues, isLoading, onSubmit, onDelete, validateDelete,
    submitText, deleteText, smallButtons, Message, noPaper }) => {
    const [fields, setFields] = useFields(formFields);
    const initialValuesStr = useRef(initialValues);

    useEffect(() => {
        const newInitialValuesStr = JSON.stringify(initialValues);
        if (initialValuesStr.current !== newInitialValuesStr) {
            initialValuesStr.current = newInitialValuesStr;
            setFields('MULTI')(initialValues);
        }
    }, [initialValues]);

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

    const handleDelete = async (e) => {
        if (validateDelete && !validateForm(fields)) {
            setFields('showValidation')(true);
        } else {
            onDelete(getValues(fields));
        }
    }

    return (
        <FormWrapper noPaper={noPaper}>
            {title && <Typography component="h1" variant="h4"
                align='left' gutterBottom>
                {title}
            </Typography>}
            {subtitle &&
                <Typography paragraph variant='subtitle1'>
                    {subtitle}
                </Typography>
            }
            {Object.keys(formFields).map(fieldName =>
                <Field key={fieldName}
                    fieldName={fieldName}
                    field={fields[fieldName]}
                    onChange={onChange(fieldName)}
                    showValidation={fields.showValidation} />
            )}
            {Message && <FormMessage>{Message}</FormMessage>}
            {onSubmit && <FormButton type='submit' isLoading={isLoading} onClick={handleSubmit}>
                {submitText}
            </FormButton>}
            {onDelete && <FormButton type='delete' isLoading={isLoading} onClick={handleDelete}>
                {deleteText}
            </FormButton>
            }
            {smallButtons && <FormSmallButtons buttons={smallButtons} values={getValues(fields)} />}
        </FormWrapper>
    )
};

export default Form