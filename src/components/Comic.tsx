import React, { useEffect, useState } from 'react';
import JustValidate from 'just-validate';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
dayjs.extend(relativeTime);

interface ComicData {
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

const ComicComponent: React.FC = () => {
  const [comic, setComic] = useState<ComicData | null>(null);

  useEffect(() => {
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
        const email = (document.getElementById('comic-email') as HTMLInputElement).value;

        fetch(`https://fwd.innopolis.university/api/hw2?email=${encodeURIComponent(email)}`)
          .then(response => response.json())
          .then(data => {
            const comicId = data;
            return fetch(`https://fwd.innopolis.university/api/comic?id=${comicId}`);
          })
          .then(response => response.json())
          .then((comicData: ComicData) => {
            setComic(comicData);
            document.getElementById('comic-container')!.classList.remove('none');
          })
          .catch(error => {
            console.error('Error fetching comic:', error);
            document.getElementById('comic-container')!.innerHTML = '<p>Failed to load comic. Please try again later.</p>';
          });
      });
  }, []);

  return (
    <section className="comic" id="comic">
      <div className="container">
        <h2 className="comic__title">Comic</h2>
        <form id="email-form" className="comic__form flex">
          <label>Enter your Innopolis email:</label>
          <div>
            <input
              type="email"
              id="comic-email"
              name="email"
              placeholder="Ex: v.toporkov@innopolis.university"
              required
            />
            <button type="submit" className="btn-reset">Get comic</button>
          </div>
        </form>
        <div id="comic-container" className="comic__container none">
          {comic && (
            <>
              <h3 id="comic-title" className="comic__container-title">{comic.safe_title}</h3>
              <img id="comic-image" className="comic__container-image" src={comic.img} alt={comic.alt} />
              <p id="comic-date" className="comic__container-date">
                Date of publication: {dayjs(`${comic.year}-${comic.month}-${comic.day}`).format('MMMM D, YYYY')} ({dayjs(`${comic.year}-${comic.month}-${comic.day}`).fromNow()})
              </p>
            </>
          )}
        </div>
      </div>
    </section>
  );
};

export default ComicComponent;
