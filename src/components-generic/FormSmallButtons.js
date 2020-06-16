import React from 'react';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
    smallButton: {
        fontSize: '14px',
        padding: theme.spacing(0),
        fontWeight: 400,
        textTransform: 'none',
        marginTop: theme.spacing(1),
        minWidth: 0,
    },
}));

const FormSmallButtons = ({ buttons, values }) => {
    const classes = useStyles();

    const handleClick = (onClick) => () => onClick(values);

    return <div style={{
        display: 'flex',
        justifyContent: (buttons.length > 1) ? 'space-between' : 'center'
    }}>
        {buttons.map((button, i) => (
            <Typography key={i} variant='caption' gutterBottom>
                <Button onClick={handleClick(button.onClick)}
                    className={classes.smallButton} color='primary'>
                    {button.text}
                </Button>
            </Typography>
        ))}
    </div>
}

export default FormSmallButtons;
