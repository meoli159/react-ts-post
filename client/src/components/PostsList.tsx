import Post from './Post';
import style from './PostsList.module.css';
import NewPost from './NewPost';
import Modal from './Modal';
import { useEffect, useState } from 'react';

type IProps = {
  isPosting: boolean;
  onStopPosting: () => void;
};
type PostType = {
  id?: string;
  author: string;
  body: string;
};
function PostsList({ isPosting, onStopPosting }: IProps) {
  const [posts, setPost] = useState<PostType[]>([]);
  const [isFetching, setIsFetching] = useState(false);

  useEffect(() => {
    setIsFetching(true);
    async function fetchPosts() {
      const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/posts`);
      const resData = await res.json();
      setPost(resData.data);
      setIsFetching(false);
    }
    fetchPosts();
  }, []);

  function addPostHandler(postData: PostType) {
    fetch(`${import.meta.env.VITE_BACKEND_URL}/api/posts`, {
      method: 'POST',
      body: JSON.stringify(postData),
      headers: { 'Content-Type': 'application/json' },
    })
      .then((res) => res.json())
      .then((res) => setPost((existingPosts) => [res.data, ...existingPosts]));
  }

  function deletePostHandler(id: string) {
    fetch(`${import.meta.env.VITE_BACKEND_URL}/api/posts/${id}`, {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
    });
    setPost((existingPosts) => existingPosts.filter((post) => post.id !== id));
  }

  return (
    <>
      {isPosting && (
        <Modal onClose={onStopPosting}>
          <NewPost onCancel={onStopPosting} onAddPost={addPostHandler} />
        </Modal>
      )}
      {!isFetching && posts.length === 0 && (
        <div style={{ textAlign: 'center', color: 'white' }}>
          <h2>There are no post yet.</h2>
          <p>Adding some!</p>
        </div>
      )}
      {isFetching && posts.length === 0 ? (
        <div style={{ textAlign: 'center', color: 'white' }}>
          <p>Is Loading....</p>
        </div>
      ) : (
        <ul className={style.posts}>
          {posts.map((post) => (
            <Post
              key={post.id}
              onDelete={() => deletePostHandler(post.id!)}
              author={post.author}
              body={post.body}
            />
          ))}
        </ul>
      )}
    </>
  );
}

export default PostsList;
