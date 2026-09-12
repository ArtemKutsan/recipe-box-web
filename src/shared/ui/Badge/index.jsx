import { cn } from '@/shared/lib/cn';

const Badge = ({ children, className = '' }) => {
  return (
    <span
      className={cn(
        'w-fit lowercase rounded-full bg-muted/50 px-2 font-semibold py-1 text-sm text-foreground',
        className,
      )}
    >
      {children}
    </span>
  );
};

export default Badge;
