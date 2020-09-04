import { selectorFamily, atomFamily, DefaultValue } from 'recoil';
import { API } from 'aws-amplify';
import { userData } from './userData';

const photoStateTrigger = atomFamily({
    key: 'photoStateTrigger',
    default: 0
});

export const photoState = selectorFamily({
    key: 'photo',
    get: (source) => async ({ get }) => {
        get(userData);
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