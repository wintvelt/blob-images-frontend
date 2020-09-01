import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import Grid from '@material-ui/core/Grid'
import Icon from '@material-ui/core/Icon';

const useStyles = makeStyles(theme => ({
    feature: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: theme.spacing(4, 8),
    },
    icon: {
        marginBottom: theme.spacing(1),
        fontSize: 40,
        color: '#9b786f',
    },
}))

const gridStyle = { paddingTop: '64px' };

const FeatureBlock = ({ featureList }) => {
    const classes = useStyles()

    return (
        <Grid container
            direction="row"
            justify="center"
            alignItems="stretch"
            style={gridStyle}
        >
            {featureList.map(feature => (
                <Grid item key={feature.title} xs={12} md={4} className={classes.feature}
                    id={feature.id}>
                    <Icon color='secondary' className={classes.icon}>
                        {feature.icon}
                    </Icon>
                    <Typography variant="h5" gutterBottom>
                        {feature.title}
                    </Typography>
                    <Typography variant="body1" paragraph align='center'>
                        {feature.descriptions.map((description, i) => (
                            <React.Fragment key={i}>
                                {description}<br />
                            </React.Fragment>
                        ))}
                    </Typography>
                </Grid>
            ))}
        </Grid>
    )
}

export default FeatureBlock;