import React, { useState } from 'react';
import { useSnackbar } from 'notistack';
import { useUser } from '../data/userData';

import Form from '../components-generic/Form';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import Icon from '@material-ui/core/Icon';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core';
import { useSetLoadingPath } from '../data/loadingData';

const fieldConfig = {};
const initialValues = {};

const flexCenter = { display: 'flex', alignItems: 'center' };
const flexGrow = { flexGrow: 1 };

const useStyles = makeStyles(theme => ({
    delete: {
        color: 'white',
        borderColor: theme.palette.error.main,
        backgroundColor: theme.palette.error.main,
        marginTop: theme.spacing(2),
        marginBottom: theme.spacing(2)
    }
}));

const ProfileDeleteForm = (props) => {
    const { deleteUser } = useUser();
    const [isLoading, setIsLoading] = useState(false);
    const [dialogOpen, setDialogOpen] = useState(false);
    const { enqueueSnackbar } = useSnackbar();
    const classes = useStyles();
    const setLoadingPath = useSetLoadingPath();

    const onDelete = async (fields) => {
        setIsLoading(true);
        try {
            await deleteUser();
            enqueueSnackbar('Je account en al jouw gegevens zijn verwijderd');
            setLoadingPath('/');
        } catch (_) {
            enqueueSnackbar('Niet gelukt om jou te verwijderen');
            setIsLoading(false);
        }
    }

    const onClose = () => setDialogOpen(false);

    return <>
        <Form
            formFields={fieldConfig}
            initialValues={initialValues}
            isLoading={isLoading}
            deleteText='Verwijder je account voorgoed'
            onDelete={() => setDialogOpen(true)}
        />
        <Dialog open={dialogOpen} onClose={onClose} aria-labelledby="dialog-confirm-account-deletion"
            fullWidth maxWidth='md'>
            <DialogTitle disableTypography id="image-upload-dialog" style={flexCenter}>
                <Typography variant='h6' style={flexGrow}>Wil je clubalmanac echt verlaten?</Typography>
                <IconButton onClick={onClose}><Icon>close</Icon></IconButton>
            </DialogTitle>
            <DialogContent>
                <Typography variant='body1' gutterBottom>
                    Het verwijderen van je account is onomkeerbaar.
                </Typography>
                <Typography variant='body1' gutterBottom>
                    Al je foto's en gegevens worden verwijderd en vergeten. 
                    Ook in groepen en albums van anderen.
                </Typography>
                <Typography variant='body1' gutterBottom>
                    Je kunt dan niet meer inloggen. Een verwijderd account kan niet hersteld worden.
                </Typography>
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose}>
                    OK, ik blijf toch
                </Button>
                <Button onClick={onDelete} variant='contained' color='secondary' disableElevation className={classes.delete}>
                    Zeker weten - verwijder mij voorgoed
                </Button>
            </DialogActions>
        </Dialog>
    </>
};

export default ProfileDeleteForm;