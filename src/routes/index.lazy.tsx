import Autoplay from 'embla-carousel-autoplay';
import { Carousel, CarouselContent, CarouselItem } from '@/components/ui/carousel';
import { Link, createLazyFileRoute } from '@tanstack/react-router';
import sneaker1 from '@/assets/img/sneak1.png';
import sneaker2 from '@/assets/img/sneak2.png';
import sneaker3 from '@/assets/img/sneak3.png';

export const Route = createLazyFileRoute('/')({
  component: Index,
});

const carouselContent = [
  {
    title: 'Выбор за тобой',
    img: sneaker1,
  },
  {
    title: 'Скидка 5%',
    subtitle: 'на первый заказ',
    img: sneaker2,
  },
  {
    title: 'Бесплатная доставка',
    subtitle: 'по всей России.',
    img: sneaker3,
  },
];

function Index() {
  return (
    <Carousel
      plugins={[Autoplay({ delay: 5000 })]}
      opts={{ align: 'start', loop: true }}
      className="w-full">
      <CarouselContent>
        {carouselContent.map(({ title, subtitle, img }, index) => (
          <CarouselItem key={index}>
            <div className="flex w-full">
              <div className="w-1/2 bg-black h-96 text-white flex flex-col items-center justify-center">
                <div className="flex flex-col space-y-6 w-[75%] h-40 justify-between">
                  <h1 className="text-4xl font-bold">{title}</h1>
                  {subtitle ? <p className="text-2xl">{subtitle}</p> : null}
                  <Link to="/sneakers">
                    <button className="bg-white py-3 px-6 text-black font-semibold text-sm w-fit border border-gray-300 hover:bg-red-500 hover:text-white transition-colors duration-200 ease-in-out outline-none border-none">
                      Перейти в каталог
                    </button>
                  </Link>
                </div>
              </div>
              <div className="w-1/2 bg-[#dadada] h-96">
                <img src={img} className="h-full mx-auto" alt="" />
              </div>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
    </Carousel>
  );
}
