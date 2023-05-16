import React, { Component } from 'react';
import { Searchbar } from '../Searchbar/Searchbar';
import { ImageGallery } from '../ImageGallery/ImageGallery';
import { Button } from '../Button/Button';
import { Loader } from '../Loader/Loader';
import { getSearchGallery } from '../../api/pixabayApi';
import { Modal } from '../Modal/Modal';

import css from './App.module.css';

export class App extends Component {
  state = {
    query: '',
    page: 1,
    galleryItems: [],
    totalItems: 0,
    isLoading: false,
    showModal: false,
    modalImg: {
      url: '',
      alt: '',
    },
  };

  async componentDidUpdate(_, prevState) {
    const { query, page, galleryItems } = this.state;
    if (prevState.query !== query || prevState.page !== page) {
      try {
        this.setState({ isLoading: true });
        const data = await getSearchGallery(query, page);
        this.setState({
          galleryItems: [...galleryItems, ...data.hits],
          totalItems: data.totalHits,
        });
      } catch (error) {
        this.setState({ error });
      } finally {
        this.setState({ isLoading: false });
      }
    }
  }

  handleSearch = query => {
    if (this.state.query === query) {
      return alert(`You are alredy watching "${query}" category`);
    }

    this.setState({
      query: query.toLowerCase(),
      galleryItems: [],
      page: 1,
    });
  };

  handleLoadmoreImages = () => {
    this.setState({
      page: this.state.page + 1,
    });
  };

  openModal = item => {
    this.setState(prevState => ({
      showModal: true,
      modalImg: {
        url: item.largeImageURL,
        alt: item.tags,
      },
    }));
  };

  closeModal = () => {
    this.setState(prevState => ({
      showModal: false,
      modalImg: {},
    }));
  };

  render() {
    const { galleryItems, totalItems, isLoading, showModal, modalImg } =
      this.state;
    return (
      <div className={css.App}>
        <Searchbar onSubmit={this.handleSearch}></Searchbar>
        <ImageGallery
          galleryItems={galleryItems}
          openModal={this.openModal}
        ></ImageGallery>
        {isLoading && <Loader />}
        {totalItems > galleryItems.length && (
          <Button onClick={this.handleLoadmoreImages}></Button>
        )}
        {showModal && (
          <Modal modalImg={modalImg} closeModal={this.closeModal} />
        )}
      </div>
    );
  }
}
