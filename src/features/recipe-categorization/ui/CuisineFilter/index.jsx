import { Carousel } from '@mantine/carousel';
import CuisineFilterOption from './CuisineFilterOption';

const CuisineFilter = ({ cuisines, activeCuisine, onSelect }) => {
  return (
    <Carousel
      className="px-16"
      slideSize="auto"
      slideGap="md"
      emblaOptions={{ align: 'start', dragFree: true }}
      withControls
      controlSize={40}
      classNames={{ control: '!bg-card !opacity-100' }}
      nextControlProps={{ 'aria-label': 'Scroll cuisines right' }}
      previousControlProps={{ 'aria-label': 'Scroll cuisines left' }}
    >
      {cuisines.map((cuisine) => (
        <Carousel.Slide key={cuisine.slug} className="w-auto">
          <CuisineFilterOption
            cuisine={cuisine}
            isActive={activeCuisine === cuisine.slug}
            onSelect={onSelect}
          />
        </Carousel.Slide>
      ))}
    </Carousel>
  );
};

export default CuisineFilter;
