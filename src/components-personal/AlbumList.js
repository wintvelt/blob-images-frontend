import React, { useEffect } from 'react';

import AlbumCardLayout from './AlbumCardLayout';
import CardList from '../components-generic/CardList';
import { useRecoilValueLoadable, useRecoilValue } from 'recoil';
import { activeGroupAlbums } from '../data/activeTree-Group';
import { hasAlbumData } from '../data/activeTree-Album';
import { activeGroupIdState } from '../data/activeTreeRoot';
import { useSetLoadingPath } from '../data/loadingData';

const paddingStyle = { padding: '8px' };

const AlbumList = () => {
    const setLoadingPath = useSetLoadingPath();
    const groupId = useRecoilValue(activeGroupIdState);
    const albumsData = useRecoilValueLoadable(activeGroupAlbums);
    const hasValue = hasAlbumData(albumsData);
    const albumsList = (hasValue) ? albumsData.contents : [1, 2].map(id => ({ id, isLoading: true }));
    const albumAddProps = {
        text: 'new album',
        path: '/personal/groups/[id]/albums/[albumid]/edit',
        asPath: `/personal/groups/${groupId}/albums/new/edit`
    };
    const albumsListLength = albumsList?.length;
    useEffect(() => {
        if (albumsListLength === 0) {
            setLoadingPath(albumAddProps.path, albumAddProps.asPath);
        }
    }, [albumsListLength]);
    const albumsWithEdit = (!hasValue) ?
        albumsList
        : albumsList.map(item => ({ ...item, groupId, withEdit: true }));

    return <div style={paddingStyle}>
        <CardList list={albumsWithEdit} component={AlbumCardLayout} addProps={albumAddProps}
            width={3} spacing={2} isLoading={!hasValue} />
    </div>
}

export default AlbumList;