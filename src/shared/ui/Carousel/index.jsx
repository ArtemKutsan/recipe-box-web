import { useEffect, useRef, useState } from 'react';
import { Carousel as MantineCarousel } from '@mantine/carousel';

const Carousel = ({ classNames, getEmblaApi, ...props }) => {
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

  const handleEmblaApi = (api) => {
    setEmblaApi(api);
    getEmblaApi?.(api);
  };

  return (
    <MantineCarousel
      ref={carouselRef}
      getEmblaApi={handleEmblaApi}
      className="px-14"
      slideSize="auto"
      slideGap="md"
      emblaOptions={{ align: 'start', dragFree: true }}
      withControls
      controlSize={40}
      classNames={{
        controls: '!px-0',
        control: '!bg-card !opacity-100 !px-0',
        ...classNames,
      }}
      {...props}
    />
  );
};

Carousel.displayName = 'Carousel';
Carousel.Slide = MantineCarousel.Slide;

export default Carousel;
