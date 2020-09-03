import React from 'react';
import { API } from 'aws-amplify';

import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import { useSnackbar } from 'notistack';

import { useUser } from '../data/userData';

const redStyle = { color: 'red' };

const PhotoMenu = ({ anchor, album, handleClose, reloadPhotos, reloadAlbum,
    isAlbum, publications, reloadPubs }) => {
    const albumData = album;
    const albumPath = `/groups/${albumData?.PK?.slice(2)}/albums/${albumData?.SK}`;

    const currentPhotoId = anchor.photo?.PK?.slice(2);
    const { user, saveProfile } = useUser();
    const userIsOwner = (user.profile && anchor.photo && user.profile.id === anchor.photo.SK.slice(1));
    const { enqueueSnackbar } = useSnackbar();
    const onSetProfilePic = async () => {
        const name = user.profile.name;
        try {
            saveProfile(name, anchor.photo.url);
            enqueueSnackbar('profile picture set', { variant: 'success' });
        } catch (error) {
            enqueueSnackbar('could not set profile picture', { variant: 'error' });
        }
        handleClose();
    };
    const onSetAlbumCover = async () => {
        try {
            await API.put('blob-images', albumPath, {
                body: {
                    name: albumData.name,
                    image: { image: anchor.photo.url, owner: anchor.photo.owner, id: currentPhotoId },
                    imageUrl: anchor.photo.url
                }
            });
            enqueueSnackbar('new album cover set', { variant: 'success' });
            handleClose();
            reloadAlbum && reloadAlbum();
        } catch (error) {
            console.log(error);
            enqueueSnackbar('could not set album cover', { variant: 'error' });
        }
    }
    const onDelete = async () => {
        try {
            const path = `/photos/${currentPhotoId}`;
            await API.del('blob-images', path);
            enqueueSnackbar('photo deleted', { variant: 'success' });
            reloadPhotos && reloadPhotos();
        } catch (error) {
            console.log(error);
            enqueueSnackbar('could not delete picture', { variant: 'error' });
        }
        handleClose();
    };
    const onAddToAlbum = async () => {
        try {
            const path = `${albumPath}/photos`;
            await API.post('blob-images', path, { body: { photoId: currentPhotoId } });
            enqueueSnackbar('foto aan album toegevoegd', { variant: 'success' });
            reloadAlbum && reloadAlbum();
            reloadPubs && reloadPubs();
        } catch (error) {
            console.log(error);
            enqueueSnackbar('kon foto niet toevoegen', { variant: 'error' });
        }
        handleClose();
    };
    const onRemoveFromAlbum = async () => {
        try {
            const path = `${albumPath}/photos/${currentPhotoId}`;
            await API.del('blob-images', path);
            enqueueSnackbar('foto uit album verwijderd', { variant: 'success' });
            reloadPubs && reloadPubs();
            reloadAlbum && reloadAlbum();
        } catch (error) {
            console.log(error);
            enqueueSnackbar('foto uit album schrappen is mislukt', { variant: 'error' });
        }
        handleClose();
    };
    return (
        <Menu
            id="simple-menu"
            anchorEl={anchor.el}
            anchorOrigin={{ vertical: 'top', horizontal: 'left' }}
            transformOrigin={{ vertical: 'top', horizontal: 'right' }}
            keepMounted
            open={Boolean(anchor.el)}
            onClose={handleClose}
        >
            {album && (!isAlbum) && <MenuItem onClick={onSetAlbumCover}>Set as album cover</MenuItem>}
            {!isAlbum && <MenuItem onClick={onSetProfilePic}>Set as profile picture</MenuItem>}
            {album && userIsOwner && (!isAlbum || publications.includes(album.id)) &&
                <MenuItem onClick={onRemoveFromAlbum}>Remove from album</MenuItem>
            }
            {album && userIsOwner && (isAlbum && !publications.includes(album.id)) &&
                <MenuItem onClick={onAddToAlbum}>Add to album</MenuItem>
            }
            {userIsOwner && (!isAlbum) && <MenuItem onClick={onDelete} style={redStyle}>Delete</MenuItem>}
            {/* <MenuItem>
                <ListItemIcon><Icon fontSize='small'>thumb_up</Icon></ListItemIcon>
                Vote up
            </MenuItem>
            <MenuItem>
                <ListItemIcon><Icon fontSize='small'>thumb_down</Icon></ListItemIcon>
                Vote down
            </MenuItem> */}
        </Menu>
    );
}

export default PhotoMenu;