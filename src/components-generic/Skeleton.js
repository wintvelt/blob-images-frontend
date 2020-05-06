export const TextSkeleton = (props) => {
    const { children, className, ...rest } = props;
    const textClass = (children)? 
        className : 
        ('pulse ' + (className || ''));
    return <span className={textClass} {...rest}>{children || 'placeholder'}</span>
}