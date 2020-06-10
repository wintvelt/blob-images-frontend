import React from 'react';
import { useRouter } from 'next/router';

import Toolbar from '@material-ui/core/Toolbar';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core';

import { useApiDataValue } from '../../src/data/apiData';
import GroupCardLayout from '../../src/components-personal/GroupCardLayout';
import InviteForm from '../../src/components-invite/InviteForm';

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
    const source = `/invites/${inviteId}`;
    const inviteData = useApiDataValue('invite', source);
    const invite = inviteData.data || {};
    const group = invite.group;
    if (inviteData.isError) console.log(inviteData.error);

    return (
        <main>
            <Toolbar />
            <Grid container className={classes.container}>
                <Grid item md={3} xs={12}>
                    <GroupCardLayout {...group} withEdit={false} isLoading={inviteData.isLoading} />
                </Grid>
                <Grid item md={1} />
                <Grid item md={8} xs={12}>
                    <InviteForm invite={invite} isLoading={inviteData.isLoading} />
                    <pre>{JSON.stringify(invite, null, 2)}</pre>
                </Grid>
            </Grid>
        </main>
    )
}

export default InvitePage;