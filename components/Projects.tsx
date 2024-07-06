"use client";
import React, { useEffect, useState } from 'react';

interface Project {
  title: string;
  description: string;
  technologies: string;
  link: string;
}

const Projects: React.FC = () => {
  const projectInfo: Record<string, Project> = {
    Euclid: {
      title: 'Euclid',
      description: 'Euclid is a website that provides project system services and is still not adapted for various devices, but it already utilizes JavaScript. The site offers investment opportunities for various companies, aiming to streamline and enhance their project management and operational processes through innovative web-based solutions.',
      technologies: 'HTML, CSS, JavaScript, BEM',
      link: 'https://github.com/Spectre113/euclid',
    },
    'W-wave': {
      title: 'W-wave',
      description: 'W-wave is a radio website that features a comprehensive list of various radio stations. The site was built using semantic HTML elements and adheres to the BEM methodology developed by Yandex, ensuring a modular and maintainable code structure. JavaScript was used to enhance the functionality, providing a dynamic and interactive user experience. Additionally, the site is fully responsive and adapts seamlessly to different devices, offering a consistent experience across desktops, tablets, and smartphones. W-wave stands as a robust example of modern web development practices, combining clean code, semantic markup, and responsive design to deliver a user-friendly platform for radio enthusiasts.',
      technologies: 'HTML, CSS, JavaScript, BEM',
      link: 'https://github.com/Spectre113/W-wave',
    },
    Lagoona: {
      title: 'Lagoona',
      description: 'Lagoona is a simple website built using pure HTML and CSS for a hotel. This project was created as part of an educational exercise to demonstrate basic web development skills. The site features a clean and minimalist design, showcasing fundamental layout techniques and styling. Although the site is not responsive and lacks advanced functionality, it serves as a solid example of how to structure and style a webpage using just HTML and CSS. The project highlights the importance of a well-organized codebase and the effective use of CSS for visual presentation. Lagoona stands as a testament to the early stages of learning web development, providing a foundational understanding of how websites are constructed. It’s a great reference point for anyone starting out in the field, illustrating the core principles of web design and development.',
      technologies: 'HTML, CSS',
      link: '',
    },
    Blanchard: {
      title: 'Blanchard (still in progress)',
      description: 'Description for Blanchard project.',
      technologies: 'HTML, CSS, JavaScript, BEM',
      link: '',
    },
  };

  const [selectedProject, setSelectedProject] = useState<Project | null>(projectInfo['Euclid']);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      import('choices.js').then((Choices) => {
        const choices = new Choices.default('#my-select', {
          shouldSort: false,
          itemSelectText: '',
        });

        document.getElementById('my-select')!.addEventListener('change', (event: any) => {
          const projectId = event.target.value;
          setSelectedProject(projectInfo[projectId]);
        });
      });
    }
  }, []);

  return (
    <section id="projects" className="projects">
      <div className="container">
        <div className="projects__select-block">
          <h2 className="projects__title">Projects</h2>
          <div className="projects__select">
            <select id="my-select" className="my-select">
              {Object.keys(projectInfo).map((projectId) => (
                <option
                  key={projectId}
                  value={projectId}
                  disabled={projectId === 'Blanchard'}
                >
                  {projectInfo[projectId].title}
                </option>
              ))}
            </select>
          </div>
        </div>
        {selectedProject && (
          <div className="projects__info-block" id="project-info">
            <h2>{selectedProject.title}</h2>
            <p>
              <strong>Description:</strong> {selectedProject.description}
            </p>
            <p>
              <strong>Technologies:</strong> {selectedProject.technologies}
            </p>
            <p>
              <strong>Link:</strong>{' '}
              {selectedProject.link ? (
                <a href={selectedProject.link} target="_blank" rel="noopener noreferrer">
                  Visit project
                </a>
              ) : (
                'Not available'
              )}
            </p>
          </div>
        )}
      </div>
    </section>
  );
};

export default Projects;