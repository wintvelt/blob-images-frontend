import React, { useRef, useState } from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';

import Upload from './Upload';
import { useUserValue } from '../data/userData';

export default function UploadDialog({ open, handleClose, onChange }) {
    const pond = useRef(null);
    const user = useUserValue();
    const { profile } = user;
    // const reloadPhotos = useResetRecoilState(userPhotosState);
    const [file, setFile] = useState('');
    const onSave = async () => {
        await pond.current.processFiles();
        if (file) {
            const newImage = {
                url: 'protected/'+ profile.id.slice(1) + '/' + file
            };
            // reloadPhotos();
            onChange(newImage);
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
            <DialogTitle id="image-upload-dialog">Upload een foto</DialogTitle>
            <DialogContent>
                <Upload pond={pond} onAddFile={onAddFile} allowImagePreview={true}/>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose}>
                    Afbreken
                </Button>
                <Button onClick={onSave} variant='contained' color='primary' disabled={!file}>
                    Uploaden
                </Button>
            </DialogActions>
        </Dialog>
    );
}
