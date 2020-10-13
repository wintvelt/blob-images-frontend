import React, { useState } from 'react';
import {
    List, ListItem, ListItemText, ListItemIcon, ListSubheader,
    makeStyles, ListItemSecondaryAction, Icon, IconButton
}
    from '@material-ui/core';
import { usePubs, useReloadPubs } from '../data/activeTree-Photo';
import { makeImageUrl } from '../components-generic/imageProvider';
import { useSetLoadingPath } from '../data/loadingData';
import PhotoMenu from './PhotoListMenu';
import { useReloadUserAlbums, useUserAlbumsValue } from '../data/activeTree-UserAlbums';

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
    const albumsData = useUserAlbumsValue();
    const albums = albumsData.contents || [];
    const photoId = photo.PK?.slice(2);

    const pubData = usePubs(photoId);
    const pubs = pubData.contents || [];
    const pubAlbumIds = pubs.map(pub => pub.albumId);
    const reloadPubs = useReloadPubs(photoId);
    const reloadAlbums = useReloadUserAlbums();

    const albumsWithPub = albums
        .filter(album => pubAlbumIds.includes(album.albumId));
    const albumsWithoutPub = (currentIsOwner) ?
        albums.filter(album => !pubAlbumIds.includes(album.albumId))
        : [];
    const hasPubs = (albumsWithPub.length > 0);
    const hasWithoutPubs = (albumsWithoutPub.length > 0);

    const [anchor, setAnchor] = useState({ el: null });

    const handleClick = (e, album) => {
        setAnchor({ el: e.currentTarget, album });
    };

    const handleClose = () => {
        setAnchor({ el: null });
    };

    if (!hasPubs && !hasWithoutPubs) return null;

    return <>
        {(hasPubs) && <List dense className={classes.list} subheader={
            <ListSubheader className={classes.noPadList}>Albums waar deze foto in zit</ListSubheader>
        }>
            {albumsWithPub.map(album => {
                const { albumId, groupId, name, groupName, image } = album;
                const albumUrl = `/personal/groups/${groupId}/albums/${albumId}`;
                const onAlbumClick = () => {
                    setLoadingPath('/personal/groups/[id]/albums/[albumid]', albumUrl);
                }
                const imageUrl = makeImageUrl(image?.url, 40);
                const onClick = (e) => {
                    handleClick(e, album);
                }
                return <ListItem button key={albumId} className={classes.noPadList} onClick={onAlbumClick}>
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
        </List>}
        {(hasWithoutPubs) && <List dense className={classes.list} subheader={
            <ListSubheader className={classes.noPadList}>Andere albums</ListSubheader>
        }>
            {albumsWithoutPub.map(album => {
                const { albumId, groupId, name, groupName, image } = album;
                const albumUrl = `/personal/groups/${groupId}/albums/${albumId}`;
                const onAlbumClick = () => {
                    setLoadingPath('/personal/groups/[id]/albums/[albumid]', albumUrl);
                }
                const imageUrl = makeImageUrl(image?.url, 40);
                const onClick = (e) => {
                    handleClick(e, album);
                }
                return <ListItem button key={albumId} className={classes.noPadList} onClick={onAlbumClick}>
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
        </List>}
        {currentIsOwner && <PhotoMenu
            anchor={{ ...anchor, photo }}
            handleClose={handleClose}
            album={anchor.album}
            isAlbum
            publications={pubAlbumIds}
            reloadPubs={reloadPubs}
            reloadAlbum={reloadAlbums}
        />}
    </>
}

export default PhotoPubs;