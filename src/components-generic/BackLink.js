import React from 'react';
import Typography from '@material-ui/core/Typography';
import Icon from '@material-ui/core/Icon';

import Link from '../components-generic/Link';

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

const BackLink = ({ group, album, className }) => {
    const groupPath = '/personal/groups/[id]';
    const groupAs = groupPath.replace('[id]', group && group.id);
    const path = (album) ? groupPath + '/albums/[albumid]' : groupPath;
    const as = (album) ? groupAs + `/albums/${album.SK}` : groupAs;
    return <Typography variant='body1' component='span' style={linkStyle}>
        <Icon fontSize='small'>arrow_back</Icon>
        <Link href={path} as={as}
            className={className}
            style={{ color: 'inherit' }}
        >
            {` ${(album) ? album.name : group.name}`}
        </Link>
    </Typography>
}

export default BackLink;