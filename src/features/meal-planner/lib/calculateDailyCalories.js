export const calculateDailyCalories = ({ days, rows }) =>
  days.map((day, dayIndex) => ({
    day: day.label,
    calories: rows.reduce((total, row) => {
      const item = row.items[dayIndex];

      return total + (item?.unavailable ? 0 : item?.caloriesPerServing ?? 0);
    }, 0),
  }));
