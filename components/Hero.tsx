"use client";

import React from 'react';

const Hero: React.FC = () => {
  return (
    <section className="hero">
      <div className="container flex">
        <div className="hero__info-block">
          <h1 className="hero__title">
            Vladimir Toporkov <span> Frontend developer </span>
          </h1>
          <p className="hero__info">
            With a&nbsp;passion for creating interactive and dynamic web applications, I&nbsp;specialize in&nbsp;building responsive, user-friendly interfaces using modern technologies. My&nbsp;focus is&nbsp;on&nbsp;delivering high-quality code and exceptional user experiences. 
          </p>
          <p className="hero__info">
            Dedicated to&nbsp;continuous learning and staying updated with the latest industry trends, I&nbsp;strive to&nbsp;implement best practices in&nbsp;every project. Whether it&rsquo;s developing new features or&nbsp;optimizing existing ones, my&nbsp;goal is&nbsp;to&nbsp;provide innovative solutions that meet client needs. 
          </p>
          <p className="hero__info">
            Let&rsquo;s build something amazing together! 
          </p>
        </div>
        <div className="hero__back"></div>
      </div>
    </section>
  );
};

export default Hero;