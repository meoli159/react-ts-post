import Post from './Post';
import style from './PostsList.module.css';
import NewPost from './NewPost';
import Modal from './Modal';

type IProps = {
  isPosting: boolean;
  onStopPosting(): void;
};

function PostsList({ isPosting, onStopPosting }: IProps) {
  return (
    <>
      {isPosting && (
        <Modal onClose={onStopPosting}>
          <NewPost onCancel={onStopPosting} />
        </Modal>
      )}

      <ul className={style.posts}>
        <Post author="Oliver" body="Is chasing you" />
      </ul>
    </>
  );
}

export default PostsList;
