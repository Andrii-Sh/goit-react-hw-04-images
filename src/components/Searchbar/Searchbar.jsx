import PropTypes from 'prop-types';
import { Component } from 'react';
import css from './Searchbar.module.css';

export class Searchbar extends Component {
  state = { inputText: '' };

  handleOnChange = evt => {
    this.setState({ inputText: evt.target.value });
  };

  handleOnSubmit = evt => {
    evt.preventDefault();
    this.props.onSubmit(this.state.inputText);
    this.resetForm();
  };

  resetForm = () => {
    this.setState({ inputText: '' });
  };

  render() {
    return (
      <header className={css.Searchbar}>
        <form className={css.SearchForm} onSubmit={this.handleOnSubmit}>
          <button type="submit" className={css.SearchFormButton}>
            <span className={css.SearchFormButtonLabel}>Search</span>
          </button>

          <input
            className={css.SearchFormInput}
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
            onChange={this.handleOnChange}
            value={this.state.inputText}
          />
        </form>
      </header>
    );
  }
}

Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};
