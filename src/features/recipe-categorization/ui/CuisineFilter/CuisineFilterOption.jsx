import { cn } from '@/shared/lib/cn';

const CuisineFilterOption = ({ cuisine, isActive, onSelect }) => {
  const { name, slug, count } = cuisine;

  return (
    <button
      type="button"
      onClick={() => onSelect(slug)}
      className={cn(
        'flex h-16 min-w-40 flex-col items-center justify-center rounded-2xl border px-4 py-3 text-center transition-colors',
        isActive
          ? 'border-secondary/10 bg-secondary/5 text-secondary'
          : 'border-border bg-card text-foreground hover:border-secondary/50',
      )}
    >
      <span className="truncate text-sm font-semibold">{name}</span>
      <span className="text-sm font-semibold text-muted-foreground">{count} recipes</span>
    </button>
  );
};

export default CuisineFilterOption;
