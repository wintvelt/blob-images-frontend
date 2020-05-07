import React from 'react';
import Toolbar from '@material-ui/core/Toolbar';
import Grid from '@material-ui/core/Grid';

import PrivatePage from '../../../../src/components-personal/PrivatePage';
import GroupCard from '../../../../src/components-personal/GroupCard';

const GroupEditMain = () => {
    return (
        <main>
            <Toolbar />
            {/* < Back to Your Groups */}
            <Grid container spacing={1} style={{padding: '24px'}}>
                <Grid item md={3} xs={12}>
                    <GroupCard />
                </Grid>
                <Grid item md={1}/>
                <Grid item md={8} xs={12}>
                    Placeholder for form
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