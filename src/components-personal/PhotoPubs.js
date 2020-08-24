import React, { useState } from 'react';
import {
    List, ListItem, ListItemText, ListItemIcon, ListSubheader,
    makeStyles, ListItemSecondaryAction, Icon, IconButton
}
    from '@material-ui/core';
import { useRecoilValueLoadable } from 'recoil';
import { userAlbums } from '../data/userData';
import { publicationState } from '../data/activeTree-Photo';
import { makeImageUrl } from '../components-generic/imageProvider';
import { useSetLoadingPath } from '../data/loadingData';
import PhotoMenu from './PhotoListMenu';

const useStyles = makeStyles(theme => ({
    list: {
        width: '100%'
    },
    noPadList: {
        paddingLeft: 0
    },
    albumImg: {
        height: '32px',
        width: '32px',
        borderRadius: '4px',
        objectFit: 'cover'
    },
    actions: {
        display: 'flex',
        alignItems: 'center',
    }
}))

const PhotoPubs = ({ photo, currentIsOwner }) => {
    const classes = useStyles();
    const setLoadingPath = useSetLoadingPath();
    const albumsData = useRecoilValueLoadable(userAlbums);
    const albums = (albumsData.state === 'hasValue') ? albumsData.contents : [];
    const photoId = photo?.PK?.slice(2);
    const source = `/publications/${photoId}`;
    const pubData = useRecoilValueLoadable(publicationState(source));
    const pubs = (pubData.state === 'hasValue') ? pubData.contents : [];
    const pubAlbumIds = pubs.map(pub => pub.PK.split('#')[1]);
    const sortedAlbums = albums
        .map(album => ({ ...album, isPublished: pubAlbumIds.includes(album.id) }))
        .sort((a, b) => (a.isPublished) ? (b.isPublished) ? 0 : -1 : 1);

    const [anchor, setAnchor] = useState({ el: null });

    const handleClick = (e, album) => {
        setAnchor({ el: e.currentTarget, album });
    };

    const handleClose = () => {
        setAnchor({ el: null });
    };

    return <>
        <List dense className={classes.list} subheader={
            <ListSubheader className={classes.noPadList}>Publicaties in albums van mijn groepen</ListSubheader>
        }>
            {sortedAlbums.map(album => {
                const { id, name, groupName, image } = album;
                const groupId = album.PK.slice(2);
                const albumUrl = `/personal/groups/${groupId}/albums/${id}`;
                const onAlbumClick = () => {
                    setLoadingPath('/personal/groups/[id]/albums/[albumid]', albumUrl);
                }
                const imageUrl = makeImageUrl(image?.url, 40);
                const onClick = (e) => {
                    handleClick(e, album);
                }
                return <ListItem button key={id} className={classes.noPadList} onClick={onAlbumClick}>
                    <ListItemIcon><img src={imageUrl} className={classes.albumImg} /></ListItemIcon>
                    <ListItemText primary={name} secondary={groupName} />
                    <ListItemSecondaryAction className={classes.actions}>
                        {album.isPublished && <Icon>done</Icon>}
                        {currentIsOwner && <IconButton onClick={onClick} disabled={!!anchor.el} color='primary'>
                            <Icon>more_horiz</Icon>
                        </IconButton>}
                    </ListItemSecondaryAction>
                </ListItem>
            })}
        </List>
        {currentIsOwner && <PhotoMenu
            anchor={{ ...anchor, photo }}
            handleClose={handleClose}
            album={anchor.album}
            isAlbum
            publications={pubAlbumIds}
        />}
    </>
}

export default PhotoPubs;