import Avatar from '@material-ui/core/Avatar';

export const TextSkeleton = (props) => {
    const { children, className, ...rest } = props;
    const textClass = (children) ?
        className :
        ('pulse ' + (className || ''));
    return <span className={textClass} {...rest}>{children || 'placeholder'}</span>
}

export const AvatarSkeleton = (props) => {
    const { children, className, ...rest } = props;
    const avatarClass = (children) ?
        className :
        ('pulse ' + (className || ''));
    return <Avatar className={avatarClass} {...rest}>
        {children}
    </Avatar>
}