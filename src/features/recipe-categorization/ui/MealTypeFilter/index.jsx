import { Carousel } from '@mantine/carousel';
import MealTypeFilterOption from './MealTypeFilterOption';

const MealTypeFilter = ({ items, activeMealType, onSelect }) => {
  return (
    <Carousel
      className="px-16"
      slideSize="auto"
      slideGap="md"
      emblaOptions={{ align: 'start', dragFree: true }}
      withControls
      controlSize={40}
      nextControlProps={{ 'aria-label': 'Scroll meal types right' }}
      previousControlProps={{ 'aria-label': 'Scroll meal types left' }}
      classNames={{ control: '!bg-card !opacity-100' }}
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
