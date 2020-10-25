import React from 'react';
import AccordionActions from '@material-ui/core/AccordionActions';
import Button from '@material-ui/core/Button';
import AvatarGroup from '@material-ui/lab/AvatarGroup';
import { makeStyles } from '@material-ui/core/styles';
import { useMediaQuery } from '@material-ui/core';

import Link from '../components-generic/Link';
import { AvatarSkeleton } from '../../src/components-generic/Skeleton';
import { initials } from '../components-generic/helpers';
import { useUserValue } from '../data/userData';
import { activePathFront } from '../data/activeTreeRoot';
import { useRecoilValue } from 'recoil';
import { useMembersValue } from '../data/activeTree-GroupMembers';
import { useActiveGroupValue } from '../data/activeTree-Group';

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
    const membersData = useMembersValue();
    const hasValue = (!!membersData.contents);
    const members = hasValue ? membersData.contents : [{}, {}, {}];
    return <AvatarGroup max={maxAvatars}>
        {members.map((member, i) => (
            <AvatarSkeleton key={'' + member.name + i} alt={member.name} src={member.image?.url}
                className={classes.avatar} isLoading={!hasValue}>
                {(!member.image?.url) &&
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

    const groupData = useActiveGroupValue();
    const mayInvite = groupData.contents?.mayInvite;
    console.log(groupData.contents);

    const membersData = useMembersValue();
    const hasValue = (!!membersData.contents);
    if (!hasValue) return null;

    const members = membersData.contents;
    const currentIsAdmin = !!members.find(member => (
        member.userId === profile.id &&
        member.userRole === 'admin' &&
        member.status !== 'invite'
    ));    
    if (!currentIsAdmin) return null;

    if (!mayInvite) return <AccordionActions>
        <Button color='primary' disabled>groep is vol</Button>
    </AccordionActions>

    return <AccordionActions>
        <Link href={paths.path + '/invite'}
            as={paths.asPath + '/invite'}>
            <Button color='primary'>Meer uitnodigen</Button>
        </Link>
    </AccordionActions>
};