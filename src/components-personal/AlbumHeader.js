import React from 'react';
import { useRouter } from 'next/router';

import { useApiDataValue } from '../../src/data/apiData';
import AlbumHeaderLayout from './AlbumHeaderLayout';

const AlbumHeader = () => {
    const router = useRouter();
    const groupId = router.query && router.query.id;
    const albumId = router.query && router.query.albumid;
    const source = `/groups/${groupId}/albums/${albumId}`;
    const albumData = useApiDataValue('album',source);
    return <AlbumHeaderLayout album={albumData}/>
}

export default AlbumHeader;