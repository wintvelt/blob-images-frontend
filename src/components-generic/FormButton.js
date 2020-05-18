import React from 'react';

import { makeStyles } from '@material-ui/core/styles'
import CircularProgress from '@material-ui/core/CircularProgress';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles(theme => ({
    submit: {
        marginTop: theme.spacing(4),
        color: theme.palette.text.secondary
    },
    delete: {
        color: theme.palette.error.main,
        borderColor: theme.palette.error.main,
        marginTop: theme.spacing(2),
        marginBottom: theme.spacing(2)
    }
}));

const FormButton = ({ type, onClick, isLoading, children }) => {
    const classes = useStyles();
    const buttonContent = isLoading ? <CircularProgress size='1.5rem' color='secondary' />
        : children;
    const [buttonType, variant, className, color] = (type === 'delete') ?
        [undefined, 'outlined', classes.delete, 'inherit']
        : ['submit', 'contained', classes.submit, 'secondary'];
    return (
        <Button type={buttonType} variant={variant} className={className} color={color}
            disabled={isLoading}
            onClick={onClick}>
            {buttonContent}
        </Button>
    )
};

export default FormButton