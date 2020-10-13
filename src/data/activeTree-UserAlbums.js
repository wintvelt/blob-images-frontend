import { useEffect } from 'react';
import { API } from 'aws-amplify';

import { atom, useRecoilValue, useSetRecoilState } from 'recoil';
import { albumToForm } from './activeTree-Album';

// User albums
export const userAlbumsData = atom({
    key: 'userAlbumsData',
    default: { isLoading: true }
});

export const useReloadUserAlbums = () => {
    const setUserAlbums = useSetRecoilState(userAlbumsData);
    const loadData = async () => {
        console.log(`loading user albums`);
        try {
            const albums = await API.get('blob-images', `/user/albums`);
            setUserAlbums({ contents: albums.map(album => albumToForm(album)) });
        } catch (error) {
            setUserAlbums({ hasError: error });
        }
    }
    return loadData;
}

export const useUserAlbums = () => {
    const userAlbums = useRecoilValue(userAlbumsData);
    const reloadUserAlbums = useReloadUserAlbums();
    useEffect(() => {
        reloadUserAlbums();
    }, []);
    return userAlbums;
};