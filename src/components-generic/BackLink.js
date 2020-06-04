import React from 'react';
import Typography from '@material-ui/core/Typography';
import Icon from '@material-ui/core/Icon';

import Link from '../components-generic/Link';
import { useApiData } from './DataProvider';

const linkStyle = {
    position: 'absolute',
    top: '64px',
    left: '24px',
    color: 'inherit',
    display: 'flex',
    alignItems: 'center',
    color: 'inherit',
    width: 'fit-content',
    marginBottom: '24px'
};

const BackLink = ({ groupId, album, className }) => {
    const groupData = useApiData('group', `/groups/${groupId}`);
    const group = groupData.data;
    const groupPath = '/personal/groups/[id]';
    const groupAs = groupPath.replace('[id]', groupId);
    const path = (album && album.SK) ? groupPath + '/albums/[albumid]' : groupPath;
    const as = (album && album.SK) ? groupAs + `/albums/${album.SK}` : groupAs;
    const text = (album && album.name) ?
        album.name :
        (group && group.name) ?
            group.name
            : 'group';
    return <Typography variant='body1' component='span' style={linkStyle}>
        <Icon fontSize='small'>arrow_back</Icon>
        <Link href={path} as={as}
            className={className}
            style={{ color: 'inherit' }}
        >
            {` ${text}`}
        </Link>
    </Typography>
}

export default BackLink;