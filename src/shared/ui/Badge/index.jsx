import { cn } from '@/shared/lib/cn';

const Badge = ({ children, className = '' }) => {
  return (
    <span
      className={cn(
        'w-fit lowercase rounded-full bg-secondary/5 px-2 py-1 text-sm text-secondary',
        className,
      )}
    >
      {children}
    </span>
  );
};

export default Badge;
