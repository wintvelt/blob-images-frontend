import { useEffect } from 'react';
import { atom, useRecoilValue, useRecoilState, useSetRecoilState } from 'recoil';
import { API } from 'aws-amplify';
import { activeAlbumIdState, activeGroupIdState } from './activeTreeRoot';
import { errorLog } from '../helpers/errorLog';

export const albumPhotoIdsData = atom({
    key: 'albumPhotoIdsData',
    default: { isLoading: true },
});

const albumPhotoToForm = (albumPhoto) => ({
    groupId: albumPhoto.PK.split('#')[0].slice(2),
    albumId: albumPhoto.PK.split('#')[1],
    photoId: albumPhoto.SK
});

const photoSort = (a, b) => (
    (a.isNew && !b.isNew) ?
        -1
        : (!a.isNew && b.isNew) ?
            1
            : (a.createdAt > b.createdAt) ?
                -1
                : (a.createdAt < b.createdAt) ? 1
                    : 0
);

export const useReloadAlbumPhotoIds = () => {
    const setAlbumPhotoIds = useSetRecoilState(albumPhotoIdsData);
    const loadData = async (groupId, albumId) => {
        if (albumId && groupId) {
            console.log(`loading photos for album ${albumId}`);
            try {
                const photoIds = await API.get('blob-images', `/groups/${groupId}/albums/${albumId}/photos`);
                setAlbumPhotoIds({ contents: photoIds.sort(photoSort).map(item => item.SK) });
            } catch (error) {
                errorLog(error);
                setAlbumPhotoIds({ hasError: error });
            }
        }
    }
    return loadData;
};

export const useAlbumPhotoIds = () => {
    const groupId = useRecoilValue(activeGroupIdState);
    const albumId = useRecoilValue(activeAlbumIdState);
    const albumPhotoIds = useRecoilValue(albumPhotoIdsData);
    const reloadPhotoIds = useReloadAlbumPhotoIds();
    useEffect(() => {
        if (groupId && albumId) reloadPhotoIds(groupId, albumId);
    }, [groupId, albumId]);
    return albumPhotoIds;
};

export const useAlbumPhotoIdsValue = () => {
    const photoIdsData = useRecoilValue(albumPhotoIdsData);
    return photoIdsData;
};

export const useDeleteAlbumPhoto = () => {
    const [photoIdsData, setPhotoIdsData] = useRecoilState(albumPhotoIdsData);
    const deletePhotoId = (photoId) => {
        const idList = photoIdsData.contents;
        if (!idList) return;
        setPhotoIdsData({ contents: idList.filter(id => (id !== photoId)) });
    };
    return deletePhotoId;
};