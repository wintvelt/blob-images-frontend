import Avatar from '@material-ui/core/Avatar';

export const TextSkeleton = (props) => {
    const { children, className, isLoading, ...rest } = props;
    const content = (isLoading) ? 'placeholder' : children;
    const textClass = (isLoading) ?
        ('pulse ' + (className || ''))
        : className;
    return <span className={textClass} {...rest}>{content}</span>
}

export const AvatarSkeleton = (props) => {
    const { children, className, isLoading, ...rest } = props;
    const avatarClass = (isLoading) ?
        ('pulse ' + (className || ''))
        : className;
    return <Avatar className={avatarClass} {...rest}>
        {children}
    </Avatar>
}