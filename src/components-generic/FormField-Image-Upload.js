import React, { useRef, useState } from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';

import Upload from './Upload';
import { useUser } from './UserContext';

export default function UploadDialog({ open, handleClose, onChange }) {
    const pond = useRef(null);
    const user = useUser();
    const { profile } = user;
    const [file, setFile] = useState('');
    const onSave = async () => {
        await pond.current.processFiles();
        if (file) {
            const newImage = {
                image: 'protected/'+ profile.id + '/' + file,
                owner: profile.name
            }
            onChange(newImage)
        } else {
            handleClose();
        };
    }
    const onAddFile = () => {
        const newFile = pond.current && pond.current.getFile();
        setFile(newFile ? newFile.filename : '');
    }

    return (
        <Dialog open={open} onClose={handleClose} aria-labelledby="image-upload-dialog"
            fullWidth maxWidth='md'>
            <DialogTitle id="image-upload-dialog">Add a new photo</DialogTitle>
            <DialogContent>
                <Upload pond={pond} onAddFile={onAddFile} />
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose}>
                    Cancel
                </Button>
                <Button onClick={onSave} variant='contained' color='primary' disabled={!file}>
                    Upload
                </Button>
            </DialogActions>
        </Dialog>
    );
}
