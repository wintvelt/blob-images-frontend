import React from 'react';
import { useRouter } from 'next/router';

import Toolbar from '@material-ui/core/Toolbar';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core';

import { useApiDataValue } from '../../../../src/data/apiData';
import PrivatePage from '../../../../src/components-personal/PrivatePage';
import GroupCardLayout from '../../../../src/components-personal/GroupCardLayout';
import GroupInviteForm from '../../../../src/components-personal/GroupInviteForm';
import BackLink from '../../../../src/components-generic/BackLink';

const useStyles = makeStyles(theme => ({
    container: {
        [theme.breakpoints.up('sm')]: {
            padding: theme.spacing(3),
        },
    }
}))

const GroupInviteMain = () => {
    const router = useRouter();
    const classes = useStyles();
    const groupId = router.query && router.query.id;
    const source = `/groups/${groupId}`;
    const groupData = useApiDataValue('group', source);
    const group = groupData.data || {};

    return (
        <main>
            <Toolbar />
            <BackLink groupId={groupId} />
            <Grid container className={classes.container}>
                <Grid item md={3} xs={12}>
                    <GroupCardLayout {...group} withEdit={false} isLoading={groupData.isLoading} />
                </Grid>
                <Grid item md={1} />
                <Grid item md={8} xs={12}>
                    <GroupInviteForm title='Invite new members' />
                </Grid>
            </Grid>
        </main>
    )
}

const GroupInvitePage = () => {
    return <PrivatePage>
        <GroupInviteMain />
    </PrivatePage>
}

export default GroupInvitePage;