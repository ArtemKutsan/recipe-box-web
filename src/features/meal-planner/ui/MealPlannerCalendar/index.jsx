import MealPlannerCard from '../MealPlannerCard';
import MealPlannerSlot from '../MealPlannerSlot';

const columnTemplate = {
  gridTemplateColumns: '100px repeat(7, minmax(0, 1fr))',
};

const MealPlannerCalendar = ({ days, rows, onAddMeal }) => {
  return (
    <div className="overflow-x-auto pb-4">
      <div className="min-w-280 space-y-4">
        <div className="grid gap-4" style={columnTemplate}>
          <div />
          {days.map((day) => (
            <div
              key={day.label}
              className={
                day.active
                  ? 'flex min-h-12 items-center justify-center rounded-2xl border border-secondary/10 bg-secondary/5 px-4 py-2 text-sm font-medium text-secondary'
                  : 'flex min-h-12 items-center justify-center px-4 py-2 text-sm font-medium'
              }
            >
              {day.label}
            </div>
          ))}
        </div>

        <div className="space-y-4">
          {rows.map(({ label, Icon, items }) => (
            <div key={label} className="grid gap-4" style={columnTemplate}>
              <div className="flex items-center justify-center rounded-2xl p-4">
                <div className="flex flex-col items-center gap-2 text-center">
                  <Icon className="size-6" aria-hidden="true" />
                  <span className="text-sm font-medium">{label}</span>
                </div>
              </div>

              {items.map((item, index) =>
                item ? (
                  <MealPlannerCard
                    key={`${label}-${index}`}
                    item={item}
                    day={days[index].label}
                    mealPeriod={label}
                    onReplaceMeal={onAddMeal}
                  />
                ) : (
                  <MealPlannerSlot
                    key={`${label}-${index}`}
                    day={days[index].label}
                    mealPeriod={label}
                    onAddMeal={onAddMeal}
                  />
                ),
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MealPlannerCalendar;
