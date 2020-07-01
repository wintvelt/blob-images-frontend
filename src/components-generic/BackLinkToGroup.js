import React from 'react';
import Typography from '@material-ui/core/Typography';
import Icon from '@material-ui/core/Icon';

import Link from '../components-generic/Link';
import { useRecoilValueLoadable } from 'recoil';
import { activeGroupState, hasGroupData } from '../data/activeTree-Group';

const linkStyle = {
    position: 'absolute',
    top: '64px',
    left: '24px',
    color: 'inherit',
    display: 'flex',
    alignItems: 'center',
    color: 'inherit',
    width: 'fit-content',
    marginBottom: '24px',
    zIndex: 1,
};
const linkStyle2 = { color: 'inherit' };

const BackLinkToGroup = ({ className }) => {
    const groupData = useRecoilValueLoadable(activeGroupState);
    const hasValue = hasGroupData(groupData);
    if (!hasValue) return null;

    const group = groupData.contents;
    const groupPath = '/personal/groups/[id]';
    const groupAs = groupPath.replace('[id]', group.id);
    const text = group.name || 'group';
    return <Typography variant='body1' component='span' style={linkStyle}>
        <Icon fontSize='small'>arrow_back</Icon>
        <Link href={groupPath} as={groupAs}
            className={className}
            style={linkStyle2}
        >
            {` ${text}`}
        </Link>
    </Typography>
}

export default BackLinkToGroup;