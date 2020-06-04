import React from 'react';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import Icon from '@material-ui/core/Icon';
import Typography from '@material-ui/core/Typography';
import AvatarGroup from '@material-ui/lab/AvatarGroup';
import { makeStyles } from '@material-ui/core/styles';

import { useApiData } from '../../src/components-generic/DataProvider';
import { AvatarSkeleton } from '../../src/components-generic/Skeleton';

const useStyles = makeStyles(theme => ({
    skeleton: {
        height: '64px',
        width: '100%',
    },
    panel: {
        paddingLeft: theme.spacing(1),
        paddingRight: theme.spacing(1),
        margin: theme.spacing(2, 0),
    },
    summary: {
        height: '64px',
    },
    panelTitle: {
        alignSelf: 'center',
        marginRight: theme.spacing(2),
    },
    avatar: {
        width: theme.spacing(5),
        height: theme.spacing(5),
        border: '1px solid white',
        fontSize: '12px',
    }
}));

const initials = (name) => {
    if (!name) return '';
    return name.split(' ').map(word => {
        return word[0];
    }).filter(letter => {
        return letter && letter.match(/[A-zÀ-ú]/);
    }).join('')
}

const MemberSummary = (props) => {
    const { avatarClass, panelTitleClass, summaryClass, members, isLoading } = props;
    const membersList = (isLoading) ?
        [{}, {}, {}]
        : members;
    return <ExpansionPanelSummary
        className={summaryClass}
        expandIcon={<Icon>expand_more</Icon>}
        aria-controls="panel1a-content"
        id="panel1a-header"
    >
        <Typography variant='subtitle1' color='textSecondary' className={panelTitleClass}>
            Members:
        </Typography>
        <AvatarGroup max={10}>
            {membersList.map((member, i) => (
                <AvatarSkeleton key={member.name || i} alt={member.name} src={member.avatar}
                    className={avatarClass} isLoading={isLoading}>
                    {(!member.image && initials(member.name))}
                </AvatarSkeleton>
            ))}
        </AvatarGroup>
    </ExpansionPanelSummary>

}

const MemberDetails = (props) => {
    const { contentClass, textClass } = props;
    const data = useApiData('members','/undefined');
    const { title, subtitle, stats } = data;
    return <ExpansionPanelDetails>
        <Typography>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex,
            sit amet blandit leo lobortis eget.
        </Typography>
    </ExpansionPanelDetails>
}

const GroupMembersLayout = ({ members, isLoading }) => {
    const classes = useStyles();
    return <ExpansionPanel className={classes.panel}>
        <MemberSummary avatarClass={classes.avatar} panelTitleClass={classes.panelTitle}
            summaryClass={classes.summary} members={members} isLoading={isLoading} />
        <MemberDetails contentClass={classes.content} textClass={classes.groupText} members={members} />
    </ExpansionPanel>
}

export default GroupMembersLayout;