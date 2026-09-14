import { Carousel } from '@/shared/ui';
import MealTypeFilterOption from './MealTypeFilterOption';

const MealTypeFilter = ({ items, activeMealType, onSelect }) => {
  return (
    <Carousel
      className="px-14"
      slideSize="auto"
      slideGap="md"
      emblaOptions={{ align: 'start', dragFree: true }}
      withControls
      controlSize={40}
      nextControlProps={{ 'aria-label': 'Scroll meal types right' }}
      previousControlProps={{ 'aria-label': 'Scroll meal types left' }}
      classNames={{ controls: '!px-0', control: '!bg-card !opacity-100 !px-0' }}
    >
      {items.map((item) => (
        <Carousel.Slide key={item.slug} className="w-auto">
          <MealTypeFilterOption
            item={item}
            isActive={activeMealType === item.slug}
            onSelect={onSelect}
          />
        </Carousel.Slide>
      ))}
    </Carousel>
  );
};

export default MealTypeFilter;
