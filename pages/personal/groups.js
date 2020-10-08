import React from 'react';
import PrivatePage from '../../src/components-personal/PrivatePage';
import Header from '../../src/components-personal/Header';
import { Toolbar } from '@material-ui/core';

import GroupList from '../../src/components-personal/GroupList';

const GroupsMain = () => {
    return (
        <main>
            <Toolbar />
            <Header>
                Waar je lid bent
            </Header>
            <GroupList />
        </main>
    )
};

const GroupsPage = () => {
    return <PrivatePage>
        <GroupsMain />
    </PrivatePage>
}

export default GroupsPage