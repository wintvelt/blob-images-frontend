import React from 'react';
import Typography from '@material-ui/core/Typography';
import Icon from '@material-ui/core/Icon';

import Link from '../components-generic/Link';
import { useActiveGroupValue } from '../data/activeTree-Group';

const linkStyle = {
    position: 'absolute',
    top: '64px',
    left: '24px',
    display: 'flex',
    alignItems: 'center',
    width: 'fit-content',
    marginBottom: '24px',
    zIndex: 1,
};
const linkStyle2 = { color: 'inherit' };

const BackLinkToGroup = ({ className }) => {
    const groupData = useActiveGroupValue();
    const hasValue = !!groupData.contents?.id;
    if (!hasValue) return null;

    const group = groupData.contents;
    const groupPath = '/personal/groups/[id]';
    const groupAs = groupPath.replace('[id]', group.id);
    const text = group.name || 'groep';
    return <Typography variant='body1' component='span' style={linkStyle} className={className} >
        <Icon fontSize='small'>arrow_back</Icon>
        <Link href={groupPath} as={groupAs}
            style={linkStyle2}
        >
            {` ${text}`}
        </Link>
    </Typography>
}

export default BackLinkToGroup;