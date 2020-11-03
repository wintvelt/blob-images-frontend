import { API } from "aws-amplify";
import { useEffect } from "react";
import { atom, useRecoilValue, useSetRecoilState } from "recoil";
import { errorLog } from '../helpers/errorLog';

export const invitePromise = ({ groupId, name, email, message, role }) => {
    return API.post('blob-images', `/groups/${groupId}/invite`, {
        body: { toName: name, toEmail: email, message, role }
    });
};

// Active Invite
export const activeInviteData = atom({
    key: 'activeInviteData',
    default: { isLoading: true }
});

export const inviteToForm = (invite) => ({
    fromName: invite.invitation.from.name,
    fromEmail: invite.invitation.from.email,
    message: invite.invitation.message,
    toId: invite.PK.slice(2),
    toName: invite.user.name,
    toEmail: invite.user.email,
    userRole: invite.role,
    group: {
        groupId: invite.group.SK,
        name: invite.group.name,
        description: invite.group.description,
        image: {
            photoId: invite.group.photoId,
            url: invite.group.photo?.url
        }
    },
    status: invite.status,
    createdAt: invite.createdAt
});

export const useReloadInvite = () => {
    const setInvite = useSetRecoilState(activeInviteData);
    const loadData = async (inviteId) => {
        try {
            const invite = await API.get('blob-images', `/invites/${inviteId}`);
            setInvite({ contents: inviteToForm(invite) });
        } catch (error) {
            errorLog(error);
            setInvite({ hasError: error });
        }
    }
    return loadData;
}

export const useActiveInvite = (inviteId) => {
    const inviteData = useRecoilValue(activeInviteData);
    const reloadInvite = useReloadInvite();
    useEffect(() => {
        if (inviteId) reloadInvite(inviteId);
    }, [inviteId]);
    const acceptInvite = () => {
        return API.post('blob-images', `/invites/${inviteId}`);
    };
    const declineInvite = () => {
        return API.del('blob-images', `/invites/${inviteId}`);
    };
    return {
        inviteData,
        acceptInvite,
        declineInvite
    };
};

export const useInviteValue = () => {
    const activeInvite = useRecoilValue(activeInviteData);
    return activeInvite;
};