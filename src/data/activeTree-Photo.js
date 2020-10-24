import { selectorFamily, atom, atomFamily, useRecoilValue, useSetRecoilState, DefaultValue } from 'recoil';
import { API } from 'aws-amplify';
import { useEffect } from 'react';
import { errorLog } from '../helpers/errorLog';

// -- NEW
export const photoData = atomFamily({
    key: `photoData`,
    default: { isLoading: true },
});

export const useReloadPhoto = (id) => {
    const setPhoto = useSetRecoilState(photoData(id));
    const loadData = async () => {
        if (id) {
            console.log(`loading photo ${id}`);
            try {
                const photo = await API.get('blob-images', `/photos/${id}`);
                setPhoto({ contents: photo });
            } catch (error) {
                errorLog(error);
                setPhoto({ hasError: error });
            }
        }
    }
    return loadData;
};

export const usePhoto = (id) => {
    const photo = useRecoilValue(photoData(id));
    const reloadPhoto = useReloadPhoto(id);
    useEffect(() => {
        if (id) reloadPhoto();
    }, []);
    return photo;
};

export const usePhotoValue = (id) => {
    const photo = useRecoilValue(photoData(id));
    return photo;
};

// PUBLICATIONS
const pubToForm = (pub) => ({
    groupId: pub.PK.split('#')[0].slice(2),
    albumId: pub.PK.split('#')[1],
    photoId: pub.SK,
    photoUrl: pub.photo.url
});

const pubState = atom({
    key: 'pubState',
    default: { isLoading: true }
});

export const useReloadPubs = () => {
    const setPubs = useSetRecoilState(pubState);
    const loadData = async (photoId) => {
        console.log(`loading publications for photo ${photoId}`);
        if (photoId) {
            try {
                const pubs = await API.get('blob-images', `/photos/${photoId}/publications`);
                setPubs({ contents: pubs.map(album => pubToForm(album)) });
            } catch (error) {
                setPubs({ hasError: error });
            }
        }
    }
    return loadData;
}

export const usePubs = (photoId) => {
    const pubs = useRecoilValue(pubState);
    const reloadPubs = useReloadPubs();
    useEffect(() => {
        if (photoId) reloadPubs(photoId);
    }, [photoId]);
    return pubs;
};

export const usePubsValue = () => {
    const pubs = useRecoilValue(pubState);
    return pubs;
}