import React from 'react';
import { useRouter } from 'next/router';

import Toolbar from '@material-ui/core/Toolbar';
import Grid from '@material-ui/core/Grid';
import { makeStyles, useMediaQuery } from '@material-ui/core';

import PrivatePage from '../../../../../../src/components-personal/PrivatePage';
import AlbumCardLayout from '../../../../../../src/components-personal/AlbumCardLayout';
import AlbumForm from '../../../../../../src/components-personal/AlbumForm';
import BackLinkToAlbum from '../../../../../../src/components-generic/BackLinkToAlbum';
import BackLinkToGroup from '../../../../../../src/components-generic/BackLinkToGroup';
import { useActiveAlbum } from '../../../../../../src/data/activeTree-Album';
import { useActiveGroup } from '../../../../../../src/data/activeTree-Group';
import { useUserPhotoIds } from '../../../../../../src/data/userPhotosData';

const useStyles = makeStyles(theme => ({
    container: {
        [theme.breakpoints.up('sm')]: {
            padding: theme.spacing(3),
        },
    }
}))

const AlbumEditMain = () => {
    const classes = useStyles();
    const router = useRouter();
    const isMedium = useMediaQuery(theme => theme.breakpoints.up('sm'));
    const albumId = router.query && router.query.albumid;
    const isNew = (albumId === 'new');
    const albumData = useActiveAlbum();
    const hasValue = !!albumData.contents;
    const album = (hasValue) ? albumData.contents : {};
    const groupData = useActiveGroup();
    const group = groupData.contents;
    const isFounder = group?.isFounder;
    const userIsAdmin = (group?.userRole === 'admin');

    const userPhotoIds = useUserPhotoIds();
    return (
        <main>
            <Toolbar />
            {(hasValue) && <BackLinkToAlbum />}
            {(!hasValue && !!group) && <BackLinkToGroup />}
            <Grid container className={classes.container}>
                {(!isNew) && <Grid item md={3} xs={12}>
                    <AlbumCardLayout {...album} withEdit={false} isLoading={albumData.isLoading}
                        userIsAdmin={userIsAdmin} isMedium={isMedium} hideNew={true} />
                </Grid>}
                <Grid item md={(isNew) ? 3 : 1} />
                <Grid item md={(isNew) ? 6 : 8} xs={12}>
                    <AlbumForm album={album} isFounder={isFounder} />
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