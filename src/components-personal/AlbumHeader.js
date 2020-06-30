import React from 'react';
import { useRouter } from 'next/router';
import Recoil, { selectorFamily, atomFamily, useResetRecoilState, useRecoilValueLoadable } from 'recoil';
import { API } from 'aws-amplify';

import { useAlbumHeaderStyles, AlbumImage, AlbumContent } from './AlbumHeaderLayout';
import Card from '@material-ui/core/Card';

const albumTrigger = atomFamily({
    key: 'albumTrigger',
    default: 0
});

const albumQuery = selectorFamily({
    key: 'Album',
    get: source => async ({ get }) => {
        get(albumTrigger(source));
        const response = await API.get('blob-images', source);
        if (response.error) {
            throw response.error;
        }
        return response;
    },
    set: source => async ({ set }, value) => {
        if (value instanceof Recoil.DefaultValue) {
            set(albumTrigger(source), v => v + 1);
        }
    }
});

const AlbumHeader = () => {
    const classes = useAlbumHeaderStyles();
    const router = useRouter();
    const groupId = router.query && router.query.id;
    const albumId = router.query && router.query.albumid;
    const source = `/groups/${groupId}/albums/${albumId}`;
    const album = useRecoilValueLoadable(albumQuery(source));
    const albumState = album.state;
    const albumIsLoaded = (albumState === 'hasValue');
    const albumData = album.contents;

    const reset = useResetRecoilState(albumQuery(source));

    return <Card className={classes.card}>
        <AlbumImage />
        {/* <AlbumBackLink /> */}
        {/* <AlbumEditButton /> */}
        <AlbumContent />
    </Card>
}

export default AlbumHeader;