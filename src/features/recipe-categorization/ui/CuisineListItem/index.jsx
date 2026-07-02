// src/features/recipe-categorization/ui/CuisineListItem/index.jsx
import { Badge } from '@/shared/ui';

// Компонент CuisineListItem принимает объект cuisine, выбранный тип блюда (mealType) и функцию onSelect для обработки выбора кухни. Он отображает информацию о кухне, включая изображение, название, описание и количество рецептов, а также вызывает функцию onSelect при клике на элемент.
const CuisineListItem = ({ cuisine, mealType, onSelect }) => {
  const { name, slug, count, image } = cuisine;

  return (
    <button
      type="button"
      onClick={() => onSelect(slug)}
      className="flex h-full flex-col overflow-hidden rounded-2xl border bg-card text-left"
    >
      {image ? <img src={image} alt={name} className="h-50 w-full object-cover" /> : null}

      <div className="flex flex-1 flex-col justify-between gap-4 p-4">
        <div>
          <h3 className="text-lg font-semibold">{name}</h3>
          <p className="mt-2 text-sm">
            Explore {name} recipes{mealType === 'All' ? '' : ` for ${mealType.toLowerCase()}`}
          </p>
        </div>
        <Badge className="rounded-lg">{count} recipes</Badge>
      </div>
    </button>
  );
};

export default CuisineListItem;
