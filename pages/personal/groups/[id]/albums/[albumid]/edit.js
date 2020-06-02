import React from 'react';
import { useRouter } from 'next/router';

import Toolbar from '@material-ui/core/Toolbar';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core';

import { useApiData } from '../../../../../../src/components-generic/DataProvider';
import PrivatePage from '../../../../../../src/components-personal/PrivatePage';
import AlbumCardLayout from '../../../../../../src/components-personal/AlbumCardLayout';
import AlbumForm from '../../../../../../src/components-personal/AlbumForm';
import BackLink from '../../../../../../src/components-generic/BackLink';

const useStyles = makeStyles(theme => ({
    container: {
        [theme.breakpoints.up('sm')]: {
            padding: theme.spacing(3),
        },
    }
}))

const AlbumEditMain = () => {
    const router = useRouter();
    const classes = useStyles();
    const groupId = router.query && router.query.id;
    const albumId = router.query && router.query.albumid;
    const isNew = (albumId === 'new');
    const source = `/groups/${groupId}/albums/${albumId}`;
    const albumData = useApiData('album', source);
    const album = albumData.data || {};

    return (
        <main>
            <Toolbar />
            {album && <BackLink group={album.group} album={album}/>}
            <Grid container className={classes.container}>
                {(!isNew) && <Grid item md={3} xs={12}>
                    <AlbumCardLayout {...album} withEdit={false} isLoading={albumData.isLoading} />
                </Grid>}
                <Grid item md={(isNew) ? 3 : 1} />
                <Grid item md={(isNew) ? 6 : 8} xs={12}>
                    <AlbumForm album={album} />
                </Grid>
                {(isNew) && <Grid item md={3} />}
            </Grid>
        </main>
    )
}

const AlbumEditPage = () => {
    return <PrivatePage>
        <AlbumEditMain />
    </PrivatePage>
}

export default AlbumEditPage;