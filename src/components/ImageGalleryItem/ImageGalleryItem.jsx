import PropTypes from 'prop-types';
import css from './ImageGalleryItem.module.css';

export const ImageGalleryItem = ({ webformaturl, tags }) => {
  return (
    <img className={css.ImageGalleryItemImage} src={webformaturl} alt={tags} />
  );
};

ImageGalleryItem.propTypes = {
  webformaturl: PropTypes.string.isRequired,
  tags: PropTypes.string.isRequired,
};
