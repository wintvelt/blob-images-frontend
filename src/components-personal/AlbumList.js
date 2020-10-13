import React from 'react';

import AlbumCardLayout from './AlbumCardLayout';
import CardList from '../components-generic/CardList';
import { useActiveGroupAlbumsValue } from '../data/activeTree-GroupAlbums';
import { useActiveGroupValue } from '../data/activeTree-Group';

const paddingStyle = { padding: '8px' };

const AlbumList = () => {
    const groupData = useActiveGroupValue();
    const userIsAdmin = (groupData.contents?.userRole === 'admin');
    const albumsData = useActiveGroupAlbumsValue();
    const hasValue = !!albumsData.contents;
    const albumsList = (hasValue) ? albumsData.contents : [1, 2].map(albumId => ({ albumId, isLoading: true }));
    const albumAddProps = {
        text: 'nieuw album',
        path: '/personal/groups/[id]/albums/[albumid]/edit',
        asPath: `/personal/groups/${groupData.contents?.id}/albums/new/edit`
    };
    const albumsWithEdit = (!hasValue) ?
        albumsList
        : albumsList.map(item => ({ ...item, userIsAdmin, withEdit: true }));

    return <div style={paddingStyle}>
        <CardList list={albumsWithEdit} component={AlbumCardLayout} addProps={albumAddProps}
            width={3} spacing={2} isLoading={albumsData.isLoading} />
    </div>
}

export default AlbumList;