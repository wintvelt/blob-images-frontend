import { selectorFamily } from 'recoil';
import { API } from 'aws-amplify';

export const photoState = selectorFamily({
    key: 'photo',
    get: (source) => async ({ get }) => {
        if (!source) return undefined;
        const response = await API.get('blob-images', source);
        if (response.error) {
            throw response.error;
        }
        return response.photo || response;
    }
});

export const publicationState = selectorFamily({
    key: 'publications',
    get: (source) => async ({ get }) => {
        if (!source) return undefined;
        const response = await API.get('blob-images', source);
        if (response.error) {
            throw response.error;
        }
        return response;
    }
});