import React from 'react';
import { useRouter } from 'next/router';
import { useRecoilValue } from 'recoil';
import { selectorFamily } from 'recoilUtils';
import { API } from 'aws-amplify';

import AlbumHeaderLayout from './AlbumHeaderLayout';

const albumQuery = selectorFamily({
    key: 'Album',
    get: (groupId, albumId) => async () => {
        const source = `/groups/${groupId}/albums/${albumId}`;
        const response = await API.get('blob-images', source);
        if (response.error) {
            throw response.error;
        }
        return response;
    },
});

const AlbumHeader = () => {
    const router = useRouter();
    const groupId = router.query && router.query.id;
    const albumId = router.query && router.query.albumid;
    const albumData = useRecoilValue(albumQuery(groupId, albumId));
    return <AlbumHeaderLayout album={albumData} />
}

export default AlbumHeader;