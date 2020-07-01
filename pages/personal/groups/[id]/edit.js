import React from 'react';
import { useRouter } from 'next/router';

import Toolbar from '@material-ui/core/Toolbar';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core';

import PrivatePage from '../../../../src/components-personal/PrivatePage';
import GroupCardLayout from '../../../../src/components-personal/GroupCardLayout';
import GroupForm from '../../../../src/components-personal/GroupForm';
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

const GroupEditMain = () => {
    const classes = useStyles();
    const router = useRouter();
    const groupId = router.query?.id;
    const isNew = (groupId === 'new');
    const groupData = useRecoilValueLoadable(activeGroupState);
    const hasValue = hasGroupData(groupData);
    const group = groupData.contents;

    return (
        <main>
            <Toolbar />
            <BackLinkToGroup />
            <Grid container className={classes.container}>
                {(!isNew) && <Grid item md={3} xs={12}>
                    <GroupCardLayout {...group} withEdit={false} isLoading={!hasValue} />
                </Grid>}
                <Grid item md={(isNew) ? 3 : 1} />
                <Grid item md={(isNew) ? 6 : 8} xs={12}>
                    <GroupForm group={group} />
                </Grid>
                {(isNew) && <Grid item md={3} />}
            </Grid>
        </main>
    )
}

const GroupEditPage = () => {
    return <PrivatePage>
        <GroupEditMain />
    </PrivatePage>
}

export default GroupEditPage;