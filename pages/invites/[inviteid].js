import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { API } from 'aws-amplify';
import { useSnackbar } from 'notistack';

import Toolbar from '@material-ui/core/Toolbar';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core';

import { useApiData } from '../../src/data/apiData';
import { useUser } from '../../src/components-generic/UserContext';
import GroupCardLayout from '../../src/components-personal/GroupCardLayout';
import InviteForm from '../../src/components-invite/InviteForm';
import LoginDialog from '../../src/components-invite/LoginDialog';
import ForOther from '../../src/components-invite/ForOther';
import Accepted from '../../src/components-invite/Accepted';
import OtherError from '../../src/components-invite/OtherError';
import LoginForm from '../../src/components-login/LoginForm';

const useStyles = makeStyles(theme => ({
    container: {
        [theme.breakpoints.up('sm')]: {
            padding: theme.spacing(3),
        },
    }
}))

const InvitePage = () => {
    const router = useRouter();
    const classes = useStyles();
    const inviteId = router.query && router.query.inviteid;
    const [isSaving, setIsSaving] = useState(false);
    const [accepting, setAccepting] = useState(false);
    const [loggedIn, setLoggedIn] = useState(false);
    const { enqueueSnackbar } = useSnackbar();

    const source = `/invites/${inviteId}`;
    const inviteData = useApiData('invite', source);
    const invite = inviteData.data || {};
    const group = invite.group;
    const { user, logout, onShowLogin } = useUser(true);
    const { profile } = user;
    const [isAlreadyMember, setIsAlreadyMember] = useState(false);
    const mustLoginToView = !user.isAuthenticated && inviteData.isError && inviteData.errorMessage === 'invite not for you';
    const notForYou = user.isAuthenticated && inviteData.isError && inviteData.errorMessage === 'invite not for you';
    const otherError = !notForYou && inviteData.isError;
    const alreadyAccepted = inviteData.data && invite.status !== 'invite';

    useEffect(() => {
        const checkMembership = async () => {
            if (group && user && user.isAuthenticated) {
                const isMember = await API.get('blob-images', `/groups/${group.id}/membership`);
                setIsAlreadyMember(isMember);
            } else {
                setIsAlreadyMember(false);
            }
        };
        checkMembership();
    }, [user, group]);

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
            setAccepting(false);
        }
        setIsSaving(false);
    };
    useEffect(() => {
        if (user && user.isAuthenticated && accepting) {
            onAccept();
            setAccepting(false);
        };
    }, [user, accepting])

    const onDecline = async () => {
        setIsSaving(true);
        alert('decline');
        setIsSaving(false);
    };
    const onCloseDialog = () => {
        setAccepting(false);
        onShowLogin(false);
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
                    {(mustLoginToView) && <LoginForm
                        title='You may be invited'
                        subtitle='This invite is for an existing account, so please log in to continue'
                        noSignup
                    />}
                    {(notForYou) && <ForOther onLogout={() => logout()} />}
                    {(alreadyAccepted) && <Accepted invite={invite} />}
                    {(!inviteData.error && !alreadyAccepted) && <InviteForm invite={invite} isLoading={inviteData.isLoading}
                        profile={profile} isAlreadyMember={isAlreadyMember}
                        isSaving={isSaving} onAccept={onAccept} onDecline={onDecline}
                    />}
                    {(otherError) && <OtherError />}
                    <pre>{JSON.stringify(inviteData, null, 2)}</pre>
                </Grid>
            </Grid>
            <LoginDialog open={accepting || !!user.showLogin} onClose={onCloseDialog} />
        </main>
    )
}

export default InvitePage;