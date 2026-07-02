// src/features/recipe-categorization/ui/CuisineList/index.jsx
import CuisineListItem from '../CuisineListItem';

// Компонент CuisineList принимает массив кухонь (cuisines), выбранный тип блюда (mealType) и функцию onSelect для обработки выбора кухни. Он отображает список кухонь в виде сетки, используя компонент CuisineListItem для каждого элемента.
const CuisineList = ({ cuisines, mealType, onSelect }) => {
  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
      {cuisines.map((cuisine) => (
        <CuisineListItem
          key={cuisine.slug}
          cuisine={cuisine}
          mealType={mealType}
          onSelect={onSelect}
        />
      ))}
    </div>
  );
};

export default CuisineList;
