import { selectorFamily, atom, atomFamily, useRecoilValue, useSetRecoilState, DefaultValue } from 'recoil';
import { API } from 'aws-amplify';
import { albumToForm } from './activeTree-Album';
import { useEffect } from 'react';

const photoStateTrigger = atomFamily({
    key: 'photoStateTrigger',
    default: 0
});
export const photoState = selectorFamily({
    key: 'photo',
    get: (source) => async ({ get }) => {
        get(photoStateTrigger(source));
        if (!source) return undefined;
        const response = await API.get('blob-images', source);
        if (response.error) {
            throw response.error;
        }
        return response.photo || response;
    },
    set: (source) => ({ set }, newValue) => {
        if (newValue instanceof DefaultValue) {
            set(photoStateTrigger(source), v => v + 1);
        }
    }
});

export const photoUpdate = () => {
    const del = (photoId) => {
        const apiPath = `/photos/${photoId}`;
        return API.put('blob/images', apiPath);
    };
    return {
        del
    };
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