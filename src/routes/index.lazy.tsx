import Autoplay from 'embla-carousel-autoplay';
import AutoScroll from 'embla-carousel-auto-scroll';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import { Link, createLazyFileRoute } from '@tanstack/react-router';
import { useCallback, useEffect, useState } from 'react';
import { getBrands, getLastSneakers } from '@/lib/pocketbase';
import { RecordModel } from 'pocketbase';
import { constructImageURL } from '@/lib/utils';
import { SkeletonSliderCard } from '@/components/skeletons/SkeletonSliderCard';
import { SneakerCard } from '@/components/skeletons/SneakerCard';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import sneaker1 from '@/assets/img/sneak1.png';
import sneaker2 from '@/assets/img/sneak2.png';
import sneaker3 from '@/assets/img/sneak3.png';
import aboutImg from '@/assets/img/about.jpg';

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
  const [lastSneakers, setLastSneakers] = useState<RecordModel[]>([]);
  const [brands, setBrands] = useState<RecordModel[]>([]);

  const fetchData = useCallback(async () => {
    try {
      const [lastSneakersResp, brandsResp] = await Promise.all([getLastSneakers(), getBrands()]);
      setLastSneakers(lastSneakersResp);
      setBrands(brandsResp);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return (
    <div className="space-y-16">
      <Carousel
        plugins={[Autoplay({ delay: 5000 })]}
        opts={{ align: 'start', loop: true }}
        className="w-full">
        <CarouselContent>
          {carouselContent.map(({ title, subtitle, img }, index) => (
            <CarouselItem key={index}>
              <div className="flex flex-col-reverse md:flex-row w-full">
                <div className="w-full md:w-1/2 bg-black h-96 text-white flex flex-col items-center justify-center">
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
                <div className="w-full md:w-1/2 bg-[#dadada] h-96">
                  <img src={img} className="h-full mx-auto" alt="" />
                </div>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>

      <div>
        <h2 className="text-3xl font-bold py-14">Обувь</h2>
        <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-4">
          <Link to="/sneakers" params={{ gender: 'male' }} className="group">
            <div
              className={`bg-darkMen w-full aspect-square max-w-[768px] bg-no-repeat bg-cover flex flex-col justify-end p-8 sm:p14 group-hover:brightness-125`}>
              <h3 className="text-3xl sm:text-5xl font-bold text-white transition">Для мужчин</h3>
            </div>
          </Link>
          <Link to="/sneakers" params={{ gender: 'female' }} className="group">
            <div
              className={`bg-darkWomen w-full aspect-square max-w-[768px] bg-no-repeat bg-cover flex flex-col justify-end p-8 sm:p14 group-hover:brightness-125`}>
              <h3 className="text-2xl sm:text-5xl font-bold text-white transition">Для Женщин</h3>
            </div>
          </Link>
        </div>
      </div>

      <div>
        <h1 className="text-3xl font-bold py-10">Новинки</h1>
        <Carousel opts={{ align: 'start' }} className="w-full">
          <div className="flex justify-between">
            <Link className="self-start" to="/sneakers">
              <button className="text-lg text-red-500 hover:text-red-700">Каталог</button>
            </Link>
            <div className="space-x-5">
              <CarouselPrevious className="hover:bg-stone-200" />
              <CarouselNext className="hover:bg-stone-200" />
            </div>
          </div>
          <CarouselContent className="-ml-6">
            {lastSneakers.length > 0
              ? lastSneakers.map(({ id, title, price, field, collectionName, type }) => (
                  <CarouselItem className="pl-6 sm:basis-1/2 lg:basis-1/3" key={id}>
                    <SneakerCard {...{ id, title, price, field, collectionName, type }} />
                  </CarouselItem>
                ))
              : Array.from({ length: 3 }).map((_, index) => (
                  <CarouselItem className="pl-6 sm:basis-1/2 lg:basis-1/3" key={index}>
                    <SkeletonSliderCard />
                  </CarouselItem>
                ))}
          </CarouselContent>
        </Carousel>
      </div>

      <Carousel
        plugins={[AutoScroll({ speed: 2, stopOnInteraction: false })]}
        opts={{ loop: true }}
        className="w-full">
        <CarouselContent className="-ml-2 md:-ml-6">
          {brands &&
            brands.map(({ id, title, photo, collectionId }) => (
              <CarouselItem
                className="pl-2 md:pl-6 basis-1/3 sm:basis-1/4 lg:basis-1/6 flex flex-col items-center p-5"
                key={id}>
                <img src={constructImageURL(photo, collectionId, id)} alt={title} />
                <p className="font-bold">{title}</p>
              </CarouselItem>
            ))}
        </CarouselContent>
      </Carousel>

      <div className="space-y-5">
        <h2 className="text-4xl font-medium">О нас</h2>
        <img className="hue-rotate-180" src={aboutImg} alt="about-banner" />
        <p className="text-lg">
          Мы - интернет-магазин кроссовок, предлагающий широкий ассортимент моделей для всех
          возрастов и стилей. У нас вы найдете самые популярные бренды и последние новинки в мире
          кроссовок. Наша команда стремится предоставить вам лучший выбор и качество обслуживания.
          Мы гарантируем быструю доставку и отличную поддержку клиентов. Приятных покупок!
        </p>
      </div>

      <div className="space-y-5 pb-10">
        <h2 className="text-4xl font-medium">Ответы на вопросы</h2>
        <Accordion type="single" collapsible>
          <AccordionItem value="item-1">
            <AccordionTrigger>
              <h3 className="text-xl">Пришло не то, что я заказывал</h3>
            </AccordionTrigger>
            <AccordionContent>
              <p className="text-lg">
                Свяжитесь, пожалуйста, с менеджером, и мы постараемся решить данную проблему в
                кратчайшие сроки.
              </p>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-2">
            <AccordionTrigger>
              <h3 className="text-xl">Где мой заказ?</h3>
            </AccordionTrigger>
            <AccordionContent>
              <p className="text-lg">Отследить статус заказа можно в личном кабинете.</p>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-3">
            <AccordionTrigger>
              <h3 className="text-xl text-start">Вы осуществляете международную доставку?</h3>
            </AccordionTrigger>
            <AccordionContent>
              <p className="text-lg">
                Да, мы осуществляем международную доставку во многие страны по. Пожалуйста,
                ознакомьтесь с нашей политикой доставки для получения дополнительной информации и
                списка стран, в которые мы осуществляем доставку.
              </p>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-4">
            <AccordionTrigger>
              <h3 className="text-xl">Мои данные в безопасности?</h3>
            </AccordionTrigger>
            <AccordionContent>
              <p className="text-lg">
                Мы строго следуем существующей политике конфиденциальности, поэтому можем
                гарантировать полную безопасность персональных данных наших покупателей.
              </p>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </div>
  );
}
