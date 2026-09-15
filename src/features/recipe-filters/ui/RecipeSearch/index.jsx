import SearchIcon from '@/assets/icons/search.svg?react';

const RecipeSearch = ({ value, onChange }) => (
  <label className="text-sm flex min-h-10 min-w-0 items-center gap-3 rounded-xl border bg-white px-3 md:flex-[1.35]">
    <span className="shrink-0 text-muted-foreground" aria-hidden="true">
      <SearchIcon className="size-4" />
    </span>
    <input
      type="search"
      value={value}
      onChange={(event) => onChange(event.target.value)}
      placeholder="Search in recipes"
      className="min-w-0 flex-1 bg-transparent text-sm text-foreground outline-none placeholder:text-muted-foreground"
      aria-label="Search in recipes"
    />
    {value ? (
      <button
        type="button"
        onClick={() => onChange('')}
        className="shrink-0 text-muted-foreground hover:text-foreground"
        aria-label="Clear recipe search"
      >
        <span className="text-2xl leading-none" aria-hidden="true">
          ×
        </span>
      </button>
    ) : null}
  </label>
);

export default RecipeSearch;
