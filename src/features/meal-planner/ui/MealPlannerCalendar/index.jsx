import MealPlannerCard from '../MealPlannerCard';
import MealPlannerSlot from '../MealPlannerSlot';

const columnTemplate = {
  gridTemplateColumns: 'repeat(7, minmax(116px, 1fr))',
};

const MealPlannerCalendar = ({ days, rows, onAddMeal, onRemoveMeal }) => {
  return (
    <div className="w-full max-w-5xl overflow-x-auto pb-6">
      <div className="min-w-[280px] space-y-3">
        <div className="grid gap-3" style={columnTemplate}>
          {/* <div /> */}
          {days.map((day) => (
            <div
              key={day.label}
              className={
                day.active
                  ? 'border-secosndary/10 bg-secondary/5 text-secondary flex min-h-12 items-center justify-center rounded-2xl border px-4 py-2 text-sm font-medium'
                  : 'min-h-12 flex items-center justify-center px-4 py-2 text-sm font-medium'
              }
            >
              {day.label}
            </div>
          ))}
        </div>

        <div className="space-y-3">
          {rows.map(({ label, items }) => (
            <div key={label} className="grid gap-3" style={columnTemplate}>
              {/* <div className="flex items-center justify-center rounded-2xl p-3">
                <div className="flex flex-col items-center gap-2 text-center">
                  <Icon className="size-6" aria-hidden="true" />
                  <span className="text-sm font-medium">{label}</span>
                </div>
              </div> */}

              {items.map((item, index) =>
                item ? (
                  <MealPlannerCard
                    key={`${label}-${index}`}
                    item={item}
                    day={days[index].label}
                    mealPeriod={label}
                    onReplaceMeal={onAddMeal}
                    onRemoveMeal={onRemoveMeal}
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
