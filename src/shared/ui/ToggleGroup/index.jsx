import { cn } from '@/shared/lib/cn';
import Button from '../Button';

const ToggleGroup = ({ options, value, onChange, ariaLabel, className }) => {
  return (
    <div
      className={cn('flex w-fit max-w-full gap-1 rounded-xl border bg-card p-1', className)}
      role="group"
      aria-label={ariaLabel}
    >
      {options.map((option) => {
        const isActive = option.value === value;

        return (
          <Button
            key={option.value}
            type="button"
            size="sm"
            variant={isActive ? 'secondary' : 'ghost'}
            aria-pressed={isActive}
            disabled={option.disabled}
            onClick={() => {
              if (!isActive) {
                onChange(option.value);
              }
            }}
          >
            {option.label}
          </Button>
        );
      })}
    </div>
  );
};

export default ToggleGroup;
