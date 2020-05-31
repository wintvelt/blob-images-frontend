import React from 'react';
import { useRouter } from 'next/router';

import { useApiData } from '../../src/components-generic/DataProvider';
import AlbumHeaderLayout from './AlbumHeaderLayout';

const AlbumHeader = () => {
    const router = useRouter();
    const groupId = router.query && router.query.id;
    const albumId = router.query && router.query.albumid;
    const source = `/groups/${groupId}/albums/${albumId}`;
    const albumData = useApiData('album',source);
    return <AlbumHeaderLayout album={albumData}/>
}

export default AlbumHeader;