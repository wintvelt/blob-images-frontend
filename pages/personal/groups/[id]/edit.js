import React from 'react';
import { useRouter } from 'next/router';

import Toolbar from '@material-ui/core/Toolbar';
import Grid from '@material-ui/core/Grid';
import { makeStyles, useMediaQuery } from '@material-ui/core';

import PrivatePage from '../../../../src/components-personal/PrivatePage';
import GroupCardLayout from '../../../../src/components-personal/GroupCardLayout';
import GroupForm from '../../../../src/components-personal/GroupForm';
import BackLinkToGroup from '../../../../src/components-generic/BackLinkToGroup';
import { redirectOnGroupLoadError, useActiveGroup } from '../../../../src/data/activeTree-Group';
import { useUserPhotoIds } from '../../../../src/data/userPhotosData';

const useStyles = makeStyles(theme => ({
    container: {
        [theme.breakpoints.up('sm')]: {
            padding: theme.spacing(3),
        },
    }
}))

const GroupEditMain = () => {
    const isMedium = useMediaQuery(theme => theme.breakpoints.up('sm'));
    const classes = useStyles();
    const router = useRouter();
    const groupId = router.query?.id;
    const isNew = (groupId === 'new');
    const groupData = useActiveGroup();
    const group = groupData.contents || {};

    redirectOnGroupLoadError(groupData, true, isNew);

    // for image handler
    const userPhotoIds = useUserPhotoIds();

    return (
        <main>
            <Toolbar />
            <BackLinkToGroup />
            <Grid container className={classes.container}>
                {(!isNew) && <Grid item md={3} xs={12}>
                    <GroupCardLayout {...group} withEdit={false} isLoading={groupData.isLoading} isMedium={isMedium} />
                </Grid>}
                <Grid item md={(isNew) ? 3 : 1} />
                <Grid item md={(isNew) ? 6 : 8} xs={12}>
                    <GroupForm group={group} isNew={isNew} />
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