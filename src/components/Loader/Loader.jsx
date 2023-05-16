import css from './Loader.module.css';
import { ThreeDots } from 'react-loader-spinner';

export const Loader = () => {
  return (
    <div className={css.isLoading}>
      <ThreeDots />
    </div>
  );
};
