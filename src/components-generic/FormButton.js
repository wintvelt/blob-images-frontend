import React, { memo } from 'react';

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

const buttonIsEqual = (prevProps, nextProps) => (
    (prevProps.isLoading === nextProps.isLoading)
);

const FormButton = ({ type, onClick, isLoading, children, disabled }) => {
    const classes = useStyles();
    const buttonContent = isLoading ? <CircularProgress size='1.5rem' color='secondary' />
        : children;
    const [buttonType, variant, className, color] = (type === 'delete') ?
        [undefined, 'outlined', classes.delete, 'inherit']
        : ['submit', 'contained', classes.submit, 'secondary'];
    return (
        <Button type={buttonType} variant={variant} className={className} color={color}
            disabled={isLoading || disabled}
            onClick={onClick}>
            {buttonContent}
        </Button>
    )
};

const MemoFormButton = memo(FormButton, buttonIsEqual);

export default FormButton;