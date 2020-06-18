import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { API } from 'aws-amplify';
import { useSnackbar } from 'notistack';

import Toolbar from '@material-ui/core/Toolbar';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core';

import PublicPage from '../../src/components-generic/PublicPage';
import { useApiData } from '../../src/data/apiData';
import { useUser } from '../../src/data/userData';
import GroupCardLayout from '../../src/components-personal/GroupCardLayout';
import InviteForm from '../../src/components-invite/InviteForm';
import ForOther from '../../src/components-invite/ForOther';
import Accepted from '../../src/components-invite/Accepted';
import OtherError from '../../src/components-invite/OtherError';

const useStyles = makeStyles(theme => ({
    container: {
        [theme.breakpoints.up('sm')]: {
            padding: theme.spacing(3),
        },
    }
}));

const InvitePage = (props) => {
    const { inviteData, userData, onAccept, isSaving } = props;
    const invite = inviteData.data || {};
    const group = invite.group;
    const groupId = group?.id;
    const user = userData.user;
    const { profile } = user || {};

    const classes = useStyles();

    const [isAlreadyMember, setIsAlreadyMember] = useState(false);
    const notForYou = inviteData.isError && inviteData.errorMessage === 'invite not for you';
    const otherError = !notForYou && inviteData.isError;
    const alreadyAccepted = inviteData.data && invite.status !== 'invite';

    useEffect(() => {
        const checkMembership = async () => {
            if (groupId && user && user.isAuthenticated) {
                const isMember = await API.get('blob-images', `/groups/${groupId}/membership`);
                setIsAlreadyMember(isMember);
            } else {
                setIsAlreadyMember(false);
            }
        };
        checkMembership();
    }, [user.isAuthenticated, groupId]);


    const onDecline = async () => {
        alert('decline');
    };
    return (
        <main>
            <Toolbar />
            <Grid container className={classes.container}>
                <Grid item md={3} xs={12}>
                    <GroupCardLayout {...group} withEdit={false} isLoading={inviteData.isLoading}
                        isInvite />
                </Grid>
                <Grid item md={1} />
                <Grid item md={8} xs={12}>
                    {(notForYou) &&
                        <ForOther onLogout={userData.logout} onLogin={() => userData.setPath('/login')}
                            isLoggedIn={user.isAuthenticated} />
                    }
                    {(alreadyAccepted) && <Accepted invite={invite} />}
                    {(!inviteData.error && !alreadyAccepted) && <InviteForm invite={invite} isLoading={inviteData.isLoading}
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
    const inviteId = router.query && router.query.inviteid;
    const source = `/invites/${inviteId}`;
    const inviteData = useApiData('invite', source);
    const invite = inviteData.data || {};
    const group = invite.group;
    const inviteIsToEmail = invite?.user?.email;
    const userData = useUser();
    const { user, setPath } = userData;
    const { enqueueSnackbar } = useSnackbar();

    const [isSaving, setIsSaving] = useState(false);
    const [isAccepting, setIsAccepting] = useState(false);

    useEffect(() => {
        const reloadInvite = async () => {
            inviteData.reloadData();
        };
        reloadInvite();
    }, [user.isAuthenticated]);

    const onAccept = async () => {
        setIsSaving(true);
        if (user && user.isAuthenticated) {
            try {
                await API.post('blob-images', `/invites/${inviteId}`);
                enqueueSnackbar(`Welcome to ${group ? group.name : 'the group'}!`, { variant: 'success' });
                router.push('/personal/groups/[id]', `/personal/groups/${group.id}`);
            } catch (error) {
                console.log(error);
                enqueueSnackbar('Oops, could not accept this invite', { variant: 'error' });
            }
        } else {
            setIsAccepting(true);
            setPath('/signup');
        }
        setIsSaving(false);
    };

    useEffect(() => {
        if (isAccepting && !user.path) {
            if (user.isAuthenticated) {
                onAccept();
            } else {
                setIsAccepting(false);
            }
        }
    },[user.isAuthenticated, user.path])

    return <PublicPage>
        <InvitePage inviteData={inviteData} userData={userData} onAccept={onAccept} isSaving={isSaving} />
    </PublicPage>
};

export default InviteHOC;