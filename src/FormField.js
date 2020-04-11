import React, { useState } from 'react'
import TextField from '@material-ui/core/TextField'
import Icon from '@material-ui/core/Icon';
import IconButton from '@material-ui/core/IconButton';
import InputAdornment from '@material-ui/core/InputAdornment';

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

export const Field = (props) => {
    const { config, value, onChange, showValidation } = props;
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