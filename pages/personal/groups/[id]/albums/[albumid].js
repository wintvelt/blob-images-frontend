import React from 'react';
import { useRouter } from 'next/router';

import AlbumHeader from '../../../../../src/components-personal/AlbumHeader';
import PhotoList from '../../../../../src/components-personal/PhotoList';
import PrivatePage from '../../../../../src/components-personal/PrivatePage';
import { useApiData } from '../../../../../src/components-generic/DataProvider';

const AlbumMain = () => {
    const router = useRouter();
    const groupId = router.query.id;
    const albumId = router.query.albumid;
    const album = useApiData('album', `/groups/${groupId}/albums/${albumId}`);
    return (
        <main>
            <AlbumHeader />
            <PhotoList apiKey='myPhotos' source='/photos' menu={album.data && album.data.userIsAdmin}/>
        </main>
    )
}

const AlbumPage = () => {
    return <PrivatePage>
        <AlbumMain />
    </PrivatePage>
}

export default AlbumPage;