import { useEffect } from 'react';
import { atom, useRecoilValue, useRecoilState, useSetRecoilState } from 'recoil';
import { API } from 'aws-amplify';
import { activeAlbumIdState, activeGroupIdState } from './activeTreeRoot';
import { errorLog } from '../helpers/errorLog';

export const albumPhotosData = atom({
    key: 'albumPhotosData',
    default: { isLoading: true },
});

const albumPhotoToForm = (albumPhoto) => ({
    groupId: albumPhoto.PK.split('#')[0].slice(2),
    albumId: albumPhoto.PK.split('#')[1],
    photoId: albumPhoto.SK
});

export const useReloadAlbumPhotos = () => {
    const setAlbumPhotos = useSetRecoilState(albumPhotosData);
    const loadData = async (groupId, albumId) => {
        if (albumId && groupId) {
            console.log(`loading photos for album ${albumId}`);
            try {
                const photos = await API.get('blob-images', `/groups/${groupId}/albums/${albumId}/photos`);
                setAlbumPhotos({ contents: photos });
            } catch (error) {
                errorLog(error);
                setAlbumPhotos({ hasError: error });
            }
        }
    }
    return loadData;
};

export const useAlbumPhotos = () => {
    const groupId = useRecoilValue(activeGroupIdState);
    const albumId = useRecoilValue(activeAlbumIdState);
    const albumPhotos = useRecoilValue(albumPhotosData);
    const reloadPhotos = useReloadAlbumPhotos();
    useEffect(() => {
        if (groupId && albumId) reloadPhotos(groupId, albumId);
    }, [groupId, albumId]);
    return albumPhotos;
};

export const useAlbumPhotosValue = () => {
    const photosData = useRecoilValue(albumPhotosData);
    return photosData;
};

export const useDeleteAlbumPhoto = () => {
    const [photosData, setPhotosData] = useRecoilState(albumPhotosData);
    const deletePhoto = (photoId) => {
        const photoList = photosData.contents;
        if (!photoList) return;
        setPhotosData({ contents: idList.filter(photo => (photo.SK !== photoId)) });
    };
    return deletePhoto;
};