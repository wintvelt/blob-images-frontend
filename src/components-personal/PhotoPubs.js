import React from 'react';
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

const PhotoPubs = ({ photo }) => {
    const classes = useStyles();
    const setLoadingPath = useSetLoadingPath();
    const albumsData = useRecoilValueLoadable(userAlbums);
    const albums = (albumsData.state === 'hasValue')? albumsData.contents : [];
    console.log({albums});
    const photoId = photo?.PK?.slice(2);
    const source = `/publications/${photoId}`;
    const pubData = useRecoilValueLoadable(publicationState(source));
    const pubs = (pubData.state === 'hasValue')? pubData.contents : [];
    const pubAlbumIds = pubs.map(pub => pub.PK.split('#')[1]); 

    return <List dense className={classes.list} subheader={
        <ListSubheader className={classes.noPadList}>Publicaties in albums van mijn groepen</ListSubheader>
    }>
        {albums.map(album => {
            const { id, name, groupName, image } = album;
            const groupId = album.PK.slice(2);
            const albumUrl = `/personal/groups/${groupId}/albums/${id}`;
            const onClick = () => {
                setLoadingPath('/personal/groups/[id]/albums/[albumid]', albumUrl);
            }
            const imageUrl = makeImageUrl(image?.url, 40);
            return <ListItem button key={id} className={classes.noPadList} onClick={onClick}>
                <ListItemIcon><img src={imageUrl} className={classes.albumImg} /></ListItemIcon>
                <ListItemText primary={name} secondary={groupName} />
                <ListItemSecondaryAction className={classes.actions}>
                    {(pubAlbumIds.includes(id)) && <Icon>done</Icon>}
                    <IconButton><Icon color='primary'>more_horiz</Icon></IconButton>
                </ListItemSecondaryAction>
            </ListItem>
        })}
    </List>
}

export default PhotoPubs;