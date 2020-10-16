import React from 'react';
import { API } from 'aws-amplify';

import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import { useSnackbar } from 'notistack';

import { useUser } from '../data/userData';
import { useRouter } from 'next/router';
import { useSetLoadingPath } from '../data/loadingData';

const redStyle = { color: 'red' };

const PhotoMenu = ({ anchor, album, handleClose, deletePhoto, reloadAlbum,
    isAlbum, publications, reloadPubs }) => {
    const router = useRouter();
    const routerAlbumId = router.query?.albumid;
    const setLoadingPath = useSetLoadingPath();
    const albumData = (isAlbum) ? anchor.album : album;
    const albumPath = `/groups/${albumData?.groupId}/albums/${albumData?.albumId}`;

    const currentPhotoId = anchor.photo?.PK.slice(2);
    const { user, saveProfile } = useUser();
    const userIsOwner = (user.profile && currentPhotoId && user.profile.id === anchor.photo.SK);
    const { enqueueSnackbar } = useSnackbar();
    const onSetProfilePic = async () => {
        const name = user.profile.name;
        try {
            saveProfile(name, currentPhotoId);
            enqueueSnackbar('profielfoto gewijzigd', { variant: 'success' });
        } catch (error) {
            enqueueSnackbar('niet gelukt om profielfoto aan te passen', { variant: 'error' });
        }
        handleClose();
    };
    const onSetAlbumCover = async () => {
        try {
            await API.put('blob-images', albumPath, {
                body: {
                    photoId: currentPhotoId,
                }
            });
            enqueueSnackbar('album foto ingesteld', { variant: 'success' });
            handleClose();
            reloadAlbum && reloadAlbum();
        } catch (error) {
            console.log(error);
            enqueueSnackbar('niet gelukt om albumcover aan te passen', { variant: 'error' });
        }
    }
    const onDelete = async () => {
        try {
            const path = `/photos/${currentPhotoId}`;
            await API.del('blob-images', path);
            enqueueSnackbar('Foto verwijderd', { variant: 'success' });
            deletePhoto && deletePhoto(currentPhotoId);
        } catch (error) {
            console.log(error);
            enqueueSnackbar('Kon foto niet verwijderen', { variant: 'error' });
        }
        handleClose();
    };
    const onAddToAlbum = async () => {
        try {
            const path = `${albumPath}/photos`;
            await API.post('blob-images', path, { body: { photoId: currentPhotoId } });
            enqueueSnackbar('foto aan album toegevoegd', { variant: 'success' });
            reloadAlbum && reloadAlbum();
            reloadPubs && reloadPubs(currentPhotoId);
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
            reloadAlbum && reloadAlbum();
            handleClose();
            if (isAlbum && routerAlbumId === albumData?.albumId) {
                enqueueSnackbar('foto is uit album verwijderd, we gaan terug naar albumpagina');
                setLoadingPath('/personal/groups/[id]/albums/[albumid', '/personal' + albumPath);
            } else {
                reloadPubs && reloadPubs(currentPhotoId);
                if (deletePhoto && routerAlbumId && routerAlbumId === albumData?.albumId) {
                    deletePhoto(currentPhotoId)
                };
                enqueueSnackbar('foto uit album verwijderd');
            }
        } catch (error) {
            console.log(error);
            enqueueSnackbar('foto uit album schrappen is mislukt', { variant: 'error' });
            handleClose();
        }
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
            {!isAlbum && <MenuItem onClick={onSetProfilePic}>Maak dit mijn profielfoto</MenuItem>}
            {album && userIsOwner && (isAlbum && !publications.includes(album.albumId)) &&
                <MenuItem onClick={onAddToAlbum}>Foto aan album toevoegen</MenuItem>
            }
            {album && <MenuItem onClick={onSetAlbumCover}>Foto als albumcover instellen</MenuItem>}
            {album && userIsOwner && (!isAlbum || publications.includes(album.albumId)) &&
                <MenuItem onClick={onRemoveFromAlbum}>Foto uit album verwijderen</MenuItem>
            }
            {userIsOwner && (!isAlbum) && <MenuItem onClick={onDelete} style={redStyle}>Foto verwijderen</MenuItem>}
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