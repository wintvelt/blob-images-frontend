import React, { useState } from 'react'
import TextField from '@material-ui/core/TextField'
import Icon from '@material-ui/core/Icon';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import InputAdornment from '@material-ui/core/InputAdornment';
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
    helperText: {
        margin: theme.spacing(0,0,1,2),
        listStyle: 'none',
        padding: 0,
        color: theme.palette.text.secondary,
    }
}))

export const newPasswordValidations = [
    {
        text: 'minimum of 8 characters, to be sure',
        validate: (psw) => (psw && psw.length >= 8),
        showAlways: true,
    },
    {
        text: 'at least 1 uppercase character',
        validate: (psw) => (psw && psw !== psw.toLowerCase()),
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

const validateField = (field) => {
    if (!field.validations || field.validations.length === 0) return true
    return field.validations.reduce((cum, rule) => {
        return cum && rule.validate(field.value);
    }, true)
};

const validateAll = (fields) => (
    Object.keys(fields).reduce(
        (cum, key) => (
            cum && fields[key].validated
        ),
        true
    )
);

export const useFields = (initialFields) => {
    const initialFieldsValidated = {};
    Object.keys(initialFields).forEach(key => (
        initialFieldsValidated[key] = {
            ...initialFields[key],
            validated: validateField(initialFields[key])
        }
    ));
    const [fields, setFields] = useState(initialFieldsValidated);

    const onChange = (fieldName) => (e) => {
        if (fieldName === 'showValidation') {
            setFields({ ...fields, showValidation: e })
        } else {
            const field = fields[fieldName];
            const newValue = (e.target.checked) ? e.target.checked : e.target.value;
            const newValidated = validateField(field);
            const newField = { ...field, value: newValue, validated: newValidated };
            const newFields = { ...fields, [fieldName]: newField };
            setFields({
                ...newFields,
                allValidated: validateAll(newFields),
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
            <TextField variant='outlined' color='secondary' size='small' margin='dense'
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
}

const CheckboxField = (props) => {
    const { fieldName, field, onChange, helperText, error } = props;
    return <>
        <FormControlLabel
            control={<Checkbox name={fieldName} color='secondary'
                onChange={onChange} checked={!!field.value} />}
            label={field.label}
        />
        {helperText && helperText}
    </>
}

export const Field = (props) => {
    const { field, onChange, showValidation } = props;
    const helperText = validationText(field, showValidation);
    const error = showValidation && !validateField(field);
    return (field.type === 'password') ?
        <PasswordField {...props} helperText={helperText} error={error} />
        : (field.type === 'checkbox') ?
            <CheckboxField {...props} helperText={helperText} error={error} />
            : <>
                <TextField variant='outlined' color='secondary' size='small' margin='dense'
                    type={field.type}
                    label={field.label} autoComplete={field.autoComplete}
                    error={error}
                    onChange={onChange} value={field.value || ''} />
                {helperText && helperText}
            </>
}