import { cn } from '@/shared/lib/cn';

const buttonVariants = {
  default: 'bg-primary text-primary-foreground hover:bg-primary/87.5',
  destructive:
    'bg-destructive/10 dark:bg-destructive/20 text-destructive hover:bg-destructive/20 dark:hover:bg-destructive/30',
  outline: 'border hover:bg-accent hover:text-accent-foreground',
  secondary: 'bg-secondary text-secondary-foreground hover:bg-secondary/87.5',
  ghost: 'hover:bg-accent hover:text-accent-foreground',
  link: 'text-secondary/80 underline-offset-4 hover:underline',
};

const buttonSizes = {
  default:
    "min-h-10 min-w-10 px-4 py-1.5 text-base has-[>svg]:px-2.5 [&_svg:not([class*='size-'])]:size-4",
  xs: "min-h-6 min-w-6 gap-1 rounded-md px-2 py-0.5 text-xs has-[>svg]:px-1 [&_svg:not([class*='size-'])]:size-3",
  sm: "min-h-8 min-w-8 gap-1.5 rounded-lg px-3 py-1 text-sm has-[>svg]:px-2 [&_svg:not([class*='size-'])]:size-3",
  lg: "min-h-12 min-w-12 gap-3 px-6 py-2 rounded-2xl text-lg has-[>svg]:px-3.5 [&_svg:not([class*='size-'])]:size-4",
  icon: 'size-10 rounded-full',
};

const Button = ({
  as: Component = 'button',
  className,
  variant = 'default',
  size = 'default',
  type = 'button',
  ...props
}) => {
  return (
    <Component
      className={cn(
        'inline-flex w-fit h-fit items-center justify-center gap-2 rounded-xl font-medium transition-colors disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*="size-"])]:size-4',
        buttonVariants[variant],
        buttonSizes[size],
        className,
      )}
      type={Component === 'button' ? type : undefined}
      {...props}
    />
  );
};

export default Button;
