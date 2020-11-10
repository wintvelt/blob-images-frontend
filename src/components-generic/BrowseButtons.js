import React from 'react';
import Icon from '@material-ui/core/Icon';

import Link from '../components-generic/Link';
import { useAlbumPhotoIds } from '../data/albumPhotosData';
import { useUserPhotoIds } from '../data/userPhotosData';
import { useRouter } from 'next/router';
import { useActiveAlbum } from '../data/activeTree-Album';
import { useMediaQuery } from '@material-ui/core';

const linkStyle = (isBig) => ({
    position: 'absolute',
    top: (isBig)? '240px': '120px',
    left: '16px',
    color: '#ffffff',
    zIndex: 1,
    backgroundColor: '#00000040',
    borderRadius: '4px',
    padding: '8px 2px 2px 12px',
});
const linkStyle2 = (isBig) => ({
    ...linkStyle(isBig),
    left: undefined,
    right: '16px',
    padding: '8px 8px 2px 8px',
});

const BrowseButtons = ({ photoId }) => {
    const matches = useMediaQuery('(min-width:600px)');
    const albumData = useActiveAlbum();
    const album = albumData.contents;
    const albumPhotoData = useAlbumPhotoIds();
    const albumPhotos = albumPhotoData.contents;
    const userPhotosData = useUserPhotoIds();
    const userPhotos = userPhotosData.contents;
    const router = useRouter();
    const isAlbumPhoto = !!router.query?.albumid;
    const photoIds = (isAlbumPhoto) ? albumPhotos : userPhotos;

    const idxInList = photoIds && photoIds.indexOf(photoId);

    if (!photoIds) return null;

    const prevId = photoIds && (idxInList > 0) && photoIds[idxInList - 1];
    const nextId = photoIds && (idxInList > -1) && (idxInList < photoIds.length - 1) && photoIds[idxInList + 1];

    const photoPath = (isAlbumPhoto) ?
        '/personal/groups/[id]/albums/[albumid]/photos/[photoid]'
        : '/personal/photos/[photoid]';
    const photoAs = photoPath.replace('[id]', album?.groupId).replace('[albumid]', album?.albumId);
    const prevAs = photoAs.replace('[photoid]', prevId);
    const nextAs = photoAs.replace('[photoid]', nextId);

    return <>
        {prevId && <Link href={photoPath} as={prevAs}
            style={linkStyle(matches)}
        >
            <Icon>arrow_back_ios</Icon>
        </Link>}
        {nextId && <Link href={photoPath} as={nextAs}
            style={linkStyle2(matches)}
        >
            <Icon>arrow_forward_ios</Icon>
        </Link>}
    </>
}

export default BrowseButtons;