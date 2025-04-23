import { useState } from 'react';

import RecipeCard from '../recipe-card/RecipeCard';

interface ICarouselProps {
  images: string[];
}

const Carousel = ({ images }: ICarouselProps) => {
  const [current, setCurrent] = useState(0);

  const handleClick = (idx: number) => {
    setCurrent(idx);
  };

  return (
    <>
      <div className="carousel w-[335px]">
        {images.map((url, idx) => (
          <div id={`item${idx}`} key={url} className="carousel-item">
            <RecipeCard recipeImg={url} />
          </div>
        ))}
      </div>
      <div className="flex w-full justify-center gap-2 py-2">
        {images.map((url, idx) => (
          <a
            key={url}
            href={`#item${idx}`}
            className={`h-2.5 rounded-full transition-all ${
              current === idx ? 'bg-grey01 w-8' : 'bg-grey05 w-2.5'
            }`}
            target="_self"
            onClick={() => handleClick(idx)}
          />
        ))}
      </div>
    </>
  );
};

export default Carousel;
