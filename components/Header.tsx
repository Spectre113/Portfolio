"use client";

import React from 'react';
import Link from 'next/link';

const Header: React.FC = () => {
  return (
    <header className="header">
      <div className="container">
        <div className="header__logo">
          <button className="header__logo-info flex">
            <span className="header-name">Vladimir Toporkov</span>
            <span className="header-download">
              <svg fill="#000000" width="20px" height="20px" viewBox="0 0 260 205" xmlns="http://www.w3.org/2000/svg">
                <path d="M184.588,75l-54.683,72.879L75.412,75H112V2h36v73H184.588z M258,75h-36v92H38V75H2v128h256V75z"/>
              </svg>
            </span>
          </button>
        </div>
        <nav className="header__nav">
          <ul className="header__list list-reset flex">
            <li className="header__item">
              <Link href="/about" legacyBehavior>
                <a className="header__link">ABOUT</a>
              </Link>
            </li>
            <li className="header__item">
              <Link href="/projects" legacyBehavior>
                <a className="header__link">PROJECTS</a>
              </Link>
            </li>
            <li className="header__item">
              <Link href="/reference" legacyBehavior>
                <a className="header__link">REFERENCE</a>
              </Link>
            </li>
            <li className="header__item">
              <Link href="/skills" legacyBehavior>
                <a className="header__link">SKILLS</a>
              </Link>
            </li>
            <li className="header__item">
              <Link href="/comic" legacyBehavior>
                <a className="header__link">COMIC</a>
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;