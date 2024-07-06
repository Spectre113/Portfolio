"use client";
import React, { useEffect } from 'react';
import Swiper from 'swiper';

interface SwiperInstance {
  realIndex: number;
  params: {
    slidesPerGroup: number;
  };
  slides: {
    length: number;
  };
  loopedSlides: number;
}

const About: React.FC = () => {
  useEffect(() => {
    function updateSwiperText(swiperInstance: SwiperInstance): void {
      const currentIndex = Math.floor(swiperInstance.realIndex / swiperInstance.params.slidesPerGroup) + 1;
      const totalSlides = swiperInstance.slides.length - swiperInstance.loopedSlides - 1;
      const swiperTextElement = document.querySelector('.swiper-text');
      if (swiperTextElement) {
        swiperTextElement.textContent = `${currentIndex} / ${totalSlides}`;
      }
    }

    new Swiper('.swiper', {
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
        init(this: SwiperInstance) {
          updateSwiperText(this);
        },
        slideChange(this: SwiperInstance) {
          updateSwiperText(this);
        },
      },
    });

    const swiperClickElements = document.querySelectorAll('.about__swiper-click');
    swiperClickElements.forEach((swiperClickElement) => {
      const aboutContent = swiperClickElement.closest('.about__swiper-content');
      if (aboutContent) {
        const toggleButton = aboutContent.querySelector('.about-swiper-btn');
        if (toggleButton) {
          toggleButton.addEventListener('click', () => {
            if (swiperClickElement.classList.contains('about__swiper-click--active')) {
              swiperClickElement.classList.remove('about__swiper-click--active');
            } else {
              swiperClickElement.classList.add('about__swiper-click--active');
            }
          });
        }
      }
    });
  }, []);

  return (
    <section id="about" className="about">
            <div className="container">
                <h2 className="about__title">
                    About me
                </h2>
                <div className="swiper">
                    <div className="swiper-wrapper">
                        <div className="about__swiper-content swiper-slide">
                            <div className="about__experience-btn btn-reset">
                            </div>
                            <button className="btn-reset about-swiper-btn"></button>
                            <div className="about__swiper-click">
                                <div>
                                    <p className="about__swiper-info about__swiper-first">
                                        Over the course of my career, I have successfully completed four projects, each showcasing my ability to deliver high-quality web applications. Almost all of these websites are fully responsive, ensuring optimal performance and user experience across different screen sizes.
                                    </p>
                                    <p className="about__swiper-info">
                                        For more detailed information about each project, please refer to the dedicated section on this site.
                                    </p>
                                </div>
                                <button className="btn-reset about__swiper-click-close">
                                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path fillRule="evenodd" clipRule="evenodd" d="M0.666641 15.3043L15.3333 3.17761e-05L16 0.695679L1.33331 15.9999L0.666641 15.3043Z" fill="black"></path>
                                        <path fillRule="evenodd" clipRule="evenodd" d="M0.666725 -2.96187e-06L15.3334 15.3042L14.6667 15.9999L5.76143e-05 0.695644L0.666725 -2.96187e-06Z" fill="black"></path>
                                    </svg>
                                </button>
                            </div>
                        </div>
                        <div className="about__swiper-content swiper-slide">
                            <div className="about__skills-btn btn-reset">
                            </div>
                            <button className="btn-reset about-swiper-btn"></button>
                            <div className="about__swiper-click">
                                <div>
                                    <p className="about__swiper-info">
                                        I have developed a strong set of skills in frontend development, which includes:
                                    </p>
                                    <ul className="about__swiper-list list-reset">
                                        <li className="about__swiper-item">
                                            <span className="about__swiper-title">
                                                BEM Methodology:
                                            </span>
                                            <span className="about__swiper-info about__swiper-first">
                                                Proficient in using the Block Element Modifier (BEM) methodology to create modular and maintainable code.
                                            </span>
                                        </li>
                                        <li className="about__swiper-item">
                                            <span className="about__swiper-title">
                                                HTML Semantics:
                                            </span>
                                            <span className="about__swiper-info about__swiper-first">
                                                Understanding and applying HTML semantics to ensure that web pages are accessible and optimized for search engines.
                                            </span>
                                        </li>
                                        <li className="about__swiper-item">
                                            <span className="about__swiper-title">
                                                JavaScript:
                                            </span>
                                            <span className="about__swiper-info about__swiper-first">
                                                Skilled in using JavaScript to create interactive and dynamic web applications. This includes experience with ES6+ features and various libraries and frameworks.
                                            </span>
                                        </li>
                                    </ul>
                                    <p className="about__swiper-info">

                                    </p>
                                </div>
                                <button className="btn-reset about__swiper-click-close">
                                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path fillRule="evenodd" clipRule="evenodd" d="M0.666641 15.3043L15.3333 3.17761e-05L16 0.695679L1.33331 15.9999L0.666641 15.3043Z" fill="black"></path>
                                        <path fillRule="evenodd" clipRule="evenodd" d="M0.666725 -2.96187e-06L15.3334 15.3042L14.6667 15.9999L5.76143e-05 0.695644L0.666725 -2.96187e-06Z" fill="black"></path>
                                    </svg>
                                </button>
                            </div>
                        </div>
                        <div className="about__swiper-content swiper-slide">
                            <div className="about__education-btn btn-reset">
                            </div>
                            <button className="btn-reset about-swiper-btn"></button>
                            <div className="about__swiper-click">
                                <div>
                                    <p className="about__swiper-info about__swiper-first">
                                        I am currently studying at Innopolis University, where I am furthering my knowledge and skills in the field of technology. Additionally, I have completed various frontend development courses that have provided me with a solid foundation in creating dynamic and responsive web applications.
                                    </p>
                                    <p className="about__swiper-info">
                                        My dedication to learning extends beyond just my university studies. I have also successfully passed Cambridge English exams, which have significantly improved my proficiency in English. Prior to my university education, I completed 11 years of schooling, laying a strong educational groundwork.
                                    </p>
                                </div>
                                <button className="btn-reset about__swiper-click-close">
                                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path fillRule="evenodd" clipRule="evenodd" d="M0.666641 15.3043L15.3333 3.17761e-05L16 0.695679L1.33331 15.9999L0.666641 15.3043Z" fill="black"></path>
                                        <path fillRule="evenodd" clipRule="evenodd" d="M0.666725 -2.96187e-06L15.3334 15.3042L14.6667 15.9999L5.76143e-05 0.695644L0.666725 -2.96187e-06Z" fill="black"></path>
                                    </svg>
                                </button>
                            </div>
                        </div>
                        <div className="about__swiper-content swiper-slide">
                            <div className="about__hobbies-btn btn-reset">
                            </div>
                            <button className="btn-reset about-swiper-btn"></button>
                            <div className="about__swiper-click">
                                <div>
                                    <p className="about__swiper-info">In my free time, I enjoy engaging in activities that stimulate both creativity and teamwork. One of my favorite hobbies is building complex LEGO structures. It's a fantastic way to unwind and exercise my problem-solving skills. Additionally, I love playing computer games with friends. Whether it is a cooperative game or a competitive one, gaming provides a great opportunity to connect, strategize, and have fun together.</p>
                                </div>
                                <button className="btn-reset about__swiper-click-close">
                                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path fillRule="evenodd" clipRule="evenodd" d="M0.666641 15.3043L15.3333 3.17761e-05L16 0.695679L1.33331 15.9999L0.666641 15.3043Z" fill="black"></path>
                                        <path fillRule="evenodd" clipRule="evenodd" d="M0.666725 -2.96187e-06L15.3334 15.3042L14.6667 15.9999L5.76143e-05 0.695644L0.666725 -2.96187e-06Z" fill="black"></path>
                                    </svg>
                                </button>
                            </div>
                        </div>
                        <div className="about__swiper-content swiper-slide">
                            <div className="about__life-btn btn-reset">
                            </div>
                            <button className="btn-reset about-swiper-btn"></button>
                            <div className="about__swiper-click">
                                <div>
                                    <p className="about__swiper-info">
                                        I was born and raised in Chelyabinsk, where I spent most of my life. During the summer, I often traveled to another city, which gave me a broader perspective and new experiences. My interest in frontend development began in the 7th grade, and I started learning it with great enthusiasm. As I delved deeper into frontend development, I enrolled in a specialized course to enhance my skills. This foundational experience played a crucial role in my acceptance into Innopolis University, where I am currently continuing my education and expanding my expertise in technology.
                                    </p>
                                </div>
                                <button className="btn-reset about__swiper-click-close">
                                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path fillRule="evenodd" clipRule="evenodd" d="M0.666641 15.3043L15.3333 3.17761e-05L16 0.695679L1.33331 15.9999L0.666641 15.3043Z" fill="black"></path>
                                        <path fillRule="evenodd" clipRule="evenodd" d="M0.666725 -2.96187e-06L15.3334 15.3042L14.6667 15.9999L5.76143e-05 0.695644L0.666725 -2.96187e-06Z" fill="black"></path>
                                    </svg>
                                </button>
                            </div>
                        </div>
                    </div>
                    <div className="swiper-button-content">
                        <div className="swiper-button-next"></div>
                        <p className="swiper-text">1 / 2</p>
                        <div className="swiper-button-prev"></div>
                    </div>
                </div>
            </div>
        </section>
  );
};

export default About;