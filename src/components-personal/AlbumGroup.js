import React from 'react';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import CardAlbum from '../CardAlbum';

const useStyles = makeStyles(theme => ({
    container: {
        paddingBottom: theme.spacing(4),
    },
    item: {
        // padding: theme.spacing(2),
    }
}));

const albums = [
    {
        id: 1, title: 'Blob in Tanzania', stats: ['since 1 Jan 1992', '34 photos'],
        image: {
            title: 'cover image',
            src: '/cover 2.jpg'
        }
    },
    {
        id: 2, title: 'Blob in Marokko', stats: ['since 1 Jan 1992', '34 photos'],
        image: {
            title: 'cover image',
            src: '/cover 2.jpg'
        }
    },
    {
        id: 3, title: 'Blob in Sulawesi', stats: ['since 1 Jan 1992', '34 photos'],
        image: {
            title: 'cover image',
            src: '/cover 2.jpg'
        }
    },
    {
        id: 4, title: 'Blob in Zuid-Afrika', stats: ['since 1 Jan 1992', '34 photos'],
        image: {
            title: 'cover image',
            src: '/cover 2.jpg'
        }
    },
    {
        id: 5, title: 'Blob in Lapland', stats: ['since 1 Jan 1992', '34 photos'],
        image: {
            title: 'cover image',
            src: '/cover 2.jpg'
        }
    },
];

const AlbumGroup = () => {
    const classes = useStyles();
    return <div className={classes.container}>
        <Grid container spacing={4}>
            {albums.map(album => (
                <Grid item xs={12} md={3} key={album.id} className={classes.item}>
                    <CardAlbum {...album} userIsAdmin={true} groupId={1}/>
                </Grid>
            ))}
            <Grid item xs={12} md={3} className={classes.item}>
                <CardAlbum isNew />
            </Grid>
        </Grid>
    </div>
}

export default AlbumGroup;