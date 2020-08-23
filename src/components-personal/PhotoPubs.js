import React from 'react';
import {
    List, ListItem, ListItemText, ListItemIcon, ListSubheader,
    makeStyles, ListItemSecondaryAction, Icon, IconButton
}
    from '@material-ui/core';

const dummyList = [
    { groupName: 'Blob foto dump', albumName: 'in Marokko', url: '/img/album.jpg', id: '123', albumId: '4' },
    { groupName: 'Blob foto dump', albumName: 'in Sulawesi', url: '/img/cover.jpg', id: '2', albumId: '5' },
    { groupName: 'In t Velt Familiepics', albumName: 'Sicilië', url: '/img/holiday.jpeg', id: '3', albumId: '6' },
    { groupName: 'Blob foto dump', albumName: 'in Marokko', url: '/img/album.jpg', id: '123', albumId: '7' },
    { groupName: 'Blob foto dump', albumName: 'in Sulawesi', url: '/img/cover.jpg', id: '2', albumId: '8' },
    { groupName: 'In t Velt Familiepics', albumName: 'Sicilië', url: '/img/holiday.jpeg', id: '3', albumId: '9' },
    { groupName: 'Blob foto dump', albumName: 'in Marokko', url: '/img/album.jpg', id: '123', albumId: 'a' },
    { groupName: 'Blob foto dump', albumName: 'in Sulawesi', url: '/img/cover.jpg', id: '2', albumId: 'b' },
    { groupName: 'In t Velt Familiepics', albumName: 'Sicilië', url: '/img/holiday.jpeg', id: '3', albumId: 'c' },
];

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
    return <List dense className={classes.list} subheader={
        <ListSubheader className={classes.noPadList}>Publicaties in albums van mijn groepen</ListSubheader>
    }>
        {dummyList.map(album => {
            const { albumId, albumName, groupName, url } = album
            return <ListItem key={albumId} className={classes.noPadList}>
                <ListItemIcon><img src={url} className={classes.albumImg} /></ListItemIcon>
                <ListItemText primary={albumName} secondary={groupName} />
                <ListItemSecondaryAction className={classes.actions}>
                    {(albumId !== '5') && <Icon>done</Icon>}
                    <IconButton><Icon color='primary'>more_horiz</Icon></IconButton>
                </ListItemSecondaryAction>
            </ListItem>
        })}
    </List>
}

export default PhotoPubs;