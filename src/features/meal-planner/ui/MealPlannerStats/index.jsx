const formatCalories = (value) => `${value.toLocaleString('en-US')} kcal`;

const MealPlannerStats = ({ days, rows, dailyCalories }) => {
  const weeklyCalories = dailyCalories.reduce((total, item) => total + item.calories, 0);
  const plannedMeals = rows.reduce(
    (total, row) => total + row.items.filter((item) => item && !item.unavailable).length,
    0,
  );
  const currentDayIndex = days.findIndex((day) => day.active);
  const currentDay = dailyCalories[currentDayIndex] ?? { calories: 0 };
  const stats = [
    { label: 'Weekly calories', value: formatCalories(weeklyCalories) },
    { label: 'Average per day', value: formatCalories(Math.round(weeklyCalories / days.length)) },
    { label: 'Planned meals', value: `${plannedMeals} / ${days.length * rows.length}` },
    { label: 'Today', value: formatCalories(currentDay.calories) },
  ];

  return (
    <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
      {stats.map((stat) => (
        <div key={stat.label} className="rounded-2xl border bg-card px-4 py-3">
          <p className="text-xs text-muted-foreground">{stat.label}</p>
          <p className="mt-1 text-sm font-medium text-foreground">{stat.value}</p>
        </div>
      ))}
    </div>
  );
};

export default MealPlannerStats;
