import React from 'react';
import { useRouter } from 'next/router';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import IconButton from '@material-ui/core/IconButton';
import Icon from '@material-ui/core/Icon';
import Typography from '@material-ui/core/Typography';

import PhotoList from '../components-personal/PhotoList';
import { useRecoilValueLoadable, useResetRecoilState } from 'recoil';
import { activeAlbumPhotos } from '../data/activeTree-Album';
import { useReloadPhotoIds, useUserPhotoIdsValue } from '../data/userPhotosData';

const flexCenter = { display: 'flex', alignItems: 'center' };
const flexGrow = { flexGrow: 1 };

const MyPhotoList = ({onChange}) => {
    const photoData = useUserPhotoIdsValue();
    const reloadPhotos = useReloadPhotoIds();
    return <PhotoList photoData={photoData} reloadPhotos={reloadPhotos} noOwner
        onClick={onChange} empty='Oh, it seems there are no photos yet..' />
};
const AlbumPhotoList = (props) => {
    // const photoData = useRecoilValueLoadable(activeAlbumPhotos);
    // const reloadPhotos = useResetRecoilState(activeAlbumPhotos);
    return <PhotoList photoData={{ isLoading: true }} reloadPhotos={() => { }} noOwner
        onClick={props.onChange} empty='Oh, it seems there are no photos yet..' />
};
const GroupPhotoList = (props) => {
    // const photoData = useRecoilValueLoadable(userPhotosState);
    // const reloadPhotos = useResetRecoilState(userPhotosState);
    return <PhotoList photoData={{ isLoading: true }} reloadPhotos={() => { }} noOwner
        onClick={props.onChange} empty='Oh, it seems there are no photos yet..' />
}

export default function PhotoPickDialog({ type, open, handleClose, onChange }) {
    const title = (type === 'album') ?
        'Pick from album photos'
        : (type === 'group') ?
            'Pick from group photos'
            : 'Pick from my own photos';
    return (
        <Dialog open={open} onClose={handleClose} aria-labelledby="pick-photos-dialog"
            fullWidth maxWidth='lg'>
            <DialogTitle disableTypography id="image-upload-dialog" style={flexCenter}>
                <Typography variant='h6' style={flexGrow}>{title}</Typography>
                <IconButton onClick={handleClose}><Icon>close</Icon></IconButton>
            </DialogTitle>
            <DialogContent>
                {(type === 'album') && <AlbumPhotoList onChange={onChange} />}
                {(type === 'group') && <GroupPhotoList onChange={onChange} />}
                {(type !== 'group') && (type !== 'album') && <MyPhotoList onChange={onChange} />}
            </DialogContent>
        </Dialog>
    );
}
