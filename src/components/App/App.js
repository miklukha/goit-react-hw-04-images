import { useState, useEffect } from 'react';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import { Searchbar } from 'components/Searchbar';
import { ImageGallery } from 'components/ImageGallery';
import { Button } from 'components/Button';
import { Loader } from 'components/Loader';
import { Section } from './App.styled';
import * as imageAPI from 'service/image-api';

export function App() {
  const [images, setImages] = useState([]);
  const [query, setQuery] = useState('');
  const [page, setPage] = useState(1);
  const [totalHits, setTotalHits] = useState(null);
  const [loading, setLoading] = useState(false);

  const perPage = 12;

  useEffect(() => {
    if (!query) {
      return;
    }

    setLoading(true);

    (async function getImages() {
      try {
        const data = await imageAPI.fetchImage(query, page);
        const images = data.hits;

        if (images.length === 0) {
          Notify.failure('Nothing found. Please, try again');
        }

        setTotalHits(data.totalHits);
        setImages(state => [...state, ...images]);
        setLoading(false);
      } catch (error) {
        Notify.failure('Oops something wrong');
        setLoading(false);
      }
    })();
  }, [query, page]);

  useEffect(() => {
    setPage(1);
    setImages([]);
    setTotalHits(null);
  }, [query]);

  const onLoadMore = () => {
    setPage(state => state + 1);
  };

  return (
    <Section>
      <Searchbar onSubmit={setQuery} />
      <ImageGallery images={images} />
      {totalHits > page * perPage && <Button onClick={onLoadMore} />}
      {loading && <Loader />}
    </Section>
  );
}
