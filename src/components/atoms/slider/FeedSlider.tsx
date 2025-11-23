import Carousel from '@/components/organisms/carousel/Carousel';

interface IFeedSliderProps {
  imageList: { src: string; alt: string }[];
}

const FeedSlider = ({ imageList }: IFeedSliderProps) => {
  return imageList && <Carousel imageList={imageList} half />;
};

export default FeedSlider;
