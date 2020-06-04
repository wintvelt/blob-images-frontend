import Avatar from '@material-ui/core/Avatar';
import Icon from '@material-ui/core/Icon';
import { makeImageUrl } from './imageProvider';

export const TextSkeleton = (props) => {
    const { children, className, isLoading, ...rest } = props;
    const content = (isLoading) ? 'placeholder' : children;
    const textClass = (isLoading) ?
        ('pulse ' + (className || ''))
        : className;
    return <span className={textClass} {...rest}>{content}</span>
}

export const AvatarSkeleton = (props) => {
    const { children, className, isLoading, src, ...rest } = props;
    const imageUrl = makeImageUrl(src, 100, 100);
    const avatarClass = (isLoading) ?
        ('pulse ' + (className || ''))
        : className;
    return <Avatar className={avatarClass} src={imageUrl} {...rest}>
        {children}
    </Avatar>
}

export const ImageSkeleton = (props) => {
    const { isLoading, ...rest } = props;
    return (isLoading) ?
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%' }}
            className='pulse' >
            <Icon style={{fontSize:'48px', color: 'grey'}} >image</Icon>
        </div>
        : <img {...rest} />
}
