import Post from './Post';
import style from './PostsList.module.css';
import NewPost from './NewPost';
import Modal from './Modal';
import { useState } from 'react';

type IProps = {
  isPosting: boolean;
  onStopPosting: () => void;
};
type PostType = {
  author: string;
  body: string;
};
function PostsList({ isPosting, onStopPosting }: IProps) {
  const [posts, setPost] = useState<PostType[]>([]);
  function addPostHandler(postData: PostType) {
    setPost((existingPosts) => [postData, ...existingPosts]);
  }
  return (
    <>
      {isPosting && (
        <Modal onClose={onStopPosting}>
          <NewPost onCancel={onStopPosting} onAddPost={addPostHandler} />
        </Modal>
      )}
      {posts.length > 0 ? (
        <ul className={style.posts}>
          {posts.map((post, index) => (
            <Post key={index} author={post.author} body={post.body} />
          ))}
        </ul>
      ) : (
        <div style={{ textAlign: 'center', color: 'white' }}>
          <h2>There are no post yet.</h2>
          <p>Adding some!</p>
        </div>
      )}
    </>
  );
}

export default PostsList;
