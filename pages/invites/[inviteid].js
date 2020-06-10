import React, { useState } from 'react';
import { useRouter } from 'next/router';
import { API } from 'aws-amplify';
import { useSnackbar } from 'notistack';

import Toolbar from '@material-ui/core/Toolbar';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core';

import { useApiDataValue } from '../../src/data/apiData';
import GroupCardLayout from '../../src/components-personal/GroupCardLayout';
import InviteForm from '../../src/components-invite/InviteForm';
import { useUser } from '../../src/components-generic/UserContext';

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
    const source = `/invites/${inviteId}`;
    const inviteData = useApiDataValue('invite', source);
    const invite = inviteData.data || {};
    const group = invite.group;
    const user = useUser();
    const { profile } = user;
    const { enqueueSnackbar } = useSnackbar();

    const onAccept = async () => {
        setIsSaving(true);
        try {
            await API.post('blob-images',`/invites/${inviteId}`);
            enqueueSnackbar(`Welcome to ${group? group.name : 'the group'}!`, { variant: 'success'});
            router.push('/personal/groups/[id]',`/personal/groups/${group.id}`);
        } catch (error) {
            console.log(error);
            enqueueSnackbar('Oops, could not accept this invite', { variant: 'error'});
        }
        setIsSaving(false);
    };
    const onDecline = async () => {
        setIsSaving(true);
        alert('decline');
        setIsSaving(false);
    };

    return (
        <main>
            <Toolbar />
            <Grid container className={classes.container}>
                <Grid item md={3} xs={12}>
                    <GroupCardLayout {...group} withEdit={false} isLoading={inviteData.isLoading} />
                </Grid>
                <Grid item md={1} />
                <Grid item md={8} xs={12}>
                    <InviteForm invite={invite} isLoading={inviteData.isLoading} profile={profile}
                        isSaving={isSaving} onAccept={onAccept} onDecline={onDecline} />
                    <pre>{JSON.stringify(invite, null, 2)}</pre>
                </Grid>
            </Grid>
        </main>
    )
}

export default InvitePage;