interface Comic {
    month: string;
    num: number;
    link: string;
    year: string;
    news: string;
    safe_title: string;
    transcript: string;
    alt: string;
    img: string;
    title: string;
    day: string;
}

interface Project {
    title: string;
    description: string;
    technologies: string;
    link: string;
}

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

function updateSwiperText(swiperInstance: SwiperInstance): void {
    const currentIndex = Math.floor(swiperInstance.realIndex / swiperInstance.params.slidesPerGroup) + 1;
    const totalSlides = swiperInstance.slides.length - swiperInstance.loopedSlides - 1;
    document.querySelector('.swiper-text')!.textContent = `${currentIndex} / ${totalSlides}`;
}

document.addEventListener("DOMContentLoaded", function () {
    const swiper = new Swiper(".swiper", {
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
            nextEl: ".swiper-button-next",
            prevEl: ".swiper-button-prev",
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

    let swiperClickElements = document.querySelectorAll('.about__swiper-click');
    swiperClickElements.forEach(swiperClickElement => {
        let aboutContent = swiperClickElement.closest('.about__swiper-content');
        aboutContent!.addEventListener('click', () => {
            swiperClickElement.classList.toggle('about__swiper-click--active');
        });
    });

    // Projects

    const mySelect = new Choices('#my-select', {
        shouldSort: false,
        itemSelectText: '',
    });

    const projectInfo: Record<string, Project> = {
        'Euclid': {
            title: 'Euclid',
            description: 'Euclid is a website that provides project system services and is still not adapted for various devices, but it already utilizes JavaScript. The site offers investment opportunities for various companies, aiming to streamline and enhance their project management and operational processes through innovative web-based solutions.',
            technologies: 'HTML, CSS, JavaScript, BEM',
            link: 'https://github.com/Spectre113/euclid'
        },
        'W-wave': {
            title: 'W-wave',
            description: 'W-wave is a radio website that features a comprehensive list of various radio stations. The site was built using semantic HTML elements and adheres to the BEM methodology developed by Yandex, ensuring a modular and maintainable code structure. JavaScript was used to enhance the functionality, providing a dynamic and interactive user experience. Additionally, the site is fully responsive and adapts seamlessly to different devices, offering a consistent experience across desktops, tablets, and smartphones. W-wave stands as a robust example of modern web development practices, combining clean code, semantic markup, and responsive design to deliver a user-friendly platform for radio enthusiasts.',
            technologies: 'HTML, CSS, JavaScript, BEM',
            link: 'https://github.com/Spectre113/W-wave'
        },
        'Lagoona': {
            title: 'Lagoona',
            description: 'Lagoona is a simple website built using pure HTML and CSS for a hotel. This project was created as part of an educational exercise to demonstrate basic web development skills. The site features a clean and minimalist design, showcasing fundamental layout techniques and styling. Although the site is not responsive and lacks advanced functionality, it serves as a solid example of how to structure and style a webpage using just HTML and CSS. The project highlights the importance of a well-organized codebase and the effective use of CSS for visual presentation. Lagoona stands as a testament to the early stages of learning web development, providing a foundational understanding of how websites are constructed. It’s a great reference point for anyone starting out in the field, illustrating the core principles of web design and development.',
            technologies: 'HTML, CSS',
            link: ''
        },
        'Blanchard': {
            title: 'Blanchard (still in progress)',
            description: 'Description for Blanchard project.',
            technologies: 'HTML, CSS, JavaScript, BEM',
            link: ''
        },
    };

    document.getElementById('my-select')!.addEventListener('change', function (event) {
        const projectId = (event.target as HTMLSelectElement).value;
        const project = projectInfo[projectId];
        if (project) {
            document.querySelector('.projects__info-block h2')!.textContent = project.title;
            document.querySelector('.projects__info-block p:nth-of-type(1)')!.innerHTML = `<strong>Description:</strong> ${project.description}`;
            document.querySelector('.projects__info-block p:nth-of-type(2)')!.innerHTML = `<strong>Technologies:</strong> ${project.technologies}`;
            const linkElement = document.querySelector('.projects__info-block p:nth-of-type(3) a')!;
            linkElement.setAttribute('href', project.link);

            if (projectId === 'Lagoona') {
                linkElement.textContent = 'Problems occurred, the link is not working, will be fixed soon.';
            } 
            else {
                linkElement.textContent = 'Visit project';
            }
        }
    });

    const initialProjectId = mySelect.getValue(true);
    const initialProject = projectInfo[initialProjectId];
    if (initialProject) {
        document.querySelector('.projects__info-block h2')!.textContent = initialProject.title;
        document.querySelector('.projects__info-block p:nth-of-type(1)')!.innerHTML = `<strong>Description:</strong> ${initialProject.description}`;
        document.querySelector('.projects__info-block p:nth-of-type(2)')!.innerHTML = `<strong>Technologies:</strong> ${initialProject.technologies}`;
        const linkElement = document.querySelector('.projects__info-block p:nth-of-type(3) a')!;
        linkElement.setAttribute('href', initialProject.link);

        if (initialProjectId === 'Lagoona') {
            linkElement.textContent = 'Problems occurred, the link is not working, will be fixed soon.';
        } 
        else {
            linkElement.textContent = 'Visit project';
        }
    }

    // copy
    let lastClickedButton: HTMLElement | null = null;

    document.querySelectorAll('.reference-copy').forEach(button => {
        button.addEventListener('click', function(this: HTMLElement) {
            const textToCopy = this.getAttribute('data-copy-text')!;
            const tempInput = document.createElement('input');
            tempInput.value = textToCopy;
            document.body.appendChild(tempInput);
            tempInput.select();
            document.execCommand('copy');
            document.body.removeChild(tempInput);
    
            if (!this.getAttribute('data-original-text')) {
                this.setAttribute('data-original-text', this.textContent!);
            }
    
            if (lastClickedButton && lastClickedButton !== this) {
                lastClickedButton.textContent = lastClickedButton.getAttribute('data-original-text')!;
            }
    
            lastClickedButton = this;
            this.textContent = 'Copied';
        });
    });

    // scroll
    document.querySelectorAll('.header__link').forEach(anchor => {
        anchor.addEventListener('click', (e) => {
            e.preventDefault();
            
            const targetId = (e.currentTarget as HTMLAnchorElement).getAttribute('href');
            if (targetId) {
                document.querySelector(targetId)!.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });

    // acc
    var acc = document.getElementsByClassName("skills__accordeon-btn");
    for (let i = 0; i < acc.length; i++) {
        acc[i].addEventListener("click", function(this: HTMLElement) {
            this.classList.toggle("active");
            var panel = this.nextElementSibling as HTMLElement;
            if (panel.style.maxHeight) {
                panel.style.maxHeight = '';
            } else {
                panel.style.maxHeight = panel.scrollHeight + "px";
            }
        });
    }

    // comic

    const form = document.getElementById('email-form') as HTMLFormElement;
    const emailInput = document.getElementById('comic-email') as HTMLInputElement;
    const comicContainer = document.getElementById('comic-container')!;
    const comicTitle = document.getElementById('comic-title')!;
    const comicImage = document.getElementById('comic-image') as HTMLImageElement;
    const comicDate = document.getElementById('comic-date')!;
    const validation = new JustValidate('#email-form');

    validation
        .addField('#comic-email', [
            {
                rule: 'required',
                errorMessage: 'Email is required',
            },
            {
                rule: 'email',
                errorMessage: 'Write correct email',
            },
        ])
        .onSuccess((event: Event) => {
            event.preventDefault();
            const email = emailInput.value;

            fetch(`https://fwd.innopolis.university/api/hw2?email=${encodeURIComponent(email)}`)
                .then(response => response.json())
                .then(data => {
                    const comicId = data;
                    return fetch(`https://fwd.innopolis.university/api/comic?id=${comicId}`);
                })
                .then(response => response.json())
                .then((comic: Comic) => {
                    comicTitle.textContent = comic.safe_title;
                    comicImage.src = comic.img;
                    comicImage.alt = comic.alt;

                    const date = new Date(`${comic.year}-${comic.month}-${comic.day}`);
                    comicDate.textContent = `Date of publication: ${date.toLocaleDateString()}`;

                    comicContainer.style.display = 'block';
                })
                .catch(error => {
                    console.error('Error fetching comic:', error);
                    comicContainer.innerHTML = '<p>Failed to load comic. Please try again later.</p>';
                    comicContainer.style.display = 'block';
                });
        });
});
