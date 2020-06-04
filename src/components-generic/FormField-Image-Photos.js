import React from 'react';
import { useRouter } from 'next/router';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import IconButton from '@material-ui/core/IconButton';
import Icon from '@material-ui/core/Icon';
import Typography from '@material-ui/core/Typography';

import PhotoList from '../components-personal/PhotoList';

const makeListProps = (type, groupId, albumId) => {
    switch (type) {
        case 'group': {
            return {
                title: 'Pick from group photos',
                apiKey: `groupPhotos`,
                source: `/groups/${groupId}/photos`,
            }
        }

        case 'album': {
            return {
                title: 'Pick from album photos',
                apiKey: `albumPhotos`,
                source: `/groups/${groupId}/albums/${albumId}/photos`,
            }
        }

        default: {
            return {
                title: 'Pick from my own photos',
                apiKey: 'myPhotos',
                source: '/photos',
            }
        }
    }
}

export default function PhotoPickDialog({ type, open, handleClose, onChange }) {
    const router = useRouter();
    const groupId = router.query.id;
    const albumId = router.query.albumid;
    const listProps = makeListProps(type, groupId, albumId);

    return (
        <Dialog open={open} onClose={handleClose} aria-labelledby="pick-photos-dialog"
            fullWidth maxWidth='md'>
            <DialogTitle disableTypography id="image-upload-dialog" style={{ display: 'flex', alignItems: 'center' }}>
                <Typography variant='h6' style={{ flexGrow: 1 }}>{listProps.title}</Typography>
                <IconButton onClick={handleClose}><Icon>close</Icon></IconButton>
            </DialogTitle>
            <DialogContent>
                <PhotoList {...listProps} noOwner={(type === 'myPhotos')}
                    onClick={onChange} empty='Oh, it seems there are no photos yet..' />
            </DialogContent>
        </Dialog>
    );
}
