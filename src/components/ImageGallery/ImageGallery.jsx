import PropTypes from 'prop-types';
import css from './ImageGallery.module.css';
import { ImageGalleryItem } from '../ImageGalleryItem/ImageGalleryItem';

export const ImageGallery = ({ galleryItems, openModal }) => {
  return (
    galleryItems.length > 0 && (
      <ul className={css.ImageGallery}>
        {galleryItems.map(item => (
          <li
            key={item.id}
            className={css.ImageGalleryItem}
            onClick={() => openModal(item)}
          >
            <ImageGalleryItem
              webformaturl={item.webformatURL}
              tags={item.tags}
            ></ImageGalleryItem>
          </li>
        ))}
      </ul>
    )
  );
};

ImageGallery.propTypes = {
  galleryItems: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
    })
  ),
  openModal: PropTypes.func.isRequired,
};
