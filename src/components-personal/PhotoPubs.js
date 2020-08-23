import React from 'react';
import { List, ListItem, ListItemText, ListItemIcon, ListSubheader, makeStyles } from '@material-ui/core';

const dummyList = [
    { groupName: 'Blob foto dump', albumName: 'in Marokko', url: '/img/album.jpg', id: '123', albumId: '4' },
    { groupName: 'Blob foto dump', albumName: 'in Sulawesi', url: '/img/cover.jpg', id: '2', albumId: '5' },
    { groupName: 'In t Velt Familiepics', albumName: 'Sicilië', url: '/img/holiday.jpeg', id: '3', albumId: '6' },
];

const useStyles = makeStyles(theme => ({
    noPadList: {
        paddingLeft: 0
    },
    albumImg: {
        height: '32px',
        width: '32px',
        borderRadius: '4px',
        objectFit: 'cover'
    },
}))

const PhotoPubs = ({ photo }) => {
    const classes = useStyles();
    return <List dense subheader={
        <ListSubheader className={classes.noPadList}>Publicaties in mijn groepen</ListSubheader>
    }>
        {dummyList.map(album => {
            const { albumId, albumName, groupName, url } = album
            return <ListItem key={albumId} className={classes.noPadList}>
                <ListItemIcon><img src={url} className={classes.albumImg} /></ListItemIcon>
                <ListItemText primary={albumName} secondary={groupName} />
            </ListItem>
        })}
    </List>
}

export default PhotoPubs;