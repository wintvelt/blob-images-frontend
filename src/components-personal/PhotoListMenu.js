import React from 'react';
import { API } from 'aws-amplify';

import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import { useSnackbar } from 'notistack';

import { useApiData } from '../components-generic/DataProvider';
import { useUser } from '../components-generic/UserContext';

const PhotoMenu = ({ anchor, album, handleClose, apiKey, source }) => {
    const albumData = album && album.data;
    const { user, saveProfile } = useUser(true);
    const userIsOwner = (user.profile && anchor.photo && user.profile.id === anchor.photo.SK.slice(1));
    const { enqueueSnackbar } = useSnackbar();
    const { reloadData } = useApiData(apiKey, source, true)
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
        const albumUrl = `/groups/${albumData.PK.slice(2)}/albums/${SK}`;
        try {
            await API.put('blob-images', albumUrl, {
                body: {
                    name: albumData.name,
                    image: { image: anchor.photo.url, owner: anchor.photo.owner, id: anchor.photo.id },
                    imageUrl: anchor.photo.url
                }
            });
            enqueueSnackbar('set album cover picture', { variant: 'success' });
            reloadData();
        } catch (error) {
            console.log(error);
            enqueueSnackbar('could not delete picture', { variant: 'error' });
        }
    }
    const onDelete = async () => {
        try {
            const path = `/photos/${anchor.photo.id}`;
            await API.del('blob-images', path);
            enqueueSnackbar('photo deleted', { variant: 'success' });
            reloadData();
        } catch (error) {
            console.log(error);
            enqueueSnackbar('could not delete picture', { variant: 'error' });
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
            {album && <MenuItem>Set as album cover</MenuItem>}
            <MenuItem onClick={onSetProfilePic}>Set as profile picture</MenuItem>
            {album && userIsOwner && <MenuItem>Remove from album</MenuItem>}
            {userIsOwner && <MenuItem onClick={onDelete} style={{ color: 'red' }}>Delete</MenuItem>}
        </Menu>
    );
}

export default PhotoMenu;