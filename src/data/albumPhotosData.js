import { useEffect } from 'react';
import { atom, useRecoilValue, useSetRecoilState } from 'recoil';
import { API } from 'aws-amplify';
import { activeAlbumIdState, activeGroupIdState } from './activeTreeRoot';

export const albumPhotoIdsData = atom({
    key: 'albumPhotoIdsData',
    default: { isLoading: true },
});

export const useReloadAlbumPhotoIds = () => {
    const groupId = useRecoilValue(activeGroupIdState);
    const albumId = useRecoilValue(activeAlbumIdState);
    const setAlbumPhotoIds = useSetRecoilState(albumPhotoIdsData);
    const loadData = async () => {
        console.log(`loading photos for album ${albumId}`);
        try {
            const photoIds = await API.get('blob-images', `/groups/${groupId}/albums/${albumId}/photos`);
            setAlbumPhotoIds({ contents: photoIds });
        } catch (error) {
            console.log({error});
            setAlbumPhotoIds({ hasError: error });
        }
    }
    return loadData;
};

export const useAlbumPhotoIds = () => {
    const albumPhotoIds = useRecoilValue(albumPhotoIdsData);
    const reloadPhotoIds = useReloadAlbumPhotoIds();
    useEffect(() => {
        reloadPhotoIds();
    }, []);
    return albumPhotoIds;
};

export const useAlbumPhotoIdsValue = () => {
    const photoIdsData = useRecoilValue(albumPhotoIdsData);
    return photoIdsData;
};