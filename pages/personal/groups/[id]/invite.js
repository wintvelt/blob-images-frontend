import React from 'react';
import { useRouter } from 'next/router';

import Toolbar from '@material-ui/core/Toolbar';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core';

import PrivatePage from '../../../../src/components-personal/PrivatePage';
import GroupCardLayout from '../../../../src/components-personal/GroupCardLayout';
import GroupInviteForm from '../../../../src/components-personal/GroupInviteForm';
import BackLinkToGroup from '../../../../src/components-generic/BackLinkToGroup';
import { useRecoilValueLoadable } from 'recoil';
import { activeGroupState, hasGroupData } from '../../../../src/data/activeTree-Group';

const useStyles = makeStyles(theme => ({
    container: {
        [theme.breakpoints.up('sm')]: {
            padding: theme.spacing(3),
        },
    }
}))

const GroupInviteMain = () => {
    const classes = useStyles();
    const groupData = useRecoilValueLoadable(activeGroupState);
    const hasValue = hasGroupData(groupData);
    const group = (hasValue)? groupData.contents : {};

    return (
        <main>
            <Toolbar />
            <BackLinkToGroup />
            <Grid container className={classes.container}>
                <Grid item md={3} xs={12}>
                    <GroupCardLayout {...group} withEdit={false} isLoading={!hasValue} />
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