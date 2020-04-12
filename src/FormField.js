import React, { useState } from 'react'
import TextField from '@material-ui/core/TextField'
import Icon from '@material-ui/core/Icon';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import InputAdornment from '@material-ui/core/InputAdornment';
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';

const newPasswordValidationConfig = [
    {
        text: 'minimum of 8 characters, to be sure',
        validate: (psw) => (psw && psw.length >= 8)
    },
    {
        text: 'at least 1 uppercase character',
        validate: (psw) => (psw && psw !== psw.toLowerCase()),
    },
];

const validateAll = (fields) => (
    Object.keys(fields).reduce(
        (cum, key) => (
            cum &&
            !(fields[key].validation(fields[key].value)))
            && (!fields[key].newPassword || !newPasswordValidationConfig.reduce((cum, it) => {
                return cum && it.validate(fields[key].value)
            })),
        true
    )
)

export const useFields = (initialFields) => {
    const initialFieldsValidated = {};
    Object.keys(initialFields).forEach(key => (
        initialFieldsValidated[key] = {
            ...initialFields[key],
            validated: initialFields[key].validation()
        }
    ));
    const [fields, setFields] = useState(initialFieldsValidated);

    const onChange = (fieldName) => (e) => {
        if (fieldName === 'showValidation') {
            setFields({ ...fields, showValidation: e })
        } else {
            const field = fields[fieldName];
            const newValue = (e.target.checked) ? e.target.checked : e.target.value;
            const newValidated = field.validation ? field.validation(newValue) : undefined;
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

export const PasswordValidationHelper = (props) => {
    const { value, showValidation } = props;
    const password = value;
    return <ul style={{ marginLeft: '13px' }}>
        {newPasswordValidationConfig.map((config, i) => {
            const validated = config.validate(password);
            const color = (showValidation && !validated) ? 'error' : 'inherit'
            const style = (validated) ? { color: 'green' } : {};
            return <li key={i}>
                <Typography variant='caption' style={style} color={color}>
                    {config.text}
                </Typography>
                {' '}
                {validated &&
                    <Typography variant='caption' style={style}>{'✔︎'}</Typography>
                }
            </li>
        })}
    </ul>
}

const PasswordField = (props) => {
    const { field, onChange, showValidation } = props;
    const validationResult = showValidation ?
        field.validation(field.value) : '';
    const showError = showValidation && (
        !!validationResult ||
        (
            field.newPassword && !newPasswordValidationConfig.reduce((cum, it) => (
                cum && it.validate(field.value)
            ), true)
        )
    );
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
                error={showError}
                helperText={validationResult}
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
            {field.newPassword &&
                <PasswordValidationHelper value={field.value} showValidation={showValidation} />
            }
        </>
    )
}

const CheckboxField = (props) => {
    const { fieldName, field, onChange, showValidation } = props;
    const validationResult = field.validation(field.value);
    return <>
        <FormControlLabel
            control={<Checkbox name={fieldName} color='secondary'
                onChange={onChange} checked={!!field.value} />}
            label={field.label}
        />
        {
            showValidation && validationResult &&
            <Typography variant='caption' color='error' style={{ marginLeft: '12px' }}>
                {validationResult}
            </Typography>
        }
    </>
}

export const Field = (props) => {
    const { field, onChange, showValidation } = props;
    const validationResult = showValidation ?
        field.validated : '';
    return (field.type === 'password') ?
        <PasswordField {...props} />
        : (field.type === 'checkbox') ?
            <CheckboxField {...props} />
            : <TextField variant='outlined' color='secondary' size='small' margin='dense'
                type={field.type}
                label={field.label} autoComplete={field.autoComplete}
                helperText={validationResult}
                error={!!validationResult}
                onChange={onChange} value={field.value || ''} />
}