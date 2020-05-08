import React from 'react';
import { useRouter } from 'next/router';

import Toolbar from '@material-ui/core/Toolbar';
import Grid from '@material-ui/core/Grid';

import { useApiData } from '../../../../src/components-generic/DataProvider';
import PrivatePage from '../../../../src/components-personal/PrivatePage';
import GroupCardLayout from '../../../../src/components-personal/GroupCardLayout';
import GroupForm from '../../../../src/components-personal/GroupForm';

const GroupEditMain = () => {
    const router = useRouter();
    const groupId = router.query && router.query.id;
    const source = `myUrl/groups/${groupId}`;
    const groupData = useApiData('group', source);
    const group = groupData.data || {};

    return (
        <main>
            <Toolbar />
            {/* < Back to Your Groups */}
            <Grid container spacing={1} style={{ padding: '24px' }}>
                <Grid item md={3} xs={12}>
                    <GroupCardLayout {...group} withEdit={false} isLoading={groupData.isLoading}/>
                </Grid>
                <Grid item md={1} />
                <Grid item md={8} xs={12}>
                    <GroupForm />
                </Grid>
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