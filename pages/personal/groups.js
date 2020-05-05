import React from 'react';
import PrivatePage from '../../src/components-personal/PrivatePage';
import GroupsHeader from '../../src/components-personal/GroupsHeader';
import { Toolbar } from '@material-ui/core';

const GroupsMain = () => {
    return (
        <main>
            <Toolbar />
            <GroupsHeader />
        </main>
    )
};

const GroupsPage = () => {
    return <PrivatePage>
        <GroupsMain />
    </PrivatePage>
}

export default GroupsPage