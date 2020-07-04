import { selectorFamily, atomFamily, DefaultValue } from "recoil";
import { userData } from "./userData";
import { API } from "aws-amplify";

const activeInviteTrigger = atomFamily({
    key: 'activeInviteTrigger',
    default: 0
})

export const activeInviteState = selectorFamily({
    key: 'activeInvite',
    get: (inviteId) => async ({get}) => {
        if (!inviteId) return undefined;
        const response = await API.get('blob-images', `/invites/${inviteId}`);
        if (response.error) {
            throw response.error;
        }
        return response;
    },
    set: (inviteId) => ({ set }, newValue) => {
        if (newValue instanceof DefaultValue) {
            set(activeInviteTrigger(inviteId), v => v + 1);
        }
    }
})