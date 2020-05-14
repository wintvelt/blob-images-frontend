import React, { useRef, useState } from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';

import Upload from './Upload';

export default function FormDialog({ open, handleClose }) {
    const pond = useRef(null);
    const [file, setFile] = useState('');
    const onSave = async () => {
        await pond.current.processFiles();
        console.log({ file });
        handleClose();
    }
    const onAddFile = () => {
        const newFile = pond.current && pond.current.getFile().filename;
        console.log({ newFile });
        setFile(newFile);
    }
    return (
        <Dialog open={open} onClose={handleClose} aria-labelledby="image-upload-dialog"
            fullWidth maxWidth='md'>
            <DialogTitle id="image-upload-dialog">Subscribe</DialogTitle>
            <DialogContent>
                <Upload pond={pond} onAddFile={onAddFile} />
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose}>
                    Cancel
                </Button>
                <Button onClick={onSave} variant='contained' color='primary'>
                    Save
                </Button>
            </DialogActions>
        </Dialog>
    );
}
