import React from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import IconButton from '@material-ui/core/IconButton';
import Icon from '@material-ui/core/Icon';
import Typography from '@material-ui/core/Typography';

import PhotoList from '../components-personal/PhotoList';

export default function MyPhotoDialog({ open, handleClose, onChange }) {
    return (
        <Dialog open={open} onClose={handleClose} aria-labelledby="pick-my-photos-dialog"
            fullWidth maxWidth='md'>
            <DialogTitle disableTypography id="image-upload-dialog" style={{ display: 'flex', alignItems: 'center' }}>
                <Typography variant='h6' style={{ flexGrow: 1 }}>Select a photo</Typography>
                <IconButton><Icon>close</Icon></IconButton>
            </DialogTitle>
            <DialogContent>
                <PhotoList onClick={onChange} noOwner/>
            </DialogContent>
        </Dialog>
    );
}
