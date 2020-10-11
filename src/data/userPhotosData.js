import { useEffect } from 'react';
import { atom, useRecoilValue, useSetRecoilState } from 'recoil';
import { API, Auth } from 'aws-amplify';
import { useSetLoadingPath } from './loadingData';

export const userPhotoIdsData = atom({
    key: 'userPhotoIdsData',
    default: { isLoading: true },
});

export const useReloadPhotoIds = () => {
    const setUserPhotoIds = useSetRecoilState(userPhotoIdsData);
    const loadData = async () => {
        console.log(`loading user photos`);
        try {
            const photoIds = await API.get('blob-images', `/photos`);
            setUserPhotoIds({ contents: photoIds });
        } catch (error) {
            console.log({error});
            setUserPhotoIds({ hasError: error });
        }
    }
    return loadData;
};

export const useUserPhotoIds = () => {
    const userPhotoIds = useRecoilValue(userPhotoIdsData);
    const reloadPhotoIds = useReloadPhotoIds();
    useEffect(() => {
        reloadPhotoIds();
    }, []);
    return userPhotoIds;
};

export const useUserPhotoIdsValue = () => {
    const photoIdsData = useRecoilValue(userPhotoIdsData);
    return photoIdsData;
};