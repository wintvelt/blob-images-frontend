import React from 'react';
import { useRouter } from 'next/router';

import { useApiData } from '../../src/components-generic/DataProvider';
import AlbumCardLayout from './AlbumCardLayout';
import CardList from '../components-generic/CardList';

const AlbumList = () => {
    const router = useRouter();
    const groupId = router.query.id;
    const albums = useApiData('albums', `/groups/${groupId}/albums`);
    const albumsList = albums.data || [1, 2, 3].map(id => ({ id, isLoading: true }));
    const albumsWithEdit = (albums.isLoading) ?
        albumsList
        : albumsList.map(item => ({ ...item, withEdit: true }));
    const albumAddProps = {
        text: 'new album',
        path: '/personal/groups/[id]/albums/[albumId]/edit',
        asPath: `/personal/groups/${groupId}/albums/new/edit`
    };
    return <div style={{ padding: '8px' }}>
        <CardList list={albumsWithEdit} component={AlbumCardLayout} addProps={albumAddProps}
            width={3} spacing={2} isLoading={albums.isLoading} />
    </div>
}

export default AlbumList;