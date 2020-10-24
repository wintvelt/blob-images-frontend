import { useEffect } from 'react';
import { atom, useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import { API } from 'aws-amplify';
import { errorLog } from '../helpers/errorLog';

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
            errorLog(error);
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

export const useDeleteUserPhoto = () => {
    const [photoIdsData, setPhotoIdsData] = useRecoilState(userPhotoIdsData);
    const deletePhotoId = (photoId) => {
        const idList = photoIdsData.contents;
        if (!idList) return;
        setPhotoIdsData({ contents: idList.filter(id => (id !== photoId)) });
    }
    return deletePhotoId;
};