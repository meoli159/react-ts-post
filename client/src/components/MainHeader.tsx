import { MdPostAdd, MdMessage } from 'react-icons/md';
import style from './MainHeader.module.css';

type IProps = {
  onCreatePost: (e: React.MouseEvent<HTMLElement, MouseEvent>) => void;
};

function MainHeader({ onCreatePost }: IProps) {
  return (
    <>
      <div className={style.alert}>
        <p>
          Your post is currently set to public visibility. This means that it
          can be viewed by anyone on the internet. If you intended to keep this
          post private or for a specific audience, please double-check your
          privacy settings to ensure your content is only shared with the
          intended recipients.
        </p>
      </div>

      <header className={style.header}>
        <h1 className={style.logo}>
          <MdMessage />
          Nes TS Poster{' '}
        </h1>
        <p>
          <button className={style.button} onClick={onCreatePost}>
            <MdPostAdd size={18} />
            New Post
          </button>
        </p>
      </header>
    </>
  );
}

export default MainHeader;
