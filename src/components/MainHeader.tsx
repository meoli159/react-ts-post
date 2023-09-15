import { MdPostAdd, MdMessage } from 'react-icons/md';
import style from './MainHeader.module.css';

type IProps = {
  onCreatePost: (e: React.MouseEvent<HTMLElement, MouseEvent>) => void;
};

function MainHeader({ onCreatePost }: IProps) {
  return (
    <header className={style.header}>
      <h1 className={style.logo}>
        <MdMessage />
        React TS Poster{' '}
      </h1>
      <p>
        <button className={style.button} onClick={onCreatePost}>
          <MdPostAdd size={18} />
          New Post
        </button>
      </p>
    </header>
  );
}

export default MainHeader;
