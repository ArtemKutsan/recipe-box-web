import LikeIcon from '@/assets/icons/like.svg?react';
import TrashIcon from '@/assets/icons/trash.svg?react';

const MealPlannerCard = ({ item, day, mealPeriod, onReplaceMeal, onRemoveMeal }) => {
  const handleRemoveMeal = () => {
    void onRemoveMeal({ day, mealPeriod, recipeId: null }).catch(() => {});
  };

  const handleReplaceMeal = () => {
    onReplaceMeal({ day, mealPeriod });
  };

  return (
    <article
      data-day={day}
      data-meal-period={mealPeriod}
      className="group relative aspect-square overflow-hidden rounded-2xl border bg-card text-left"
    >
      <button
        type="button"
        onClick={handleReplaceMeal}
        className="absolute inset-0 z-10 cursor-pointer"
        aria-label={`Replace ${item.title} in ${day} ${mealPeriod}`}
      />
      <img
        src={item.image}
        alt={item.title}
        className="absolute inset-0 h-full w-full object-cover"
      />
      <div className="absolute inset-x-0 bottom-0 flex h-16 flex-col gap-2 justify-between bg-card/95 p-3 transition-all duration-200 group-hover:h-full group-hover:bg-card">
        <span className="truncate text-sm font-medium leading-5 group-hover:whitespace-normal">
          {item.title}
        </span>
      </div>

      <div className="pointer-events-none absolute inset-x-0 bottom-0 z-20 flex items-center justify-between gap-2 p-3 group-hover:bg-card">
        <span className="text-xs text-muted-foreground group-hover:hidden">
          {item.caloriesPerServing} kcal
        </span>
        <button
          type="button"
          onClick={handleRemoveMeal}
          className="pointer-events-auto hidden cursor-pointer group-hover:block"
          aria-label={`Remove ${item.title} from ${day} ${mealPeriod}`}
        >
          <TrashIcon className="size-4" aria-hidden="true" />
        </button>
        <LikeIcon className="size-4" aria-hidden="true" />
      </div>
    </article>
  );
};

export default MealPlannerCard;
