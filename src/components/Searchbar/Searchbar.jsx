import PropTypes from 'prop-types';
import { useState } from 'react';
import css from './Searchbar.module.css';

export const Searchbar = ({ onSubmit }) => {
  const [inputText, setInputText] = useState('');

  const handleOnChange = evt => {
    setInputText(evt.target.value);
  };

  const handleOnSubmit = evt => {
    evt.preventDefault();
    onSubmit(inputText);
    resetForm();
  };

  function resetForm() {
    setInputText('');
  }

  return (
    <header className={css.Searchbar}>
      <form className={css.SearchForm} onSubmit={handleOnSubmit}>
        <button type="submit" className={css.SearchFormButton}>
          <span className={css.SearchFormButtonLabel}>Search</span>
        </button>

        <input
          className={css.SearchFormInput}
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
          onChange={handleOnChange}
          value={inputText}
        />
      </form>
    </header>
  );
};

Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};
