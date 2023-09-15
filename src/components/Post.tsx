import style from './Post.module.css';

type IProps = {
  author: string;
  body: string;
};

function Post({ author, body }: IProps) {
  return (
    <div className={style.post}>
      <p className={style.author}>{author}</p>
      <p className={style.text}>{body}</p>
    </div>
  );
}
export default Post;
