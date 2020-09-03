import { selectorFamily, atomFamily, DefaultValue } from 'recoil';
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

const pubStateTrigger = atomFamily({
    key: 'pubStateTrigger',
    default: 0
})

export const publicationState = selectorFamily({
    key: 'publications',
    get: (source) => async ({ get }) => {
        get(pubStateTrigger(source));
        if (!source) return undefined;
        const response = await API.get('blob-images', source);
        if (response.error) {
            throw response.error;
        }
        return response;
    },
    set: (source) => ({ set }, newValue) => {
        if (newValue instanceof DefaultValue) {
            set(pubStateTrigger(source), v => v + 1);
        }
    }
});