import { useEffect } from 'react';

export const useSwiper = () => {
  useEffect(() => {
    const updateSwiperText = (swiperInstance: any) => {
      const currentIndex = Math.floor(swiperInstance.realIndex / swiperInstance.params.slidesPerGroup) + 1;
      const totalSlides = swiperInstance.slides.length - swiperInstance.loopedSlides - 1;
      const swiperTextElement = document.querySelector('.swiper-text');
      if (swiperTextElement) {
        swiperTextElement.textContent = `${currentIndex} / ${totalSlides}`;
      }
    };

    const swiper = new Swiper('.swiper', {
      slidesPerView: 2,
      centeredSlides: false,
      slidesPerGroup: 2,
      grabCursor: true,
      keyboard: {
        enabled: true,
      },
      loop: true,
      spaceBetween: 50,
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      },
      autoplay: {
        delay: 10000,
        disableOnInteraction: false,
      },
      on: {
        init(swiperInstance: any) {
          updateSwiperText(swiperInstance);
        },
        slideChange(swiperInstance: any) {
          updateSwiperText(swiperInstance);
        },
      },
    });

  }, []);
};