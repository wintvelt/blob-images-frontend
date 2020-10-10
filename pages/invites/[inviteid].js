import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { API } from 'aws-amplify';
import { useSnackbar } from 'notistack';

import Toolbar from '@material-ui/core/Toolbar';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core';

import PublicPage from '../../src/components-generic/PublicPage';
import { useUser } from '../../src/data/userData';
import { useSetLoadingPath } from '../../src/data/loadingData';
import GroupCardLayout from '../../src/components-personal/GroupCardLayout';
import InviteForm from '../../src/components-invite/InviteForm';
import ForOther from '../../src/components-invite/ForOther';
import Accepted from '../../src/components-invite/Accepted';
import OtherError from '../../src/components-invite/OtherError';
import { useActiveInvite, useReloadInvite } from '../../src/data/invite-Data';

const useStyles = makeStyles(theme => ({
    container: {
        [theme.breakpoints.up('sm')]: {
            padding: theme.spacing(3),
        },
    }
}));

const InvitePage = (props) => {
    const { inviteData, userData, onAccept, onDecline, isSaving } = props;
    const invite = inviteData.contents || {};
    const isLoading = (inviteData.isLoading);
    const group = invite?.group;
    const groupId = group?.groupId;
    const user = userData.user;
    const { profile } = user || {};

    const classes = useStyles();

    const [isAlreadyMember, setIsAlreadyMember] = useState(false);
    const notForYou = (inviteData.hasError &&
        inviteData.hasError.response?.data?.error === 'invite not for you');
    const otherError = !notForYou && inviteData.hasError;
    const alreadyAccepted = invite.status && invite.status !== 'invite';

    useEffect(() => {
        const checkMembership = async () => {
            if (groupId && user && user.isAuthenticated) {
                try {
                    const groupData = await API.get('blob-images', `/groups/${groupId}`);
                    setIsAlreadyMember(true);
                } catch (_) {
                    setIsAlreadyMember(false);
                }
            } else {
                setIsAlreadyMember(false);
            }
        };
        checkMembership();
    }, [user.isAuthenticated, groupId]);

    return (
        <main>
            <Toolbar />
            <Grid container className={classes.container}>
                <Grid item md={3} xs={12}>
                    <GroupCardLayout {...group} withEdit={false} isLoading={isLoading}
                        isInvite />
                </Grid>
                <Grid item md={1} />
                <Grid item md={8} xs={12}>
                    {(notForYou) &&
                        <ForOther onLogout={userData.logout} onLogin={() => userData.setPath('/login')}
                            isLoggedIn={user.isAuthenticated} />
                    }
                    {(alreadyAccepted) && <Accepted invite={invite} />}
                    {(!inviteData.hasError && !alreadyAccepted) &&
                        <InviteForm invite={invite} isLoading={isLoading}
                            profile={profile} isAlreadyMember={isAlreadyMember}
                            isSaving={isSaving} onAccept={onAccept} onDecline={onDecline}
                        />}
                    {(otherError) && <OtherError />}
                </Grid>
            </Grid>
        </main>
    )
}

const InviteHOC = () => {
    const router = useRouter();
    const inviteId = router.query?.inviteid;
    const { inviteData, acceptInvite, declineInvite } = useActiveInvite(inviteId);
    const reloadInvite = useReloadInvite();
    const hasInvite = (!!inviteData.contents);
    const invite = (hasInvite) ? inviteData.contents : {};
    const group = invite?.group;
    const userData = useUser();
    const { user, setPath } = userData;
    const { enqueueSnackbar } = useSnackbar();
    const setLoadingPath = useSetLoadingPath();

    const [isSaving, setIsSaving] = useState(false);
    const [isAccepting, setIsAccepting] = useState(false);

    const onAccept = async () => {
        setIsSaving(true);
        if (user && user.isAuthenticated) {
            try {
                await acceptInvite();
                enqueueSnackbar(`Welkom als lid van ${group ? group.name : 'deze groep'}!`, { variant: 'success' });
                setLoadingPath('/personal/groups/[id]', `/personal/groups/${group?.groupId}`);
            } catch (error) {
                console.log(error);
                enqueueSnackbar('Oeps, we konden je niet lid maken', { variant: 'error' });
            }
        } else {
            setIsAccepting(true);
            setPath('/signup');
        }
        setIsSaving(false);
    };
    const onDecline = async () => {
        setIsSaving(true);
        try {
            await declineInvite();
            enqueueSnackbar(`Je afwijzing om lid te worden van ${group ? group.name : 'deze groep'} is doorgegeven`);
            const redirect = (user && user.isAuthenticated)? '/personal/groups' : '/';
            setLoadingPath(redirect);
        } catch (error) {
            console.log(error);
            enqueueSnackbar('Oeps, je afwijzing komt niet door', { variant: 'error' });
        }
        setIsSaving(false);
    }

    useEffect(() => {
        if (isAccepting && !user.path) {
            if (user.isAuthenticated) {
                onAccept();
            } else {
                if (inviteId) reloadInvite(inviteId);
                setIsAccepting(false);
            }
        } else if (!user.path) {
            if (inviteId) reloadInvite(inviteId);
        }
    }, [user.isAuthenticated, user.path])

    return <PublicPage>
        <InvitePage inviteData={inviteData} userData={userData}
            onAccept={onAccept} onDecline={onDecline} isSaving={isSaving} />
    </PublicPage>
};

export default InviteHOC;