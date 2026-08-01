import { forwardRef } from 'react';
import { cn } from '@/shared/lib/cn';

const fieldControlClassName =
  'flex min-h-10 items-center gap-3 rounded-xl border bg-card px-3';
const fieldInputClassName = 'min-w-0 flex-1 bg-transparent py-2 text-sm outline-none';

const FormField = forwardRef(function FormField(
  { as: Component = 'input', label, className, containerClassName, labelClassName, id, ...props },
  ref,
) {
  const isTextarea = Component === 'textarea';

  return (
    <label
      className={cn(
        fieldControlClassName,
        isTextarea && 'overflow-hidden px-0',
        containerClassName,
      )}
    >
      <span
        className={cn(
          isTextarea ? 'sr-only' : 'shrink-0 text-sm text-muted-foreground',
          labelClassName,
        )}
      >
        {label}
      </span>
      <Component
        ref={ref}
        id={id}
        className={cn(fieldInputClassName, isTextarea && 'resize-y px-3', className)}
        {...props}
      />
    </label>
  );
});

export default FormField;
