import React from 'react';
import Typography from '@material-ui/core/Typography';
import Link from '../Link';

const HeroTitle = (props) => {
    const { title, subTitle, paragraph, linkText, linkUrl } = props;
    const Paragraph = () => paragraph;

    return (
        <>
            <Typography component="h1" variant="h2" color="inherit" gutterBottom>
                {title}
            </Typography>
            {subTitle &&
                <Typography variant="h5" color="inherit" paragraph>
                    {subTitle}
                </Typography>
            }
            {paragraph && <Paragraph />}
            {linkText &&
                <Link variant="subtitle1" href={linkUrl}>
                    {linkText}
                </Link>
            }
        </>
    )
};

export default HeroTitle