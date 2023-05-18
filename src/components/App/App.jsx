import React, { useState, useEffect } from 'react';
import { Searchbar } from '../Searchbar/Searchbar';
import { ImageGallery } from '../ImageGallery/ImageGallery';
import { Button } from '../Button/Button';
import { Loader } from '../Loader/Loader';
import { getSearchGallery } from '../../api/pixabayApi';
import { Modal } from '../Modal/Modal';

import css from './App.module.css';

export const App = () => {
  const [query, setQuery] = useState('');
  const [page, setPage] = useState(1);
  const [galleryItems, setGalleryItems] = useState([]);
  const [totalItems, setTotalItems] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [modalImg, setModalImg] = useState({
    url: '',
    alt: '',
  });

  useEffect(() => {
    if (query !== '') {
      fetchData();
    }
  }, [query, page]);

  async function fetchData() {
    try {
      setIsLoading(true);
      const data = await getSearchGallery(query, page);
      setGalleryItems([...galleryItems, ...data.hits]);
      setTotalItems(data.totalHits);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  }

  const handleSearch = searchText => {
    if (query === searchText) {
      return alert(`You are alredy watching "${searchText}" category`);
    }

    setQuery(searchText.toLowerCase());
    setGalleryItems([]);
    setPage(1);
  };

  const handleLoadmoreImages = () => {
    setPage(page + 1);
  };

  const openModal = item => {
    setShowModal(true);
    setModalImg({
      url: item.largeImageURL,
      alt: item.tags,
    });
  };

  const closeModal = () => {
    setShowModal(false);
    setModalImg({
      url: '',
      alt: '',
    });
  };

  return (
    <div className={css.App}>
      <Searchbar onSubmit={handleSearch}></Searchbar>
      <ImageGallery
        galleryItems={galleryItems}
        openModal={openModal}
      ></ImageGallery>
      {isLoading && <Loader />}
      {totalItems > galleryItems.length && (
        <Button onClick={handleLoadmoreImages}></Button>
      )}
      {showModal && <Modal modalImg={modalImg} closeModal={closeModal} />}
    </div>
  );
};
