// src/features/recipe-categorization/ui/MealTypeSelector/index.jsx
import { useRef } from 'react';
import MealTypeSelectorItem from '../MealTypeSelectorItem';

// Компонент MealTypeSelector отображает горизонтальный список типов блюд (meal types) с кнопками для прокрутки влево и вправо. Он принимает массив items, активный элемент activeItem и функцию onSelect для обработки выбора типа блюда. Контейнер с типами блюд прокручивается при клике на кнопки прокрутки, используя реф для доступа к DOM-элементу.
const MealTypeSelector = ({ items, activeItem, onSelect }) => {
  // Реф для контейнера с типами блюд, который будет прокручиваться при клике на кнопки прокрутки
  const listRef = useRef(null);

  // Функция для прокрутки контейнера с типами блюд на заданное смещение (offset)
  const scroll = (offset) => {
    listRef.current?.scrollBy({
      left: offset,
      behavior: 'smooth',
    });
  };

  return (
    <div className="flex items-center gap-4">
      <button
        type="button"
        onClick={() => scroll(-256)}
        className="flex size-10 shrink-0 items-center justify-center rounded-lg border"
        aria-label="Scroll meal types left"
      >
        ‹
      </button>

      <div ref={listRef} className="flex gap-4 overflow-x-auto pb-4">
        {items.map((item) => (
          <MealTypeSelectorItem
            key={item.slug}
            item={item}
            isActive={activeItem === item.slug}
            onSelect={onSelect}
          />
        ))}
      </div>

      <button
        type="button"
        onClick={() => scroll(256)}
        className="flex size-10 shrink-0 items-center justify-center rounded-lg border"
        aria-label="Scroll meal types right"
      >
        ›
      </button>
    </div>
  );
};

export default MealTypeSelector;
