import { useEffect, useRef, useState } from 'react';
import { Carousel } from '@mantine/carousel';
import CuisineFilterOption from './CuisineFilterOption';

const CuisineFilter = ({ cuisines, activeCuisine, onSelect }) => {
  // Для прокрутки колесом мыши слайдера
  const [emblaApi, setEmblaApi] = useState(null);
  const carouselRef = useRef(null);

  useEffect(() => {
    const carousel = carouselRef.current;
    if (!carousel || !emblaApi) return undefined;

    const handleWheel = (event) => {
      if (event.deltaY === 0) return;

      const canScroll = event.deltaY > 0 ? emblaApi.canScrollNext() : emblaApi.canScrollPrev();
      event.preventDefault();
      if (!canScroll) return;

      if (event.deltaY > 0) emblaApi.scrollNext();
      else emblaApi.scrollPrev();
    };

    carousel.addEventListener('wheel', handleWheel, { passive: false });
    return () => carousel.removeEventListener('wheel', handleWheel);
  }, [emblaApi]);
  // Для прокрутки колесом мыши слайдера

  return (
    <Carousel
      ref={carouselRef} // для прокрутки колесом мыши слайдера
      className="px-14"
      slideSize="auto"
      slideGap="md"
      emblaOptions={{ align: 'start', dragFree: true }}
      getEmblaApi={setEmblaApi} // для прокрутки колесом мыши слайдера
      withControls
      controlSize={40}
      classNames={{ controls: '!px-0', control: '!bg-card !opacity-100 !px-0' }}
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
