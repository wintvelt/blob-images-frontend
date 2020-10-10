import React from 'react';
import GroupHeader from '../../../src/components-personal/GroupHeader';
import GroupMembers from '../../../src/components-personal/GroupMembers';
import AlbumList from '../../../src/components-personal/AlbumList';
import PrivatePage from '../../../src/components-personal/PrivatePage';
import { redirectOnGroupLoadError, useActiveGroup } from '../../../src/data/activeTree-Group';
import { useActiveMembers } from '../../../src/data/activeTree-GroupMembers';

const GroupMain = () => { 
    // initial load (only) here
    const groupData = useActiveGroup();
    const groupMembers = useActiveMembers();
    redirectOnGroupLoadError(groupData);
    return (
        <main>
            <GroupHeader />
            <GroupMembers />
            <AlbumList />
        </main>
    )
}

const GroupPage = () => {
    return <PrivatePage>
        <GroupMain />
    </PrivatePage>
}

export default GroupPage