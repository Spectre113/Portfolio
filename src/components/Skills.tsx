import React, { useEffect } from 'react';

const Skills: React.FC = () => {
  useEffect(() => {
    const acc = document.getElementsByClassName("skills__accordeon-btn");
    for (let i = 0; i < acc.length; i++) {
      acc[i].addEventListener("click", function (this: HTMLElement) {
        this.classList.toggle("active");
        const panel = this.nextElementSibling as HTMLElement;
        if (panel.style.maxHeight) {
          panel.style.maxHeight = '';
        } else {
          panel.style.maxHeight = panel.scrollHeight + "px";
        }
      });
    }
  }, []);

  return (
    <section className="skills" id="skills">
      <div className="container">
        <h2 className="skills__title">Skills</h2>
        <div className="skills__accordeon">
          <button className="skills__accordeon-btn btn-reset">JavaScript</button>
          <div className="skills__accordeon-panel">
            <p>
              I have a solid understanding of JavaScript, which allows me to create dynamic and interactive web applications. I am familiar with ES6+ features and have experience with various JavaScript libraries and frameworks.
            </p>
          </div>
          <button className="skills__accordeon-btn btn-reset">HTML & CSS</button>
          <div className="skills__accordeon-panel">
            <p>
              I am proficient in HTML and CSS, including advanced concepts such as semantic markup and CSS grid/flexbox layouts. This knowledge helps me create well-structured and visually appealing web pages that are both accessible and SEO-friendly.
            </p>
          </div>
          <button className="skills__accordeon-btn btn-reset">BEM Methodology</button>
          <div className="skills__accordeon-panel">
            <p>
              I follow the Block Element Modifier (BEM) methodology, which helps in writing clean and maintainable code by organizing CSS classes in a modular fashion. This approach improves code reusability and scalability, making it easier to manage larger projects.
            </p>
          </div>
          <button className="skills__accordeon-btn btn-reset">Responsive Design</button>
          <div className="skills__accordeon-panel">
            <p>
              I have a keen understanding of responsive design principles, ensuring that websites I create are fully adaptable to different devices and screen sizes. This includes using media queries and flexible grid layouts to provide a seamless user experience across desktops, tablets, and mobile phones.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Skills;