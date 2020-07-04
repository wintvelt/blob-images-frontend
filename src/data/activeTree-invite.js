import { selectorFamily } from "recoil";
import { userData } from "./userData";
import { API } from "aws-amplify";

export const activeInviteState = selectorFamily({
    key: 'activeInvite',
    get: (inviteId) => async ({get}) => {
        get(userData);
        const response = await API.get('blob-images', `/invites/${inviteId}`);
        if (response.error) {
            throw response.error;
        }
        return response;
    }
})