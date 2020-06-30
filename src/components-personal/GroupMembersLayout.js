import React from 'react';
import ExpansionPanelActions from '@material-ui/core/ExpansionPanelActions';
import Button from '@material-ui/core/Button';
import AvatarGroup from '@material-ui/lab/AvatarGroup';
import { makeStyles } from '@material-ui/core/styles';
import { useMediaQuery } from '@material-ui/core';

import Link from '../components-generic/Link';
import { AvatarSkeleton } from '../../src/components-generic/Skeleton';
import { initials } from '../components-generic/helpers';
import { useUserValue } from '../data/userData';
import { activeGroupMembers } from '../data/activeTree-Group';
import { activePathFront } from '../data/activeTreeRoot';
import { useRecoilValue, useRecoilValueLoadable } from 'recoil';

const useStyles = makeStyles(theme => ({
    avatar: {
        width: theme.spacing(5),
        height: theme.spacing(5),
        border: '1px solid white',
        fontSize: '12px',
    },
    dummy: 'dummy',
    skeleton: {
        height: '64px',
        width: '100%',
    },
    summary: {
        height: '64px',
    },
    panelTitle: {
        alignSelf: 'center',
        marginRight: theme.spacing(2),
    },
}));

const paddingLeft = { paddingLeft: '4px' };

export const MemberAvatarGroup = () => {
    const classes = useStyles();
    const isLarge = useMediaQuery(theme => theme.breakpoints.up('sm'));
    const maxAvatars = (isLarge) ? 10 : 5;
    const membersData = useRecoilValueLoadable(activeGroupMembers);
    const hasValue = (membersData.state === 'hasValue');
    const members = hasValue ? membersData.contents : [{}, {}, {}];
    return <AvatarGroup max={maxAvatars}>
        {members.map((member, i) => (
            <AvatarSkeleton key={'' + member.name + i} alt={member.name} src={member.avatar}
                className={classes.avatar} isLoading={!hasValue}>
                {(!member.image) &&
                    <span style={paddingLeft}>{initials(member.name)}</span>
                }
            </AvatarSkeleton>
        ))}
    </AvatarGroup>
}

export const MemberActions = () => {
    const currentUser = useUserValue();
    const { profile } = currentUser;
    const paths = useRecoilValue(activePathFront);

    const membersData = useRecoilValueLoadable(activeGroupMembers);
    const hasValue = (membersData.state === 'hasValue');
    if (!hasValue) return null;

    const members = membersData.contents;
    const currentIsAdmin = !!members.find(member => (
        member.SK.slice(1) === profile.id &&
        member.role === 'admin' &&
        member.status !== 'invite'
    ));    
    if (!currentIsAdmin) return null;


    return <ExpansionPanelActions>
        <Link href={paths.path + '/invite'}
            as={paths.asPath + '/invite'}>
            <Button color='primary'>Invite more</Button>
        </Link>
    </ExpansionPanelActions>
};