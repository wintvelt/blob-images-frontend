import React from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';

import PhotoList from '../components-personal/PhotoList';

export default function MyPhotoDialog({ open, handleClose, onChange }) {
    return (
        <Dialog open={open} onClose={handleClose} aria-labelledby="pick-my-photos-dialog"
            fullWidth maxWidth='md'>
            <DialogTitle id="image-upload-dialog">Select a photo</DialogTitle>
            <DialogContent>
                <PhotoList onClick={onChange} />
            </DialogContent>
        </Dialog>
    );
}
