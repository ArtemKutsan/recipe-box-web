const MealTypeSelect = ({ value, options = [], onChange }) => {
  return (
    <label className="flex min-h-10 min-w-0 flex-1 items-center gap-3 rounded-xl border bg-white px-3">
      <span className="shrink-0 text-sm text-muted-foreground">Meal type</span>
      <select
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="min-w-0 flex-1 bg-transparent text-sm outline-none"
      >
        <option value="">All</option>
        {options.map((item) => (
          <option key={item.slug} value={item.slug}>
            {item.title}
          </option>
        ))}
      </select>
    </label>
  );
};

export default MealTypeSelect;
