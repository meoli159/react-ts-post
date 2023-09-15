import { useState } from 'react';
import style from './NewPost.module.css';
type PostType = {
  author: string;
  body: string;
};
type IProps = {
  // onBodyChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  // onUserNameChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onCancel: () => void;
  onAddPost: (postData: PostType) => void;
};

function NewPost({ onCancel, onAddPost }: IProps) {
  const [inputBody, setInputBody] = useState('');
  const [inputUserName, setInputUserName] = useState('');
  function changeBodyHandler(e: React.ChangeEvent<HTMLTextAreaElement>) {
    setInputBody(e.target.value);
  }

  function changeUserNameHandler(e: React.ChangeEvent<HTMLInputElement>) {
    setInputUserName(e.target.value);
  }

  function submitEvent(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const postData = {
      author: inputUserName,
      body: inputBody,
    };
    onAddPost(postData);
    onCancel();
  }
  return (
    <form className={style.form} onSubmit={submitEvent}>
      <p>
        <label htmlFor="name">Your name</label>
        <input
          type="text"
          id="name"
          required
          onChange={changeUserNameHandler}
        />
      </p>

      <p>
        <label htmlFor="body">Text</label>
        <textarea id="body" required rows={3} onChange={changeBodyHandler} />
      </p>
      <p className={style.actions}>
        <button type="button" onClick={onCancel}>
          Cancel
        </button>
        <button>Submit</button>
      </p>
    </form>
  );
}

export default NewPost;
