import React from 'react';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import Icon from '@material-ui/core/Icon';
import Typography from '@material-ui/core/Typography';
import Avatar from '@material-ui/core/Avatar';
import AvatarGroup from '@material-ui/lab/AvatarGroup';
import { makeStyles } from '@material-ui/core/styles';

import DataProvider, { useApiData } from '../../src/components-generic/DataProvider';


const useStyles = makeStyles(theme => ({
    container: {
        position: 'relative',
        margin: theme.spacing(2, 0),
    },
    skeleton: {
        height: '48px',
        width: '100%',
    },
    panel: {
        paddingLeft: theme.spacing(1),
        paddingRight: theme.spacing(1),
    },
    panelTitle: {
        alignSelf: 'center',
        marginRight: theme.spacing(2),
    },
    avatar: {
        width: theme.spacing(4),
        height: theme.spacing(4),
        border: '1px solid white',
        fontSize: '12px',
    }
}));

const initials = (name) => {
    return name.split(' ').map(word => {
        return word[0]
    }).filter(letter => {
        return letter && letter.match(/[A-zÀ-ú]/);
    }).join('')
}

const MemberSummary = (props) => {
    const { avatarClass, panelTitleClass } = props;
    const members = useApiData();
    return <ExpansionPanelSummary
        expandIcon={<Icon>expand_more</Icon>}
        aria-controls="panel1a-content"
        id="panel1a-header"
    >
        <Typography variant='subtitle1' color='textSecondary' className={panelTitleClass}>
            Members:
        </Typography>
        <AvatarGroup max={10}>
            {members.map((member) => (
                <Avatar key={member.name} alt={member.name} src={member.avatar}
                    className={avatarClass}>
                    {(!member.image && initials(member.name))}
                </Avatar>
            ))}
        </AvatarGroup>
    </ExpansionPanelSummary>

}

const MemberDetails = (props) => {
    const { contentClass, textClass } = props;
    const data = useApiData();
    const { title, subtitle, stats } = data;
    return <ExpansionPanelDetails>
        <Typography>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex,
            sit amet blandit leo lobortis eget.
        </Typography>
    </ExpansionPanelDetails>
}

const GroupMembersLayout = ({ source }) => {
    const classes = useStyles();
    return <div className={classes.container}>
        <DataProvider source={source} className={classes.skeleton}>
            <ExpansionPanel className={classes.panel}>
                <MemberSummary avatarClass={classes.avatar} panelTitleClass={classes.panelTitle} />
                <MemberDetails contentClass={classes.content} textClass={classes.groupText} />
            </ExpansionPanel>
        </DataProvider>
    </div>
}

export default GroupMembersLayout;