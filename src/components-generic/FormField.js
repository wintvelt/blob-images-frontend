import React, { useState } from 'react';
import 'date-fns';
import DateFnsUtils from '@date-io/date-fns';
import {
    MuiPickersUtilsProvider,
    KeyboardDatePicker,
} from '@material-ui/pickers';
import TextField from '@material-ui/core/TextField'
import Icon from '@material-ui/core/Icon';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import InputAdornment from '@material-ui/core/InputAdornment';
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import { makeStyles } from '@material-ui/core/styles';

import ImageField from './FormField-Image';

const useStyles = makeStyles(theme => ({
    helperText: {
        margin: theme.spacing(0, 0, 1, 2),
        listStyle: 'none',
        padding: 0,
        color: theme.palette.text.secondary,
    }
}))

export const newPasswordValidations = [
    {
        text: 'at least 1 capital letter',
        validate: (psw) => (psw && psw !== psw.toLowerCase()),
        showAlways: true,
    },
    {
        text: 'at least 1 lowercase letter',
        validate: (psw) => (psw && psw !== psw.toUpperCase()),
        showAlways: true,
    },
    {
        text: 'at least 1 number',
        validate: (psw) => (psw && /\d/.test(psw)),
        showAlways: true,
    },
    {
        text: 'minimum of 8 characters, to be sure',
        validate: (psw) => (psw && psw.length >= 8),
        showAlways: true,
    },
];

const validationText = (field, showValidation) => {
    const classes = useStyles();
    const validations = field.validations || [];
    const validationsToShow = validations.filter(rule => (
        rule.showAlways || showValidation
    ));
    if (validationsToShow.length === 0) return '';
    return <ul className={classes.helperText}>
        {validationsToShow.map(rule => {
            const validated = rule.validate(field.value);
            const color = (validated || !showValidation) ? 'inherit' : 'error';
            const style = validated ? { color: 'green ' } : {};
            return <li key={rule.text}>
                <Typography variant='caption' color={color} style={style}>
                    {rule.text}
                    {validated && ' ✔︎'}
                </Typography>
            </li>
        })}
    </ul>;
};

export const validateField = (field) => {
    if (!field.validations || field.validations.length === 0) return true
    return field.validations.reduce((cum, rule) => {
        return cum && rule.validate(field.value);
    }, true)
};

export const validateForm = (fields) => (
    Object.keys(fields).reduce(
        (cum, key) => (
            cum && validateField(fields[key])
        ),
        true
    )
);

export const useFields = (initialFields) => {
    const [fields, setFields] = useState(initialFields);

    const onChange = (fieldName) => (e) => {
        if (fieldName === 'MULTI') {
            const newValues = e;
            let fieldUpdates = {};
            Object.keys(newValues).forEach(key => {
                if (fields[key]) {
                    fieldUpdates[key] = {
                        ...fields[key],
                        value: newValues[key]
                    }
                }
            });
            setFields({
                ...fields,
                ...fieldUpdates,
            });
        } else if (fieldName === 'showValidation') {
            setFields({ ...fields, showValidation: e })
        } else {
            const field = fields[fieldName];
            const newValue = (e.target.checked) ? e.target.checked : e.target.value;
            const newField = { ...field, value: newValue };
            const newFields = { ...fields, [fieldName]: newField };
            setFields({
                ...newFields
                // showValidation: false,
            });
        }
    }
    return [fields, onChange];
}

const PasswordField = (props) => {
    const { field, onChange, helperText, error } = props;
    const [visibility, setVisibility] = useState(false);
    const handleClickShowPassword = () => {
        setVisibility(!visibility);
    };
    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };
    return (
        <>
            <TextField variant='outlined' size='small' margin='normal'
                type={(visibility ? 'text' : 'password')}
                label={field.label} autoComplete={field.autoComplete}
                error={error}
                onChange={onChange} value={field.value || ''}
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
            {helperText && helperText}
        </>
    )
};

const CheckboxField = (props) => {
    const { fieldName, field, onChange, helperText, error } = props;
    return <>
        <FormControlLabel
            control={<Checkbox name={fieldName}
                onChange={onChange} checked={!!field.value} />}
            label={field.label}
        />
        {helperText && helperText}
    </>
};

const DateField = (props) => {
    const { fieldName, field, onChange, helperText, error } = props;
    const [selectedDate, setSelectedDate] = React.useState(new Date('2014-08-18T21:11:54'));

    const handleDateChange = (date) => {
        setSelectedDate(date);
    };
    return <MuiPickersUtilsProvider utils={DateFnsUtils}>
        <KeyboardDatePicker
            margin="dense"
            inputVariant='outlined'
            id="date-picker-dialog"
            label="Date picker dialog"
            format="dd/MM/yyyy"
            value={selectedDate}
            onChange={handleDateChange}
            KeyboardButtonProps={{
                'aria-label': 'change date',
            }}
            style={{ marginTop: '16px' }}
        />
    </MuiPickersUtilsProvider>
}

export const Field = (props) => {
    const { field, onChange, showValidation } = props;
    const helperText = validationText(field, showValidation);
    const error = showValidation && !validateField(field);
    return (field.type === 'password') ?
        <PasswordField {...props} helperText={helperText} error={error} />
        : (field.type === 'checkbox') ?
            <CheckboxField {...props} helperText={helperText} error={error} />
            : (field.type === 'date') ?
                <DateField {...props} helperText={helperText} error={error} />
                : (field.type === 'image') ?
                    <>
                        <ImageField {...props} />
                    </>
                    : <>
                        <TextField variant='outlined' size='small' margin='normal'
                            type={field.type}
                            label={field.label} autoComplete={field.autoComplete}
                            multiline={field.multiline || undefined}
                            rows={field.rows || undefined}
                            rowsMax={field.rowsMax || undefined}
                            error={error}
                            onChange={onChange} value={field.value || ''} />
                        {helperText && helperText}
                    </>
}