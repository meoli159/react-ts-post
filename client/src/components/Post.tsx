import style from './Post.module.css';

type IProps = {
  author: string;
  body: string;
  onDelete(): void;
};

function Post({ onDelete, author, body }: IProps) {
  return (
    <div className={style.post} onClick={onDelete}>
      <p className={style.author}>{author}</p>
      <p className={style.text}>{body}</p>
    </div>
  );
}

export default Post;
