import React from 'react';
import Typography from '@material-ui/core/Typography';

const FormMessage = ({ children }) => {
    return <Typography variant='body2' color='error' >
        {children}
    </Typography>
}

export default FormMessage;
