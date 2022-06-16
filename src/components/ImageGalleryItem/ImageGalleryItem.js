import { useState } from 'react';
import PropTypes from 'prop-types';
import { Item, Image } from './ImageGalleryItem.styled';
import { Modal } from 'components/Modal';
export function ImageGalleryItem({
  image: { webformatURL, largeImageURL, tags },
}) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <Item onClick={() => setIsModalOpen(true)}>
        <Image src={webformatURL} alt={tags} />
      </Item>
      {isModalOpen && (
        <Modal onClose={() => setIsModalOpen(false)}>
          <img src={largeImageURL} alt={tags} />
        </Modal>
      )}
    </>
  );
}

ImageGalleryItem.propTypes = {
  image: PropTypes.shape({
    webformatURL: PropTypes.string.isRequired,
    largeImageURL: PropTypes.string.isRequired,
    tags: PropTypes.string.isRequired,
  }),
};
