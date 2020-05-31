import React from 'react';
import { useRouter } from 'next/router';

import { useApiData } from '../../src/components-generic/DataProvider';
import AlbumCardLayout from './AlbumCardLayout';
import AlbumCardAdd from './AlbumCardAdd';
import CardList from '../components-generic/CardList';

const AlbumList = () => {
    const router = useRouter();
    const groupId = router.query.id;
    const albums = useApiData('albums', `/groups/${groupId}/albums`);
    const albumsList = albums.data || [1, 2, 3].map(id => ({ id, isLoading: true }));
    const albumsWithEdit = (albums.isLoading) ?
        albumsList
        : albumsList.map(item => ({ ...item, withEdit: true }));
    return <div style={{ padding: '24px' }}>
        <CardList list={albumsWithEdit} component={AlbumCardLayout} addComponent={AlbumCardAdd}
            width={3} spacing={2} isLoading={albums.isLoading} />
    </div>
}

export default AlbumList;