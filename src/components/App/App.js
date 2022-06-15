import { useState, useEffect } from 'react';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import { Searchbar } from 'components/Searchbar';
import { ImageGallery } from 'components/ImageGallery';
import { Button } from 'components/Button';
import { Loader } from 'components/Loader';
import { Modal } from 'components/Modal';
import { Section } from './App.styled';
import { imageAPI } from 'service/image-api';

export function App() {
  const [images, setImages] = useState([]);
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(12);
  const [query, setQuery] = useState('');
  const [largeImg, setLargeImg] = useState('');
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [showButton, setShowButton] = useState(false);

  useEffect(() => {
    setPage(1);
    setImages([]);
    setLargeImg('');
  }, [query]);

  useEffect(() => {
    async function getImages(query) {
      setQuery(query);
      setLoading(true);
      // this.setState({ query, loading: true });

      try {
        const response = await imageAPI.fetchImage(query, page, perPage);
        const images = await response.json();

        if (images.hits.length === 0) {
          setLoading(false);
          setShowButton(false);
          // this.setState({
          //   loading: false,
          //   showButton: false,
          // });

          throw new Error();
        }

        setImages(state => [...state, ...images.hits]);
        setLoading(false);
        setShowButton(true);

        // this.setState(prevState => ({
        //   images: [...prevState.images, ...images.hits],
        //   loading: false,
        //   showButton: true,
        // }));

        if (images.hits.length < perPage || images.totalHits < perPage) {
          setShowButton(false);
          // this.setState({
          //   showButton: false,
          // });
        }
      } catch (error) {
        Notify.failure('Nothing found');
      }
    }
    getImages(query);

    // (async function foo() {
    // await getImages(query);
    // })();
  }, [perPage, page, query]);
  // async componentDidUpdate(_, prevState) {
  //   const { query } = this.state;

  //   if (prevState.query !== query) {
  //     this.setState({
  //       page: 1,
  //       images: [],
  //       largeImg: '',
  //       totalHits: '',
  //     });
  //   }

  //   if (prevState.page !== this.state.page) {
  //     await this.getImages(query);
  //   }
  // }

  const openModal = image => {
    setShowModal(true);
    setLargeImg(image);
    // this.setState({
    //   showModal: true,
    //   largeImg: image,
    // });
  };

  const closeModal = () => {
    setShowModal(false);
    // this.setState({
    //   showModal: false,
    // });
  };

  const onLoadMore = () => {
    setPage(state => state + 1);
    // this.setState(prevState => ({
    //   page: prevState.page + 1,
    // }));
  };

  //   const { images, showModal, largeImg, query, showButton } = this.state;

  return (
    <Section>
      <Searchbar onSubmit={setQuery} />
      {loading && <Loader />}
      <ImageGallery images={images} onClick={openModal} />
      {showButton && <Button onClick={onLoadMore} />}
      {showModal && (
        <Modal onClose={closeModal}>
          <img src={largeImg} alt={query} />
        </Modal>
      )}
    </Section>
  );
}
